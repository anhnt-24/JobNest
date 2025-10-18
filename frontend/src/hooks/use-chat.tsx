import { useEffect, useState } from 'react';
import { useSocket } from './use-socket';
import { conversationService } from '@/service/conversation.service';
import { set } from 'nprogress';

interface Message {
	conversationId: number;
	senderId: number;
	content: string;
	createdAt: string;
}

export const useChat = (conversationId: number) => {
	const { socket } = useSocket();
	const [messages, setMessages] = useState<Message[]>([]);
	useEffect(() => {
		if (!conversationId) setMessages([]);
		conversationService.getMessages(conversationId).then(res => {
			setMessages(res.data);
		});
	}, [conversationId]);
	useEffect(() => {
		if (!socket) return;
		socket.emit('join_conversation', { convoId: conversationId });
		socket.on('joined', (data: { event: string; convoId: number }) => {
			console.log(`Joined room: convo_${data.convoId}`);
		});
		const handleNewMessage = (msg: Message) => {
			if (msg.conversationId === conversationId) {
				setMessages(prev => [...prev, msg]);
			}
		};
		socket.on('message', handleNewMessage);
		return () => {
			socket.off('message', handleNewMessage);
			socket.off('joined');
		};
	}, [socket, conversationId]);

	return { messages };
};
