import { create } from 'zustand';

export interface UserConversation {
	id: number;
	userId: number;
	conversationId: number;
	lastReadAt: string | null;
	unreadCount: number;
	conversation?: {
		lastMessage: string;
		lastMessageAt: string;
	};
}

interface ConversationStore {
	userConversations: Map<number, UserConversation>;
	setUserConversations: (convos: UserConversation[]) => void;
	updateConversation: (conversationId: number, data: Partial<UserConversation>) => void;
}

export const useConversationStore = create<ConversationStore>(set => ({
	userConversations: new Map<number, UserConversation>(),
	setUserConversations: convos =>
		set({
			userConversations: new Map(convos.map(c => [c.conversationId, c])),
		}),
	updateConversation: (conversationId, data) =>
		set(state => {
			const prev = state.userConversations.get(conversationId);
			if (!prev) return state;

			const updated: UserConversation = { ...prev, ...data };
			const newMap = new Map(state.userConversations);
			newMap.set(conversationId, updated);

			return { userConversations: newMap };
		}),
}));
