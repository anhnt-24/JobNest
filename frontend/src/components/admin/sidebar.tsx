'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import SidebarItem from './sidebar-item';
import { usePathname } from 'next/navigation';

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
	const pathname = usePathname();

	const navItems = [
		{
			href: '/admin/dashboard',
			icon: 'LayoutDashboard',
			title: 'Dashboard',
		},
		{
			href: '/admin/jobs',
			icon: 'Briefcase',
			title: 'Quản lý việc làm',
		},
		{
			href: '/admin/applicants',
			icon: 'Users',
			title: 'Ứng viên',
		},
		{
			href: '/admin/companies',
			icon: 'Building2',
			title: 'Công ty',
		},
		{
			href: '/admin/settings',
			icon: 'Settings',
			title: 'Cài đặt',
		},
	];

	return (
		<>
			{/* Mobile sidebar */}
			<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SheetTrigger asChild className='lg:hidden'>
					<Button variant='ghost' size='icon'>
						<Menu className='h-6 w-6' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='w-64 p-0'>
					<div className='h-full py-4'>
						<div className='px-4 py-2'>
							<h1 className='text-xl font-bold'>JobBoard Admin</h1>
						</div>
						<nav className='mt-6'>
							{navItems.map(item => (
								<SidebarItem key={item.href} href={item.href} icon={item.icon} title={item.title} active={pathname === item.href} onClick={() => setSidebarOpen(false)} />
							))}
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			{/* Desktop sidebar */}
			<div className='hidden lg:flex lg:flex-shrink-0'>
				<div className='flex w-64 flex-col border-r border-gray-200 bg-white'>
					<div className='flex h-0 flex-1 flex-col overflow-y-auto'>
						<div className='px-4 py-4'>
							<h1 className='text-xl font-bold'>JobBoard Admin</h1>
						</div>
						<nav className='mt-6 flex-1 space-y-1 px-2'>
							{navItems.map(item => (
								<SidebarItem key={item.href} href={item.href} icon={item.icon} title={item.title} active={pathname === item.href} />
							))}
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}
