'use client';

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordSuccess() {
	const router = useRouter();

	return (
		<div className='text-center space-y-4'>
			<CheckCircle className='mx-auto w-20 h-20 text-green-700 animate-bounce' />
			<div>
				<h2 className='text-2xl font-bold text-gray-800'>Đã gửi link xác nhận</h2>
				<p className='text-gray-500'>Vui lòng kiểm tra email để đặt lại mật khẩu.</p>
			</div>
			<Button onClick={() => router.push('/login')} className='w-full bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg text-lg transition h-12'>
				Quay lại đăng nhập
			</Button>
		</div>
	);
}
