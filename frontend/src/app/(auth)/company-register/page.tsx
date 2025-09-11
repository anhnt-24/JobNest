'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hook/useAuth';
import { Check } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CompanyRegisterForm, companyRegisterSchema } from '@/schema/auth.schema';

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CompanyRegisterForm>({
		resolver: zodResolver(companyRegisterSchema),
	});
	const [termsChecked, setTermsChecked] = React.useState(true);
	const { companyRegister } = useAuth();

	const onSubmit = async (data: any) => {
		companyRegister({ ...data, role: 'candidate' });
	};

	return (
		<div className='flex  justify-between gap-12'>
			<div className='max-w-2xl w-full'>
				<div className='mb-4'>
					<h1 className='text-2xl font-bold text-gray-800 mb-2'>Đăng ký tài khoản Nhà tuyển dụng</h1>
					<p className='text-gray-600'>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel.</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<label className='block text-gray-700 font-semibold mb-1'>Tên công ty</label>
						<Input
							type='text'
							placeholder='Nhập tên công ty'
							{...register('name', {
								required: 'Vui lòng nhập tên công ty',
								minLength: {
									value: 2,
									message: 'Tên công ty phải có ít nhất 1 ký tự',
								},
							})}
							className={`bg-white w-full ${errors.name ? 'border-red-500' : ''}`}
						/>
						{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
					</div>

					<div>
						<label className='block text-gray-700 mb-1 font-semibold'>Email</label>
						<Input
							type='email'
							placeholder='Nhập email'
							{...register('email', {
								required: 'Vui lòng nhập email',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Email không hợp lệ',
								},
							})}
							className={`bg-white w-full ${errors.email ? 'border-red-500' : ''}`}
						/>
						{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
					</div>
					<div>
						<label className='block text-gray-700 mb-1 font-semibold'>Số điện thoại</label>
						<Input
							type='phone'
							placeholder='Nhập số điện thoại'
							{...register('phone', {
								required: 'Vui lòng nhập số điện thoại',
							})}
							className={`bg-white w-full ${errors.phone ? 'border-red-500' : ''}`}
						/>
						{errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
					</div>
					<div>
						<label className='block text-gray-700 mb-1 font-semibold'>Mật khẩu</label>
						<Input
							type='password'
							placeholder='Nhập mật khẩu'
							{...register('password', {
								required: 'Vui lòng nhập mật khẩu',
								minLength: {
									value: 6,
									message: 'Mật khẩu phải có ít nhất 6 ký tự',
								},
							})}
							className={`bg-white w-full ${errors.password ? 'border-red-500' : ''}`}
						/>
						{errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
					</div>

					<div>
						<label className='block text-gray-700 mb-1 font-semibold'>Xác nhận mật khẩu</label>
						<Input
							type='password'
							placeholder='Nhập lại mật khẩu'
							{...register('confirmPassword', {
								required: 'Vui lòng xác nhận mật khẩu',
							})}
							className={`bg-white w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
						/>
						{errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
					</div>

					<div className='flex items-center space-x-2'>
						<Checkbox id='terms' checked={termsChecked} onCheckedChange={() => setTermsChecked(!termsChecked)} />
						<label htmlFor='terms' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Tôi đã đọc và đồng ý với{' '}
							<a href='#' className='text-blue-600'>
								Điều khoản dịch vụ
							</a>{' '}
							và{' '}
							<a href='#' className='text-blue-600'>
								Chính sách bảo mật
							</a>{' '}
							của TopCV
						</label>
					</div>

					<Button type='submit' className='w-full' disabled={isSubmitting}>
						{isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
					</Button>

					<div className=' text-gray-500  flex items-center gap-2'>
						<div className='flex-1 border bg-gray-600'></div>
						<p>Hoặc</p>
						<div className='flex-1 border bg-gray-600'></div>
					</div>

					<div className='flex justify-center space-x-4'>
						<Button variant='outline' className='w-full'>
							<img src='/google-icon.png' className='h-8'></img>
							Đăng nhập bằng Google
						</Button>
					</div>

					<div className='text-center mt-4'>
						<span className='text-gray-600'>Bạn đã có tài khoản? </span>
						<Link href='/auth/login' className='text-blue-600 font-semibold hover:underline'>
							Đăng nhập ngay
						</Link>
					</div>
				</form>
			</div>
			{/* Right - Benefits */}
			<div className='space-y-6'>
				<div className='space-y-4'>
					<h2 className='text-xl font-bold'>Vì sao nên tạo tài khoản JobNest' ngay hôm nay?</h2>
					<ul className='space-y-3 text-gray-700 text-sm'>
						<li className='flex items-center gap-2'>
							<Check className='text-green-600 w-5 h-5' /> Nhận gợi ý công việc phù hợp với kỹ năng và kinh nghiệm của bạn
						</li>
						<li className='flex items-center gap-2'>
							<Check className='text-green-600 w-5 h-5' /> Lưu tin tuyển dụng yêu thích để ứng tuyển sau
						</li>
						<li className='flex items-center gap-2'>
							<Check className='text-green-600 w-5 h-5' /> Nhận thông báo việc làm mới mỗi ngày qua email
						</li>
						<li className='flex items-center gap-2'>
							<Check className='text-green-600 w-5 h-5' /> Theo dõi tiến trình ứng tuyển và phản hồi từ nhà tuyển dụng
						</li>
						<li className='flex items-center gap-2'>
							<Check className='text-green-600 w-5 h-5' /> Xây dựng thương hiệu cá nhân để nổi bật trước nhà tuyển dụng
						</li>
					</ul>
				</div>

				{/* Support */}
				<div className='text-sm text-gray-500 border-t pt-4'>
					<p>Bạn cần hỗ trợ khi sử dụng JobNest'?</p>
					<p>
						Gọi tới <span className='font-semibold'>(024) 6680 5588</span> (giờ hành chính) hoặc gửi email về <span className='font-semibold'>support@jobnest.vn</span>.
					</p>
					<p>Đội ngũ JobNest' luôn đồng hành để giúp bạn tìm được công việc mơ ước nhanh nhất.</p>
				</div>
			</div>
		</div>
	);
}
