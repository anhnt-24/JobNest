'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem, MessageCircleMore, ChevronsRight } from 'lucide-react';
import { JobsDropdown } from './job-dropdown';
import { UserDropdown } from './user-dropdown';
import { NotificationDropdown } from './notification-dropdown';
import { useAuth } from '@/hook/useAuth';

export default function Header() {
	const { user } = useAuth();
	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='container mx-auto '>
				<div className='flex items-center justify-between h-18'>
					<div className='flex space-x-1 py-2 '>
						<Link href='/' className='mr-2'>
							<div className='text-2xl font-bold text-primary'>JobNest'</div>
							<span className='hidden md:inline  text-gray-500 text-xs italic'>Nơi sự nghiệp bắt đầu</span>
						</Link>
						<JobsDropdown />
						<NavItem text='Công cụ' />
						<NavItem text='Cẩm nang' />
						<NavItem text='JobNest Pro' highlight />
					</div>
					<div className='flex items-center space-x-3'>
						{user && user?.role === 'CANDIDATE' ? (
							<>
								<button className='p-2 text-gray-600 bg-gray-100 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors relative'>
									<MessageCircleMore className='h-6 w-6' />
									<span className='sr-only'>Tin nhắn</span>
								</button>
								<NotificationDropdown />
								<UserDropdown />
							</>
						) : (
							<>
								<Link href={'/register'}>
									<Button variant='outline' className='rounded-xs text-base hidden md:flex'>
										Đăng ký
									</Button>
								</Link>
								<Link href={'/login'}>
									<Button className='rounded-xs hidden md:inline-flex text-base'>Đăng nhập</Button>
								</Link>
								<div className='border-1 h-8' />
							</>
						)}

						<div>
							<span className='text-gray-400 text-sm'>Bạn là nhà tuyển dụng?</span>
							<Link href='/company-register' className='font-medium  flex items-center group hover:text-primary'>
								Đăng tuyển ngay
								<ChevronsRight size={14}></ChevronsRight>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function NavItem({ text = '', active = false, highlight = false }) {
	return (
		<Link
			href='#'
			className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-colors font-medium ${
				active ? 'text-blue-600 font-medium' : highlight ? 'text-yellow-600 ' : 'text-gray-800 hover:text-primary'
			}`}>
			<span className={`mr-2 ${highlight ? 'text-yellow-500' : 'text-current'}`}>{highlight && <Gem className='text-yellow-500 h-5 w-5' />}</span>
			{text}
		</Link>
	);
}
