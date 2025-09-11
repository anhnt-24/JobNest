'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, MessageCircleMore, Search } from 'lucide-react';
import { Input } from '../input';
import { Label } from '../label';
import { UserDropdown } from '@/components/home-page/user-dropdown';

export function SiteHeader() {
	return (
		<header className='flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
			<div className='flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6'>
				<div className='flex gap-2 items-center'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
					<div className='relative'>
						<Label htmlFor='search' className='sr-only'>
							Search
						</Label>
						<SidebarInput id='search' placeholder='Tìm kiếm...' className='h-8 pl-7 text-sm' />
						<Search className='pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none' />
					</div>
				</div>

				<div className='flex items-center space-x-3'>
					<button className='p-2 text-gray-600 bg-gray-100  rounded-full hover:bg-gray-100 transition-colors relative'>
						<Bell className='h-6 w-6' />
					</button>
					<button className='p-2 text-gray-600 bg-gray-100  rounded-full hover:bg-gray-100 transition-colors relative'>
						<MessageCircleMore className='h-6 w-6' />
					</button>
					<UserDropdown />
				</div>
			</div>
		</header>
	);
}
