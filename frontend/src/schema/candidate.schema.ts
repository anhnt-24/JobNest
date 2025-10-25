import { z } from 'zod';
import { UserResponseSchema } from './user.schema';

export const CandidateSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập họ tên'),
	phone: z
		.string()
		.min(10, 'Số điện thoại phải có ít nhất 10 số')
		.max(15, 'Số điện thoại không hợp lệ')
		.regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa chữ số')
		.optional(),
	dob: z.date('Vui lòng chọn ngày sinh'),
	gender: z.enum(['MALE', 'FEMALE', 'OTHER'], 'Vui lòng chọn giới tính'),
});

export const candidateResponseSchema = CandidateSchema.extend({
	id: z.number().int(),
	userId: z.number().int(),
	user: UserResponseSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CandidateReq = z.infer<typeof CandidateSchema>;
export type CandidateRes = z.infer<typeof candidateResponseSchema>;
