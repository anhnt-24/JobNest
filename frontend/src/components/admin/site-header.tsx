'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Bell, ChevronDown, LogOut, MessageCircle, MessageCircleMore, Settings, User, UserCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { FaBell, FaCommentDots } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hook/useAuth';

export function SiteHeader() {
	const { logout, user } = useAuth();

	return (
		<header className='flex h-20  items-center border-b '>
			<div className='flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6'>
				<div className='flex gap-2 items-center'>
					<SidebarTrigger className='-ml-2' />
					<Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4 bg-gray-300' />
					<div>DASHBOARD</div>
				</div>

				<div className='flex items-center gap-4'>
					<button className='hover:brightness-90 bg-white border cursor-pointer text-gray-500 p-3 rounded-full'>
						<Bell className='size-6' />
					</button>

					<button className='hover:brightness-90 bg-white border cursor-pointer text-gray-500 p-3 rounded-full'>
						<MessageCircleMore className='size-6' />
					</button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex items-center gap-3 cursor-pointer  py-1 transition hover:bg-gray-100'>
								<Avatar className='size-12 border'>
									<AvatarImage src={user?.company?.user.avatarUrl} alt='avatar' />
									<AvatarFallback>TA</AvatarFallback>
								</Avatar>
								<div className=' flex font-medium items-center gap-2 text-gray-700'>
									{user?.company?.user.name}
									<ChevronDown className='size-5'></ChevronDown>
								</div>
							</div>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end' className='w-80'>
							<DropdownMenuLabel className='font-medium text-lg flex items-center gap-4'>
								<Avatar className='size-16 border'>
									<AvatarImage src={user?.company?.user.avatarUrl} alt='avatar' />
									<AvatarFallback>TA</AvatarFallback>
								</Avatar>
								<div>
									<span className='font-semibold text-lg'>{user?.company?.user.name}</span>
									<p className='text-gray-500'>{user?.email}</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='gap-4'>
								<UserCircle strokeWidth={1.2} className='size-6' />
								Hồ sơ
							</DropdownMenuItem>
							<DropdownMenuItem className='gap-4'>
								<Settings strokeWidth={1.2} className='size-6' />
								Cài đặt
							</DropdownMenuItem>
							<DropdownMenuItem className='gap-4'>
								<Bell strokeWidth={1.2} className='size-6' />
								Thông báo
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='gap-4 text-red-600 focus:text-red-700 hover:!bg-red-600/10 cursor-pointer' onClick={logout}>
								<LogOut strokeWidth={1.2} className='size-6 ' />
								Đăng xuất
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
