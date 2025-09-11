import { z } from 'zod';

export const CandidateSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập họ tên'),
	phone: z
		.string()
		.min(10, 'Số điện thoại phải có ít nhất 10 số')
		.max(15, 'Số điện thoại không hợp lệ')
		.regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa chữ số')
		.optional(),
	birthday: z.date('Vui lòng chọn ngày sinh'),
	gender: z.enum(['male', 'female', 'other'], 'Vui lòng chọn giới tính'),
});

export const CandidateProfileResponseSchema = CandidateSchema.extend({
	id: z.number().int(),
	userId: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type UpdateCandidateDto = z.infer<typeof CandidateSchema>;
export type CandidateProfileResponse = z.infer<typeof CandidateProfileResponseSchema>;
