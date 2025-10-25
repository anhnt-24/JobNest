import { z } from 'zod';
import { UserResponseSchema } from './user.schema';

export const LoginSchema = z.object({
	email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
	password: z.string().min(1, 'Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ≥ 6 ký tự').max(128, 'Mật khẩu quá dài'),
});

export const RegisterSchema = z
	.object({
		name: z.string().min(1, 'Vui lòng nhập họ tên').max(50, 'Tên quá dài'),
		email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
		password: z.string().min(1, 'Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ≥ 6 ký tự').max(128, 'Mật khẩu quá dài'),
		confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Mật khẩu xác nhận không khớp',
	});

export const CompanyRegisterSchema = z
	.object({
		name: z.string().min(1, 'Vui lòng nhập tên công ty').max(100, 'Tên công ty quá dài'),
		email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
		phone: z
			.string()
			.min(10, 'Số điện thoại phải có ít nhất 10 số')
			.max(15, 'Số điện thoại không hợp lệ')
			.regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa chữ số'),
		password: z.string().min(1, 'Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ≥ 6 ký tự').max(128, 'Mật khẩu quá dài'),
		confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Mật khẩu xác nhận không khớp',
	});

export const AuthResponseSchema = z.object({
	user: UserResponseSchema,
	access_token: z.string(),
	refresh_token: z.string(),
});
export type CompanyRegisterReq = z.infer<typeof CompanyRegisterSchema>;
export type LoginReq = z.infer<typeof LoginSchema>;
export type RegisterReq = z.infer<typeof RegisterSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
