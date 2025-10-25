import { z } from 'zod';
export const CVSchema = z.object({
	title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
	fileUrl: z.string().url().optional(),
	thumbnailUrl: z.string().url().optional(),
	format: z.enum(['PDF', 'DOCX', 'PNG', 'JPG', 'OTHER']).optional(),
	fileSize: z.number().int().optional(),
	templateId: z.number().int().optional(),
	content: z.any().optional(),
});

export const CVResponseSchema = CVSchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	candidateId: z.number().int(),
	type: z.enum(['UPLOADED', 'GENERATED']).optional(),
});

export type CVReq = z.infer<typeof CVSchema>;
export type CVRes = z.infer<typeof CVResponseSchema>;
