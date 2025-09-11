'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
	{
		href: '/company/dashboard',
		icon: LayoutDashboard,
		label: 'Dashboard',
	},
	{
		href: '/company/jobs',
		icon: Briefcase,
		label: 'Quản lý việc làm',
	},
	{
		href: '/company/applications',
		icon: FileText,
		label: 'Đơn ứng tuyển',
	},
	{
		href: '/company/candidates',
		icon: Users,
		label: 'Quản lý ứng viên',
	},
	{
		href: '/company/settings',
		icon: Settings,
		label: 'Cài đặt',
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className='hidden h-full w-56 flex-col border-r bg-background md:flex'>
			<div className='p-4'>
				<h2 className='text-lg font-semibold'>Company Dashboard</h2>
			</div>
			<div className='flex-1 space-y-2 px-3 py-4'>
				{routes.map(route => (
					<Link
						key={route.href}
						href={route.href}
						className={cn('flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent', pathname === route.href ? 'bg-accent' : 'hover:bg-accent')}>
						<route.icon className='mr-2 h-4 w-4' />
						{route.label}
					</Link>
				))}
			</div>
		</div>
	);
}
