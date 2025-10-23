import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { FaPencil } from 'react-icons/fa6';

export const PersonalInfoCard = () => {
	return (
		<Card className='mb-6 p-6'>
			<div className='flex justify-between'>
				<CardTitle className='my-0'> Thông tin cá nhân</CardTitle>
				<button className='text-gray-600'>
					<FaPencil className='size-6' />
				</button>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<p className='text-gray-400'>Email</p>
					<p className='font-semibold text-lg text-lg text-gray-800'>tuananh@example.com</p>
				</div>
				<div>
					<p className='text-gray-400'>Số điện thoại</p>
					<p className='font-semibold text-lg text-gray-800'>0123 456 789</p>
				</div>
				<div>
					<p className='text-gray-400'>LinkedIn</p>
					<p className='font-semibold text-lg text-gray-800'>linkedin.com/in/tuananh</p>
				</div>
				<div>
					<p className='text-gray-400'>GitHub</p>
					<p className='font-semibold text-lg text-gray-800'>github.com/tuananh</p>
				</div>
				<div>
					<p className='text-gray-400'>Ngày sinh</p>
					<p className='font-semibold text-lg text-gray-800'>01/01/2000</p>
				</div>
				<div>
					<p className='text-gray-400'>Giới tính</p>
					<p className='font-semibold text-lg text-gray-800'>Nam</p>
				</div>
				<div>
					<p className='text-gray-400'>Website</p>
					<p className='font-semibold text-lg text-gray-800'>tuananh.dev</p>
				</div>
			</div>
		</Card>
	);
};
