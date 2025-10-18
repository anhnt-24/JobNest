'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { conversationService } from '@/service/conversation.service';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Volume2, Search, Settings } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Empty from '@/components/ui/custom/empty';
import { useAuth } from '@/hook/useAuth';
import { useConversationStore } from '@/store/conversation-store';

interface ConversationSidebarProps {
	activeConvo?: number | null;
	setActiveConvo: (id: number | null) => void;
	setActiveEmployer: (id: number | null) => void;
}

export function ConversationSidebar({ activeConvo, setActiveConvo, setActiveEmployer }: ConversationSidebarProps) {
	const { data: conversations, isLoading } = useSWR('/conversations', () => conversationService.getMyConversations().then(res => res.data));
	const [search, setSearch] = useState('');
	const { user } = useAuth();
	const converstationStatus = useConversationStore(state => state.userConversations);
	return (
		<div className='w-1/4 border-r flex flex-col'>
			<div className='flex p-4 items-center justify-between'>
				<h3>
					<span className='text-primary font-bold text-2xl'>JobNest'</span>
					<span className='text-2xl font-semibold text-gray-700'> Connect</span>
				</h3>
				<div className='flex gap-2 items-center'>
					<Button size='sm' variant='secondary'>
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
					<Input type='text' placeholder='Tìm kiếm tin nhắn...' className='pl-10 w-full' value={search} onChange={e => setSearch(e.target.value)} />
				</div>
			</div>

			<div className='flex-1 overflow-y-auto'>
				{isLoading ? (
					<div className='p-4 space-y-3'>
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className='flex items-center gap-3 w-full p-3 rounded-xl'>
								<Skeleton className='w-12 h-12 rounded-full' />
								<div className='flex-1 space-y-2'>
									<Skeleton className='h-4 w-2/3' />
									<Skeleton className='h-3 w-1/2' />
								</div>
							</div>
						))}
					</div>
				) : conversations?.length ? (
					conversations.map((conv: any) => {
						const otherUser = conv.users.find((u: any) => u.userId !== user?.id)?.user;
						const status = converstationStatus.get(conv.id);

						return (
							<div
								onClick={() => {
									setActiveConvo(conv.id);
									setActiveEmployer(otherUser.id!);
								}}
								key={conv.id}
								className={`p-4 border-b cursor-pointer relative transition ${activeConvo === conv.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
								<div className='flex items-center gap-3'>
									<Avatar className='border w-14 h-14'>
										<AvatarImage src={otherUser?.avatarUrl || '/image.png'} className='object-cover' />
									</Avatar>
									<div className='flex-1'>
										<div className='flex justify-between items-start'>
											<div>
												<p className='text-lg font-bold'>
													{otherUser?.name}
													{!!status?.unreadCount && <Badge className='p-0 size-4 text-sm bg-red-600 rounded-full ml-2'>{status?.unreadCount}</Badge>}
												</p>
											</div>
										</div>
										<p className=' text-gray-600  line-clamp-1'>{status?.conversation?.lastMessage || conv.lastMessage}</p>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<Empty />
				)}
			</div>
		</div>
	);
}
