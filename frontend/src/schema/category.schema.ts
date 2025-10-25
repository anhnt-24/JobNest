import { z } from 'zod';
export const CategorySchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên danh mục'),
});

export const categoryResponseSchema = CategorySchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CategoryReq = z.infer<typeof CategorySchema>;
export type CategoryRes = z.infer<typeof categoryResponseSchema>;
