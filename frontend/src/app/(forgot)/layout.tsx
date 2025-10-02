import { ReactNode } from 'react';
import { FaLock } from 'react-icons/fa6';

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen flex items-center justify-center bg-green-50  p-4 relative overflow-hidden'>
			<div className='relative w-full max-w-xl'>
				<div className='bg-white shadow-2xl rounded-2xl p-10 space-y-8'>{children}</div>
				<div className='text-center mt-4 text-gray-500 '>&copy; {new Date().getFullYear()} JobNest'. All rights reserved.</div>
			</div>
		</div>
	);
}
