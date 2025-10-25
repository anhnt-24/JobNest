import { boolean, z } from 'zod';
import { UserResponseSchema } from './user.schema';

export const EmployerSchema = z.object({
	userId: z.number().int(),
	companyId: z.number().int(),
	gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
	dob: z.string(),
	address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
	position: z.string().min(1, 'Vui lòng nhập chức vụ'),
	employeeId: z.string().min(1, 'Vui lòng nhập mã nhân viên'),
});

export const EmployerResponseSchema = EmployerSchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	active: z.boolean(),
	user: UserResponseSchema,
});

export type EmployerReq = z.infer<typeof EmployerSchema>;
export type EmployerRes = z.infer<typeof EmployerResponseSchema>;
