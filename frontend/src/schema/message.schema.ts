import { z } from 'zod';
export const MessageSchema = z.object({
	senderId: z.number().int(),
	conversationId: z.number().int(),
	content: z.string().min(1, 'Vui lòng nhập nội dung'),
	id: z.string().optional(),
});

export const messageResponseSchema = MessageSchema.extend({
	id: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type MessageReq = z.infer<typeof MessageSchema>;
export type MessageRes = z.infer<typeof messageResponseSchema>;
