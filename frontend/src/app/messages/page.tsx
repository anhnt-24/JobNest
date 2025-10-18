'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hook/useAuth';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Send, Paperclip, Smile, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AppliedJobList } from './_component/applied-job-list';
import { ConversationSidebar } from './_component/conversation-sidebar';
import { FaHand } from 'react-icons/fa6';
import LoadingCard from '@/components/ui/custom/skeleton';
import useSWR from 'swr';
import { authService } from '@/service/auth.service';
import { useConversationStore } from '@/store/conversation-store';
import ChatMessages from './_component/chat-message';
import { useChat } from '@/hooks/use-chat';
import { conversationService } from '@/service/conversation.service';

export default function MessagesPage() {
	const [activeConvo, setActiveConvo] = useState<number | null>(null);
	const [activeEmployer, setActiveEmployer] = useState<number | null>(null);
	const [activeApplication, setActiveApplication] = useState<number | null>(null);
	const [input, setInput] = useState<string>('');
	const { user } = useAuth();
	const { data: employer, isLoading } = useSWR(activeEmployer != null ? `/employer/profile/${activeEmployer}` : null, () => authService.findOne(activeEmployer!).then(res => res.data));
	const { messages } = useChat(activeConvo!);
	const handleSendMessage = async () => {
		if (!input.trim() || !user) return;
		let conversationId = activeConvo;
		if (activeConvo === null) {
			const conversation = await conversationService.createByApplicationId(activeApplication!);
			conversationId = conversation.data.id;
			setActiveConvo(conversationId);
		}

		const message = {
			conversationId: conversationId,
			senderId: user.id,
			content: input.trim(),
		};

		setInput('');
		await conversationService.sendMessage(conversationId!, message.content);
	};
	const updateConversation = useConversationStore(state => state.updateConversation);
	useEffect(() => {
		if (activeConvo) {
			conversationService.markAsRead(activeConvo).then(res => updateConversation(activeConvo, res.data));
		}
	}, [activeConvo]);
	if (!user) return <LoadingCard></LoadingCard>;
	return (
		<Card className='flex p-0 '>
			<div className='flex'>
				<ConversationSidebar setActiveEmployer={setActiveEmployer} activeConvo={activeConvo} setActiveConvo={setActiveConvo} />

				<div className='flex-grow flex flex-col h-dvh '>
					{employer && (
						<div className='px-4  h-24 border-b flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<Avatar className='size-14 border rounded-full'>
									<AvatarImage src={employer?.avatarUrl} className='rounded-full size-full'></AvatarImage>
								</Avatar>
								<div>
									<p className='text-lg font-bold'>{employer?.name}</p>
									<p className='text-sm'>{employer?.employer?.company.user.name}</p>
								</div>
							</div>
							<Button>Xem thêm</Button>
						</div>
					)}
					{activeConvo ? (
						<ChatMessages messages={messages}></ChatMessages>
					) : (
						employer && (
							<div className='flex-1  flex-col flex justify-center gap-2 items-center'>
								<Avatar className='border rounded-full'>
									<AvatarImage src={employer?.avatarUrl} className='rounded-full size-14'></AvatarImage>
								</Avatar>
								<div>
									<p className='font-bold text-xl'>{employer?.name}</p>
								</div>
								<p>
									Hãy bắt đầu cuộc trò chuyện bằng một lời chào <FaHand className=' inline  text-yellow-500 size-6 '></FaHand>
								</p>
							</div>
						)
					)}
					{!employer && (
						<div className='flex flex-col items-center flex-1 justify-center p-8 text-gray-400'>
							<MessageSquare className='w-16 h-16 mb-4' />
							<p className='text-lg font-medium'>Chưa có tin nhắn nào</p>
							<p className='text-sm text-gray-500 mt-1'>Bắt đầu cuộc trò chuyện với người khác ngay!</p>
						</div>
					)}
					{employer && (
						<div className='p-4 border-t mt-auto'>
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
					)}
				</div>
				<AppliedJobList setActiveApplication={setActiveApplication} setActiveEmployer={setActiveEmployer} setActiveConvo={setActiveConvo} employer={employer}></AppliedJobList>
			</div>
		</Card>
	);
}
