import z from 'zod';

// Request: tạo/ cập nhật trạng thái conversation user
export const UserConversationSchema = z.object({
	userId: z.number().int(),
	conversationId: z.number().int(),
	lastReadAt: z.date().optional(),
	unreadCount: z.number().int().optional().default(0),
});

// Response: trả về khi get conversation user
export const UserConversationResponseSchema = UserConversationSchema.extend({
	id: z.number().int(),
});

export type UserConversationReq = z.infer<typeof UserConversationSchema>;
export type UserConversationRes = z.infer<typeof UserConversationResponseSchema>;
