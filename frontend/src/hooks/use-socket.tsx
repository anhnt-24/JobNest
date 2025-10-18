import { useAuth } from '@/hook/useAuth';
import { conversationService } from '@/service/conversation.service';
import { useConversationStore } from '@/store/conversation-store';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
	const socket = useRef<Socket>(null);
	const { user } = useAuth();
	const setConversations = useConversationStore(state => state.setUserConversations);
	const updateConversation = useConversationStore(state => state.updateConversation);
	useEffect(() => {
		if (!user) return;
		conversationService.getUnreadConversations().then(res => {
			setConversations(res.data);
		});
		socket.current = io('http://localhost:8080/chat', { query: { userId: user.id } });
		socket.current.on('notification', (msg: { conversationId: number; content: string }) => {
			conversationService
				.getStatus(msg.conversationId)
				.then(res => {
					updateConversation(msg.conversationId, res.data);
				})
				.catch(err => {
					console.error('Failed to update conversation', err);
				});
		});

		return () => {
			socket.current?.disconnect();
		};
	}, [user]);

	return { socket: socket.current };
};
