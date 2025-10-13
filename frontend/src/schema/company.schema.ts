import { z } from 'zod';

export const companySchema = z
	.object({
		name: z.string().trim().min(1, 'Tên không được để trống').max(200),
		website: z.string().trim().url('Website không hợp lệ'),
		employeeCount: z.number().int().min(1, 'Số nhân viên phải ≥ 1'),
		taxCode: z.number().int().min(1, 'Số nhân viên phải ≥ 1'),
		industry: z.string().trim().min(1).max(200),
		description: z.string().trim().min(1).max(2000),
		address: z.string().trim().min(1).max(300),
		latitude: z.number('Vĩ độ phải là số').gte(-90, 'Vĩ độ ≥ -90').lte(90, 'Vĩ độ ≤ 90'),
		longitude: z.number('Kinh độ phải là số').gte(-180, 'Kinh độ ≥ -180').lte(180, 'Kinh độ ≤ 180'),
		phone: z
			.string()
			.trim()
			.regex(/^(0\d{9}|\+84\d{9,10})$/, 'Số điện thoại không hợp lệ (vd: 0123456789 hoặc +84912345678)'),
	})
	.strict();

export const companyResponseSchema = companySchema.extend({
	id: z.number().int(),
	userId: z.string(),
	avatarUrl: z.string(),
	coverUrl: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type CreateCompanyReq = z.infer<typeof companySchema>;
export type UpdateCompanyReq = z.infer<typeof companySchema>;
export type CompanyRes = z.infer<typeof companyResponseSchema>;
