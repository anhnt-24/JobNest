'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export function EmailNotificationCard() {
	return (
		<Card className='bg-primary/5 border-none'>
			<CardContent className='flex items-center gap-4 p-6'>
				<img src='/mailbox.png' alt='mail' className='size-32' />
				<div className='flex-1 space-y-2'>
					<h3 className='text-primary font-bold text-2xl'>Nhận thông báo qua email</h3>
					<p className=' text-gray-600'>JobNest' có 2.000 việc làm mới mỗi ngày, hãy để JobNest' gửi thông báo cho bạn khi có việc làm mới phù hợp</p>
					<Button>
						<Bell className='w-4 h-4 mr-2' />
						Nhận thông báo
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
