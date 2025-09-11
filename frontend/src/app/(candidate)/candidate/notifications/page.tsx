'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, Briefcase, Calendar, MessageSquare, Building2, CheckCheck, ArrowDown } from 'lucide-react';

const notifications = [
	{
		id: 1,
		type: 'interview',
		title: 'Lịch phỏng vấn đã được xác nhận',
		company: 'Công ty ABC',
		message: 'Phỏng vấn vị trí Senior Frontend Developer vào 14:00 ngày 07/08/2025',
		time: '2 giờ trước',
		unread: true,
	},
	{
		id: 2,
		type: 'application',
		title: 'Hồ sơ của bạn đã được duyệt',
		company: 'Công ty XYZ',
		message: 'Nhà tuyển dụng đang xem xét hồ sơ của bạn',
		time: '1 ngày trước',
		unread: true,
	},
	{
		id: 3,
		type: 'message',
		title: 'Tin nhắn mới từ nhà tuyển dụng',
		company: 'Công ty DEF',
		message: 'HR muốn trao đổi thêm về kinh nghiệm của bạn',
		time: '2 ngày trước',
		unread: false,
	},
	// Thêm các thông báo khác...
];

export default function NotificationsPage() {
	return (
		<Card className=' p-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Thông báo</h1>
					<p className='text-gray-600'>Bạn có 2 thông báo chưa đọc</p>
				</div>
				<div className='flex gap-2'>
					<Button variant='outline'>
						<CheckCheck className='w-4 h-4 mr-2' />
						Đánh dấu tất cả đã đọc
					</Button>
				</div>
			</div>

			<div className='space-y-4'>
				{notifications.map(notification => (
					<Card key={notification.id} className={` p-6  border transition-shadow ${notification.unread ? 'bg-gray-50' : ''}`}>
						<div className='flex items-start gap-4'>
							<div className={`p-3 rounded-full ${notification.type === 'interview' ? 'bg-green-100' : notification.type === 'application' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
								{notification.type === 'interview' ? (
									<Calendar className={`w-6 h-6 ${notification.type === 'interview' ? 'text-green-600' : notification.type === 'application' ? 'text-blue-600' : 'text-yellow-600'}`} />
								) : notification.type === 'application' ? (
									<Briefcase className='w-6 h-6 text-blue-600' />
								) : (
									<MessageSquare className='w-6 h-6 text-yellow-600' />
								)}
							</div>
							<div className='flex-grow'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='font-semibold'>{notification.title}</h3>
										<div className='flex items-center text-gray-600 mt-1'>
											<Building2 className='w-4 h-4 mr-2' />
											<span>{notification.company}</span>
										</div>
									</div>
									<span className='text-sm text-gray-500'>{notification.time}</span>
								</div>
								<p className='text-gray-600 mt-2'>{notification.message}</p>
							</div>
						</div>
					</Card>
				))}
			</div>

			<Button>
				<ArrowDown className='size-5' />
				Xem thêm thông báo
			</Button>
		</Card>
	);
}
