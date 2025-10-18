import { api } from '@/lib/axios';

export const conversationService = {
	createByApplicationId: (appId: number) => api.post(`/conversation/create/${appId}`),
	getMyConversations: () => api.get(`/conversation/me`),
	getByApplication: (appId: number) => api.get(`/conversation/application/${appId}`),
	getMessages: (convoId: number) => api.get(`/conversation/${convoId}/messages`),
	sendMessage: (convoId: number, content: string) => api.post(`/conversation/${convoId}/messages`, { content }),
	getUnreadConversations: () => api.get(`/conversation/unread`),
	markAsRead: (convoId: number) => api.patch(`/conversation/readed/${convoId}`),
	getStatus: (convoId: number) => api.get(`/conversation/status/${convoId}`),
};
