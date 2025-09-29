import { conversationService } from '@/service/conversation.service';
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080/chat';

interface Message {
	id: number;
	conversationId: number;
	senderId: number;
	content: string;
	createdAt: string;
}

export const useChatSocket = (convoId: number | null) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!convoId) return;
		async function fetchMessages() {
			if (!convoId) return;
			const res = await conversationService.getMessages(convoId);
			setMessages(res.data);
		}
		fetchMessages();
		const s = io(SOCKET_URL, {
			withCredentials: true,
			transports: ['websocket'],
		});

		setSocket(s);
		s.emit('join_conversation', { convoId });
		s.on('new_message', (msg: Message) => {
			setMessages(prev => [...prev, msg]);
		});

		return () => {
			s.emit('leave_conversation', convoId);
			s.disconnect();
		};
	}, [convoId]);

	return { messages };
};
