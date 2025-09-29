'use client';

import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Bell, Briefcase, Calendar, MessageSquare, Building2, CheckCheck, ArrowDown, User, Earth, User2 } from 'lucide-react';

// Dữ liệu demo
const notifications = [
	{
		id: 1,
		type: 'interview',
		title: 'Lịch phỏng vấn đã được xác nhận',
		sender: { type: 'company', name: 'Công ty ABC' },
		message: 'Phỏng vấn vị trí Senior Frontend Developer vào 14:00 ngày 07/08/2025',
		time: '2 giờ trước',
		unread: true,
	},
	{
		id: 2,
		type: 'application',
		title: 'Hồ sơ của bạn đã được duyệt',
		sender: { type: 'recruiter', name: 'Nguyễn Văn A (HR Công ty XYZ)' },
		message: 'Nhà tuyển dụng đang xem xét hồ sơ của bạn',
		time: '1 ngày trước',
		unread: true,
	},
	{
		id: 3,
		type: 'system',
		title: 'Cập nhật hồ sơ của bạn',
		sender: { type: 'system', name: 'Hệ thống' },
		message: 'Bạn chưa cập nhật kỹ năng trong 3 tháng gần đây',
		time: '2 ngày trước',
		unread: false,
	},
	{
		id: 4,
		type: 'message',
		title: 'Tin nhắn mới',
		sender: { type: 'recruiter', name: 'Trần Thị B (Talent Acquisition)' },
		message: 'HR muốn trao đổi thêm về kinh nghiệm của bạn',
		time: '3 ngày trước',
		unread: false,
	},
];

// Icon theo loại thông báo
function getTypeIcon(type: string) {
	switch (type) {
		case 'interview':
			return <Calendar className='w-6 h-6 text-green-600' />;
		case 'application':
			return <Briefcase className='w-6 h-6 text-blue-600' />;
		case 'message':
			return <MessageSquare className='w-6 h-6 text-yellow-600' />;
		case 'system':
			return <Bell className='w-6 h-6 text-purple-600' />;
		default:
			return <Bell className='w-6 h-6 text-gray-600' />;
	}
}

// Icon theo người gửi
function getSenderIcon(type: string) {
	switch (type) {
		case 'company':
			return <Building2 className='w-4 h-4 mr-2' />;
		case 'recruiter':
			return <User2 className='w-4 h-4 mr-2' />;
		case 'system':
			return <Earth className='w-4 h-4 mr-2' />;
		default:
			return <User className='w-4 h-4 mr-2' />;
	}
}

// Component hiển thị 1 thông báo
function NotificationItem({ notification }: { notification: any }) {
	return (
		<div className={`p-4 border-b hover:bg-primary/5 ${notification.unread ? 'bg-gray-100' : ''}`}>
			<div className='flex items-start '>
				<div className='flex-grow'>
					<div className='flex justify-between items-start'>
						<div>
							<h3>{notification.title}</h3>
							<div className='flex items-center text-gray-600 mt-1'>
								{getSenderIcon(notification.sender.type)}
								<span>{notification.sender.name}</span>
							</div>
						</div>
						<span className='text-sm text-gray-500'>{notification.time}</span>
					</div>
					<p className='text-gray-600 mt-2'>{notification.message}</p>
				</div>
			</div>
		</div>
	);
}

export default function NotificationsPage() {
	const unreadCount = notifications.filter(n => n.unread).length;

	return (
		<Card>
			<div className='flex justify-between items-center'>
				<div>
					<h2>Thông báo</h2>
					<p className='text-gray-600'>Bạn có {unreadCount} thông báo chưa đọc</p>
				</div>
				<div className='flex gap-2'>
					<Button variant='secondary'>
						<CheckCheck className='w-4 h-4 mr-2' />
						Đánh dấu tất cả đã đọc
					</Button>
				</div>
			</div>

			{/* Danh sách thông báo */}
			<div>
				{notifications.map(notification => (
					<NotificationItem key={notification.id} notification={notification} />
				))}
			</div>

			{/* Xem thêm */}
			<div className='flex justify-center mt-6'>
				<Button>
					<ArrowDown className='size-5 mr-2' />
					Xem thêm thông báo
				</Button>
			</div>
		</Card>
	);
}
