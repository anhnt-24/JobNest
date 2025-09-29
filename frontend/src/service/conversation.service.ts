import { api } from '@/lib/axios';

export const conversationService = {
	create: (appId: number) => api.post(`/conversation/application/${appId}`),
	getMyConversations: () => api.get(`/conversation/me`),
	getByApplication: (appId: number) => api.get(`/conversation/application/${appId}`),
	getMessages: (convoId: number) => api.get(`/conversation/${convoId}/messages`),
	sendMessage: (convoId: number, content: string) => api.post(`/conversation/${convoId}/messages`, { content }),
};
