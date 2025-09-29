'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hook/useAuth';

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
		mode: 'onSubmit',
	});
	const { login } = useAuth();

	const onSubmit = async (values: LoginForm) => {
		login(values.email, values.password);
	};
	return (
		<div className='flex gap-12'>
			<div className='w-full max-w-2xl'>
				<h1 className='text-2xl font-bold mb-2'>
					Chào mừng bạn đến với <span className='text-red-600'>JobNest'</span>
				</h1>
				<p className='text-gray-600 mb-4'>
					Bằng việc đăng nhập, bạn đồng ý với các{' '}
					<a href='#' className='text-blue-600 hover:underline'>
						Điều khoản dịch vụ{' '}
					</a>
					và{' '}
					<a href='#' className='text-blue-600 hover:underline'>
						Chính sách quyền riêng tư{' '}
					</a>
					của JobNest'.
				</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-6'>
						<Button variant='outline' className='w-full'>
							<img src='/google-icon.png' className='h-8'></img>
							Đăng nhập bằng Google
						</Button>

						<div className='flex items-center gap-2 text-sm text-gray-400'>
							<div className='flex-1 h-px bg-gray-300' />
							hoặc
							<div className='flex-1 h-px bg-gray-300' />
						</div>

						<div className='space-y-1'>
							<Label>Email *</Label>
							<Input {...register('email')} placeholder='Email' className='bg-white' />
							{errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>}
						</div>

						<div className='space-y-1'>
							<Label>Mật khẩu *</Label>
							<div className='relative'>
								<Input {...register('password')} placeholder='Mật khẩu' type='password' className='bg-white' />

								{errors.password && <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>}
							</div>
							<a href='#' className='my-2 text-blue-600 hover:underline float-right'>
								Quên mật khẩu?
							</a>
						</div>

						<Button className='w-full text-white' type='submit'>
							Đăng nhập bằng Email
						</Button>

						<p className='text-center  text-gray-600'>
							Bạn chưa có tài khoản?{' '}
							<a href='#' className='text-blue-600 hover:underline'>
								Đăng ký ngay
							</a>
						</p>
					</div>
				</form>
			</div>

			<div className='space-y-4'>
				<h2 className='text-xl font-bold'>Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu lương thị trường việc làm</h2>
				<ul className='space-y-3 text-gray-700 text-sm'>
					<li className='flex items-center gap-2'>
						<Check className='text-green-600 w-5 h-5' /> Xem trước mức lương để có thể lợi thế khi thoả thuận
					</li>
					<li className='flex items-center gap-2'>
						<Check className='text-green-600 w-5 h-5' /> Tìm hiểu về phúc lợi, con người, văn hoá công ty
					</li>
					<li className='flex items-center gap-2'>
						<Check className='text-green-600 w-5 h-5' /> Dễ dàng ứng tuyển chỉ với một thao tác
					</li>
					<li className='flex items-center gap-2'>
						<Check className='text-green-600 w-5 h-5' /> Quản lý hồ sơ và quyền riêng tư của bạn
					</li>
				</ul>
			</div>
		</div>
	);
}
