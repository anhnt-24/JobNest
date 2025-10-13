'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CVStatsCardProps {
	views?: number;
}

export default function CVStatsCard({ views = 0 }: CVStatsCardProps) {
	return (
		<Card>
			<div>
				<CardTitle className='text-primary font-semibold text-xl'>CV của bạn đã đủ tốt?</CardTitle>
				<p className='text-gray-600 text-sm mt-1'>Bao nhiêu NTD đang quan tâm tới Hồ sơ của bạn?</p>
			</div>
			<div className='flex items-center gap-4'>
				<div className='w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600'>
					<div className='text-center'>
						<p className='text-2xl font-bold'>{views}</p>
						<p className='text-sm'>lượt</p>
					</div>
				</div>

				<p className='text-sm text-gray-600 text-left max-w-[220px]'>Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần hơn với công việc phù hợp.</p>
			</div>
			<Button>Khám phá ngay</Button>
		</Card>
	);
}
