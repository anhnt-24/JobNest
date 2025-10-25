import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { Badge } from '../ui/badge';

export function NotificationDropdown() {
	// Sample notifications
	const notifications = [
		{
			id: 1,
			title: 'Ứng tuyển thành công',
			message: 'Bạn đã ứng tuyển thành công vào vị trí Frontend Developer tại ABC Company',
			time: '10 phút trước',
			read: false,
		},
		{
			id: 2,
			title: 'Nhà tuyển dụng quan tâm',
			message: 'XYZ Corp đã xem hồ sơ của bạn',
			time: '2 giờ trước',
			read: false,
		},
		{
			id: 3,
			title: 'Gợi ý việc làm mới',
			message: 'Có 5 vị trí phù hợp với bạn',
			time: '1 ngày trước',
			read: true,
		},
		{
			id: 4,
			title: 'Nhắc nhở hồ sơ',
			message: 'Cập nhật CV để tăng cơ hội việc làm',
			time: '3 ngày trước',
			read: true,
		},
	];

	const unreadCount = notifications.filter(n => !n.read).length;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='relative outline-none'>
				<div className='p-2 rounded-full bg-gray-100'>
					<Bell className='h-6 w-6 text-gray-600' />
					{unreadCount > 0 && <Badge className='absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center rounded-full justify-center'>{unreadCount}</Badge>}
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-110 max-h-[500px] overflow-y-auto' align='end'>
				<DropdownMenuLabel className='sticky top-0 bg-background z-10 flex justify-between items-center py-2'>
					<h6 className='font-bold text-lg'>Thông báo</h6>
					<button className='text-base cursor-pointer text-primary hover:underline'>Đánh dấu tất cả đã đọc</button>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className='mb-2' />
				{notifications.length === 0 ? (
					<div className='py-4 text-centertext-muted-foreground'>Không có thông báo mới</div>
				) : (
					notifications.map(notification => (
						<DropdownMenuItem key={notification.id} className={`flex flex-col items-start gap-1 py-3 w-full ${notification.read ? 'opacity-70' : 'bg-accent'}`}>
							<div className='w-full flex justify-between'>
								<span className='font-semibold'>{notification.title}</span>
								<span className='text-sm text-gray-600'>{notification.time}</span>
							</div>
							<p className='text-sm text-gray-400'>{notification.message}</p>
						</DropdownMenuItem>
					))
				)}

				<DropdownMenuSeparator />

				<DropdownMenuItem className='text-center justify-center text-primary hover:text-primary/80 text-base font-medium cursor-pointer'>Xem tất cả thông báo</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
