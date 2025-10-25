import { z } from 'zod';
export const ConversationSchema = z.object({
	lastMessage: z.string().optional(),
	lastMessageAt: z.date().optional(),
	applicationId: z.number().int().optional(),
});

export const conversationResponseSchema = ConversationSchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ConversationReq = z.infer<typeof ConversationSchema>;
export type ConversationRes = z.infer<typeof conversationResponseSchema>;
