import { api } from '@/lib/axios';

export const conversationService = {
	createByApplicationId: (appId: number) => api.post(`/conversations/create/${appId}`),
	getMyConversations: () => api.get(`/conversation/me`),
	getByApplication: (appId: number) => api.get(`/conversations/applications/${appId}`),
	getMessages: (convoId: number) => api.get(`/conversations/${convoId}/messages`),
	sendMessage: (convoId: number, content: string) => api.post(`/conversations/${convoId}/messages`, { content }),
	getUnreadConversations: () => api.get(`/conversation/unread`),
	markAsRead: (convoId: number) => api.patch(`/conversations/${convoId}/readed`),
	getStatus: (convoId: number) => api.get(`/conversations/${convoId}/status`),
};
