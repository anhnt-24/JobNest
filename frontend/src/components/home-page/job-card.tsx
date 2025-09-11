// components/job-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Heart, HeartPlus } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

export function JobCard() {
	return (
		<Card className='hover:shadow-md transition-shadow border-0 shadow-sm rounded-lg'>
			<div className='flex gap-2'>
				<Avatar className='rounded-md w-16 h-16 bg-amber-400'>
					{' '}
					{/* w-h = kích thước, rounded-md = bo nhẹ, bỏ full */}
					<AvatarImage src='/avatars/01.png' alt='@user' />
					<AvatarFallback>TA</AvatarFallback>
				</Avatar>
				<div>
					<h6 className='line-clamp-2 font-bold hover:underline cursor-pointer'>Chuyên Viên Kinh Doanh/Tư Vấn Tuyển Sinh - B2C Tại Hà Nội, Hồ Chí Minh</h6>
					<p className='text-xs text-gray-600 line-clamp-1'>CÔNG TY TNHH IVY GLOBAL SCHOOL VIỆT NAM</p>
				</div>
			</div>

			<div className=' flex justify-between items-center'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm'>
					<Badge variant={'secondary'}>10 - 35 triệu</Badge>
					<Badge variant={'secondary'}>Hà Nội, Hồ Chí Minh</Badge>
				</div>
				<button className='rounded-full border border-red-600 text-red-600 p-2'>
					<HeartPlus size={14}></HeartPlus>
				</button>
			</div>
		</Card>
	);
}
