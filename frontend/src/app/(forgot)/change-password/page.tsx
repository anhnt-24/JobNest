'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaEnvelope, FaKey, FaUser } from 'react-icons/fa6';

export default function ResetPasswordPage() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Mật khẩu không khớp');
			return;
		}
		router.push('/login');
	};

	return (
		<div className='space-y-4'>
			<div>
				<h1 className='font-bold text-gray-800 text-center'>Đặt lại mật khẩu</h1>
				<p className='text-gray-500 text-center'>Nhập mật khẩu mới của bạn</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='flex items-center border px-2 gap-2'>
					<FaUser className='size-6 text-primary' />
					<div className='border-r h-12'></div>
					<input type='email' placeholder='Email của bạn' required className='h-12 flex-1 outline-0' />
				</div>
				<div className='flex items-center border px-2 gap-2'>
					<FaKey className='size-6 text-primary' />
					<div className='border-r h-12'></div>
					<input placeholder='Mật khẩu' required className='h-12 flex-1 outline-0' />
				</div>

				<div className='flex items-center border px-2 gap-2'>
					<FaCheck className='size-6 text-primary' />
					<div className='border-r h-12'></div>
					<input placeholder='Xác nhận mật khẩu' required className='h-12 flex-1 outline-0' />
				</div>

				<Button className='w-full h-12 text-white font-medium text-lg shadow-lg transition-all'>Xác nhận</Button>
			</form>
		</div>
	);
}
