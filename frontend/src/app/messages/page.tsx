'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hook/useAuth';
import { useChatSocket } from '@/hooks/use-socket';
import { conversationService } from '@/service/conversation.service';
import { jobService } from '@/service/job.service';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { da } from 'date-fns/locale';
import { Building2, Send, Search, Bell, Volume2, Settings, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';

export default function MessagesPage() {
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const { data, isLoading } = useSWR(['/job/applied', page, limit], () => jobService.getAppliedJobs({ page, limit }).then(res => res.data));
	const { data: conversations } = useSWR('/conversations', () => conversationService.getMyConversations().then(res => res.data));
	const [activeConvo, setActiveConvo] = useState<number | null>(null);
	const { messages: socketMessages } = useChatSocket(activeConvo);
	const [input, setInput] = useState<string>('');
	const { user } = useAuth();
	const handleSendMessage = async () => {
		if (!input.trim() || !activeConvo) return;
		await conversationService.sendMessage(activeConvo, input).then(res => {
			setInput('');
		});
	};
	if (!user) return <div>Loading...</div>;

	if (isLoading && socketMessages && conversations) return <div>Loading...</div>;
	console.log(conversations);
	return (
		<Card className='flex p-0 '>
			<div className='flex'>
				<div className='w-1/4 border-r'>
					<div className='flex p-4 items-center justify-between'>
						<h3>
							<span className='text-primary font-bold text-2xl'>JobNest'</span>
							<span className='text-2xl font-semibold  text-gray-700'> Connect</span>
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
						{conversations?.map(conv => (
							<div onClick={() => setActiveConvo(conv.id)} key={conv.id} className='p-4 border-b hover:bg-gray-50 cursor-pointer relative'>
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
						{socketMessages.map(message => (
							<div key={message.id} className={`flex ${message.senderId === Number(user.id) ? 'justify-end' : 'justify-start'}`}>
								<div className={`max-w-[70%] rounded-lg p-3 ${message.senderId === Number(user.id) ? 'bg-primary text-white' : 'bg-gray-100'}`}>
									<p>{message.content}</p>
									<span className={`text-xs mt-1 block ${message.senderId === Number(user.id) ? 'text-blue-100' : 'text-gray-500'}`}>{new Date(message.createdAt).toLocaleTimeString()}</span>
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
							<Input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Nhập tin nhắn...' className='flex-grow mr-3' />
							<Button onClick={handleSendMessage}>
								<Send className='w-4 h-4' />
							</Button>
						</div>
					</div>
				</div>
				<div className='flex-1 p-4 border-l'>
					<h3 className='mb-2'>TIN TUYỂN DỤNG ĐÃ ỨNG TUYỂN</h3>
					{data?.items?.map(c => (
						<div key={c.id} className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 transition'>
							<div className='flex-shrink-0'>
								<div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
									{c.job?.company?.avatarUrl ? (
										<img src={c.job?.company?.avatarUrl} alt={c.title} className='w-full h-full object-cover' />
									) : (
										<span className='text-sm font-medium text-gray-600'>{c.job.title}</span>
									)}
								</div>
							</div>

							{/* Title & subtitle */}
							<div className='flex-1 min-w-0'>
								<h4 className='font-semibold leading-5 text-gray-900 line-clamp-1'>{c.job.title}</h4>
								<p className='text-sm text-gray-500 truncate mt-0.5 line-clamp-1'>{c.job.company.name}</p>
							</div>

							{/* Button */}
							<button className='flex-shrink-0 cursor-pointer'>
								<span className='inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-primary/50 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10'>
									Nhắn tin
								</span>
							</button>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}
