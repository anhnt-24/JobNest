import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { AvatarImage } from '@radix-ui/react-avatar';

export function UserDropdown() {
	const [isCvOpen, setIsCvOpen] = useState(false);
	const [isJobOpen, setIsJobOpen] = useState(false);
	const { logout, user } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex items-center gap-2 outline-none' asChild>
				<div className='relative cursor-pointer'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src={user?.candidate.avatarUrl || ''} />
						<AvatarFallback className='bg-gray-100 font-medium'>TA</AvatarFallback>
					</Avatar>
					<ChevronDown className='h-4 w-4 text-gray-500 bg-gray-200 border-white border-3 rounded-full absolute -right-1 -bottom-1' />
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-100' align='end'>
				<DropdownMenuLabel>
					<div className='flex space-x-4'>
						<Avatar className='h-14 w-14'>
							<AvatarImage src={user?.candidate.avatarUrl} />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
						<div className='flex flex-col space-y-1'>
							<p className=''>{user?.name}</p>
							<p className='text-sm leading-none text-green-600'>Tài khoản đã xác thực</p>
							<p className='text-sm leading-none text-muted-foreground'>
								ID {user?.id} | {user?.email}{' '}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<Collapsible open={isJobOpen} onOpenChange={setIsJobOpen}>
					<CollapsibleTrigger asChild>
						<div className='flex items-center justify-between px-2 py-1.5  cursor-pointer hover:bg-accent rounded'>
							<span>Quản lý tìm việc</span>
							{isJobOpen ? <ChevronUp className='h-4 w-4 text-muted-foreground' /> : <ChevronDown className='h-4 w-4 text-muted-foreground' />}
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className='pl-2'>
						<DropdownMenuItem>Việc làm đã lưu</DropdownMenuItem>
						<DropdownMenuItem>Việc làm đã ứng tuyển</DropdownMenuItem>
						<DropdownMenuItem>Việc làm phù hợp với bạn</DropdownMenuItem>
						<DropdownMenuItem>Cài đặt gợi ý việc làm</DropdownMenuItem>
					</CollapsibleContent>
				</Collapsible>

				<DropdownMenuSeparator />

				<Collapsible open={isCvOpen} onOpenChange={setIsCvOpen}>
					<CollapsibleTrigger asChild>
						<div className='flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-accent rounded'>
							<span>Quản lý CV & Cover letter</span>
							{isCvOpen ? <ChevronUp className='h-4 w-4 text-muted-foreground' /> : <ChevronDown className='h-4 w-4 text-muted-foreground' />}
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className='pl-2 '>
						<DropdownMenuItem>CV của tôi</DropdownMenuItem>
						<DropdownMenuItem>Cover Letter của tôi</DropdownMenuItem>
						<DropdownMenuItem>Nhà tuyển dụng muốn kết nối với bạn</DropdownMenuItem>
						<DropdownMenuItem>Nhà tuyển dụng xem hồ sơ</DropdownMenuItem>
					</CollapsibleContent>
				</Collapsible>

				<DropdownMenuSeparator />

				<DropdownMenuItem className='hover:bg-gray-100 text-base'>Cá nhân & Bảo mật</DropdownMenuItem>
				<DropdownMenuItem className='text-base hover:bg-gray-100'>Nâng cấp tài khoản</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={logout} className='cursor-pointer text-primary text-base hover:bg-orange-100'>
					<LogOut className='text-primary'></LogOut>
					Đăng xuất
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
