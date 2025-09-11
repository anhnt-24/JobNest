import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useState } from 'react';
import { Badge } from '../ui/badge';

export function NotificationDropdown() {
	const [unreadOpen, setUnreadOpen] = useState(true);
	const [readOpen, setReadOpen] = useState(false);

	// Sample notification data
	const unreadNotifications = [
		{
			id: 1,
			title: 'Ứng tuyển thành công',
			message: 'Bạn đã ứng tuyển thành công vào vị trí Frontend Developer tại ABC Company',
			time: '10 phút trước',
		},
		{
			id: 2,
			title: 'Nhà tuyển dụng quan tâm',
			message: 'XYZ Corp đã xem hồ sơ của bạn',
			time: '2 giờ trước',
		},
	];

	const readNotifications = [
		{
			id: 3,
			title: 'Gợi ý việc làm mới',
			message: 'Có 5 vị trí phù hợp với bạn',
			time: '1 ngày trước',
		},
		{
			id: 4,
			title: 'Nhắc nhở hồ sơ',
			message: 'Cập nhật CV để tăng cơ hội việc làm',
			time: '3 ngày trước',
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='relative outline-none'>
				<div className='p-2 rounded-full bg-gray-100'>
					<Bell className='h-6 w-6 text-gray-600' />
					{unreadNotifications.length > 0 && <Badge className='absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center  rounded-full justify-center'>{unreadNotifications.length}</Badge>}
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-96 max-h-[500px] overflow-y-auto' align='end'>
				<DropdownMenuLabel className='sticky top-0 bg-background z-10 flex justify-between items-center'>
					<h6 className='font-semibold '>Thông báo</h6>
					<button className='text-sm text-primary hover:underline'>Đánh dấu tất cả đã đọc</button>
				</DropdownMenuLabel>

				{/* Unread Notifications Section */}
				<Collapsible open={unreadOpen} onOpenChange={setUnreadOpen}>
					<CollapsibleTrigger asChild>
						<div className='flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer hover:bg-accent'>
							<div className='flex items-center gap-2'>
								<span>Chưa đọc</span>
								<Badge variant='secondary'>{unreadNotifications.length}</Badge>
							</div>
							{unreadOpen ? <ChevronUp className='h-4 w-4 text-muted-foreground' /> : <ChevronDown className='h-4 w-4 text-muted-foreground' />}
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent>
						{unreadNotifications.map(notification => (
							<DropdownMenuItem key={notification.id} className='flex flex-col items-start gap-1 py-3'>
								<div className='w-full flex justify-between'>
									<span className='font-semibold'>{notification.title}</span>
									<span className='text-xs text-muted-foreground'>{notification.time}</span>
								</div>
								<p className='text-sm text-muted-foreground'>{notification.message}</p>
							</DropdownMenuItem>
						))}
					</CollapsibleContent>
				</Collapsible>

				<DropdownMenuSeparator />

				{/* Read Notifications Section */}
				<Collapsible open={readOpen} onOpenChange={setReadOpen}>
					<CollapsibleTrigger asChild>
						<div className='flex items-center justify-between px-2 py-2  font-medium cursor-pointer hover:bg-accent'>
							<span>Đã đọc</span>
							{readOpen ? <ChevronUp className='h-4 w-4 text-muted-foreground' /> : <ChevronDown className='h-4 w-4 text-muted-foreground' />}
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent>
						{readNotifications.map(notification => (
							<DropdownMenuItem key={notification.id} className='flex flex-col items-start gap-1 py-3 opacity-70'>
								<div className='w-full flex justify-between'>
									<span className='font-semibold'>{notification.title}</span>
									<span className='text-xs text-muted-foreground'>{notification.time}</span>
								</div>
								<p className='text-sm text-muted-foreground'>{notification.message}</p>
							</DropdownMenuItem>
						))}
					</CollapsibleContent>
				</Collapsible>

				{readNotifications.length === 0 && unreadNotifications.length === 0 && <div className='py-4 text-center text-sm text-muted-foreground'>Không có thông báo mới</div>}

				<DropdownMenuSeparator />

				<DropdownMenuItem className='text-center justify-center text-primary hover:underline'>Xem tất cả thông báo</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
