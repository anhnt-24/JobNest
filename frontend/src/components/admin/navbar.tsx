'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Menu, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
	const pathname = usePathname();

	return (
		<header className='border-b border-gray-200 bg-white'>
			<div className='flex h-16 items-center justify-between px-4'>
				<div className='flex items-center space-x-4'>
					<Button variant='ghost' size='icon' className='lg:hidden' onClick={() => setSidebarOpen(!sidebarOpen)}>
						<Menu className='h-6 w-6' />
					</Button>
					<h2 className='text-lg font-semibold'>{pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1)}</h2>
				</div>

				<div className='flex items-center space-x-4'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
						<Input type='search' placeholder='Tìm kiếm...' className='pl-10 w-full md:w-64' />
					</div>

					<Button variant='ghost' size='icon'>
						<Bell className='h-5 w-5' />
					</Button>

					<Button variant='ghost' size='icon'>
						<User className='h-5 w-5' />
					</Button>
				</div>
			</div>
		</header>
	);
}
