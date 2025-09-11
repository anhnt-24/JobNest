'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Building2, Send, Search, Bell, Volume2, Settings, Paperclip, Smile } from 'lucide-react';

const conversations = [
	{
		id: 1,
		company: 'Công ty ABC',
		avatar: '/company-logos/company1.png',
		lastMessage: 'Xin chào, chúng tôi đã xem hồ sơ của bạn...',
		time: '5 phút trước',
		unread: 2,
		position: 'Senior Frontend Developer',
	},
	{
		id: 2,
		company: 'Công ty XYZ',
		avatar: '/company-logos/company2.png',
		lastMessage: 'Cảm ơn bạn đã quan tâm đến vị trí của chúng tôi',
		time: '2 giờ trước',
		unread: 0,
		position: 'React Developer',
	},
];

const messages = [
	{
		id: 1,
		sender: 'company',
		message: 'Xin chào, cảm ơn bạn đã ứng tuyển vào vị trí Senior Frontend Developer',
		time: '10:00',
	},
	{
		id: 2,
		sender: 'user',
		message: 'Dạ vâng, em rất quan tâm đến vị trí này ạ',
		time: '10:02',
	},
	{
		id: 3,
		sender: 'company',
		message: 'Bạn có thể phỏng vấn vào 14h ngày mai được không?',
		time: '10:05',
	},
];

export default function MessagesPage() {
	return (
		<Card className='flex p-0 '>
			<div className='flex'>
				<div className='w-1/4 border-r'>
					<div className='flex p-4 items-center justify-between'>
						<h3>
							<span className='text-primary font-bold text-2xl'>JobNest'</span>
							<span className='text-xl '> Connect</span>
						</h3>
						<div className='flex gap-2 items-center'>
							<Button size={'sm'} variant={'outline'}>
								{' '}
								Về trang chủ
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' size='icon'>
										<Settings className='w-5 h-5' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56' align='start'>
									<DropdownMenuItem className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<Bell className='w-4 h-4 text-gray-600' />
											<span>Nhận thông báo</span>
										</div>
										<Switch />
									</DropdownMenuItem>
									<DropdownMenuItem className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<Volume2 className='w-4 h-4 text-gray-600' />
											<span>Âm thanh thông báo</span>
										</div>
										<Switch />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className='px-4 pb-4 flex items-center border-b'>
						<div className='relative w-full'>
							<Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
							<Input type='text' placeholder='Tìm kiếm tin nhắn...' className='pl-10 w-full' />
						</div>
					</div>
					<div className=''>
						{conversations.map(conv => (
							<div key={conv.id} className='p-4 border-b hover:bg-gray-50 cursor-pointer relative'>
								<div className='flex items-center gap-3'>
									<Avatar className='border w-14 h-14 '>
										<AvatarImage src={'/image.png'} className='object-cover' />
									</Avatar>
									<div className='flex-1'>
										<div className='flex justify-between items-start'>
											<div>
												<p className='font-semibold'>{conv.company}</p>
												<p className='text-sm text-gray-600 line-clamp-1'>{conv.position}</p>
											</div>
											<span className='text-xs text-gray-500'>{conv.time}</span>
										</div>
										<p className='text-sm text-gray-600  mt-1'>{conv.lastMessage}</p>
									</div>
								</div>
								{conv.unread > 0 && <Badge className='p-0 size-4 rounded-full absolute right-4 bottom-10'>{conv.unread}</Badge>}
							</div>
						))}
					</div>
				</div>

				{/* Khung chat */}
				<div className='flex-grow flex flex-col h-dvh '>
					{/* Header */}
					<div className='px-4  h-18 border-b flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-full bg-gray-200' />
							<div>
								<h3 className='font-semibold'>Công ty ABC</h3>
								<p className='text-sm text-gray-600'>Vị trí: Senior Frontend Developer</p>
							</div>
						</div>
						<Button variant='outline'>Xem thông tin</Button>
					</div>

					{/* Messages */}
					<div className='flex-grow overflow-y-auto p-4 space-y-4'>
						{messages.map(message => (
							<div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
								<div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
									<p>{message.message}</p>
									<span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{message.time}</span>
								</div>
							</div>
						))}
					</div>

					{/* Input */}
					<div className='p-4 border-t'>
						<div className='flex  items-center'>
							<Button variant={'ghost'} size={'sm'}>
								<Paperclip className='size-6 ' />
							</Button>
							<Button variant={'ghost'} size={'sm'}>
								<Smile className='size-6' />
							</Button>
							<Input type='text' placeholder='Nhập tin nhắn...' className='flex-grow mr-3' />
							<Button>
								<Send className='w-4 h-4' />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
