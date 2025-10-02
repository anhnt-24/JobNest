'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaEnvelope } from 'react-icons/fa6';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push('/forgot-password/success');
	};

	return (
		<div>
			<h1 className=' text-gray-800 text-center'>Quên mật khẩu</h1>
			<p className='text-gray-500 text-center'>Nhập email để nhận link đặt lại mật khẩu</p>

			<form onSubmit={handleSubmit} className='mt-6 space-y-4'>
				<div className='flex items-center border px-2 gap-2'>
					<FaEnvelope className='size-6 text-green-700' />
					<div className='border-r h-12'></div>
					<input type='email' placeholder='Email của bạn' value={email} onChange={e => setEmail(e.target.value)} required className='h-12 flex-1 outline-0' />
				</div>
				<Button className='w-full bg-green-700 hover:bg-green-800 text-white font-medium shadow-lg text-lg h-12 transition-all'>Gửi link xác nhận</Button>
			</form>
		</div>
	);
}
