import { z } from 'zod';

export const PostSchema = z.object({
	author: z.string().min(1),
	title: z.string().min(1),
	slug: z.string().min(1),
	excerpt: z.string().optional(),
	content: z.string().min(1),
	thumbnail: z.string().url().optional(),
	tags: z.array(z.string()).optional(),
	category: z.string().optional(),
	status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
	views: z.number().int().optional().default(0),
	likes: z.number().int().optional().default(0),
});

export const PostResponseSchema = PostSchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type PostReq = z.infer<typeof PostSchema>;
export type PostRes = z.infer<typeof PostResponseSchema>;
