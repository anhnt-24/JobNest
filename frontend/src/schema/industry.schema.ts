import { z } from 'zod';

export const IndustrySchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên ngành nghề'),
});

export const IndustryResponseSchema = IndustrySchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type IndustryRes = z.infer<typeof IndustryResponseSchema>;
export type IndustryReq = z.infer<typeof IndustrySchema>;
