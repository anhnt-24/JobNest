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
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Building2, Send, Search, Bell, Volume2, Settings, Paperclip, Smile, Hand } from 'lucide-react';
import { useState } from 'react';
import { AppliedJobList } from './_component/applied-job-list';
import { ConversationSidebar } from './_component/conversation-sidebar';
import { FaHand } from 'react-icons/fa6';

export default function MessagesPage() {
	const [activeConvo, setActiveConvo] = useState<number | null>(null);
	const [activeApplication, setActiveApplication] = useState(null);
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

	return (
		<Card className='flex p-0 '>
			<div className='flex'>
				<ConversationSidebar activeConvo={activeConvo} setActiveConvo={setActiveConvo} />

				<div className='flex-grow flex flex-col h-dvh '>
					{activeApplication && (
						<div className='px-4  h-24 border-b flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<Avatar className='size-14 border rounded-full'>
									<AvatarImage src={activeApplication?.job.company?.avatarUrl} className='rounded-full size-full'></AvatarImage>
								</Avatar>
								<div>
									<h3 className='font-semibold'>{activeApplication?.job.company?.name}</h3>
									<p className=' text-gray-600'>Vị trí: {activeApplication?.job.title}</p>
								</div>
							</div>
							<Button>Xem thông tin</Button>
						</div>
					)}
					{activeConvo ? (
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
					) : (
						<div className='flex-grow flex-col flex pt-40 gap-2 items-center'>
							<Avatar className='border rounded-full'>
								<AvatarImage src={activeApplication?.job.company?.avatarUrl} className='rounded-full size-14'></AvatarImage>
							</Avatar>
							<h3 className='font-semibold'>{activeApplication?.job.company?.name}</h3>
							<p>Vị trí: {activeApplication?.job.title}</p>
							<p>
								Hãy bắt đầu cuộc trò chuyện bằng một lời chào <FaHand className=' inline  text-yellow-500 size-6 '></FaHand>
							</p>
						</div>
					)}

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
				<AppliedJobList setActiveApplication={setActiveApplication} setActiveConvo={setActiveConvo}></AppliedJobList>
			</div>
		</Card>
	);
}
