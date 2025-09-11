'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

interface SidebarItemProps {
	href: string;
	icon: string;
	title: string;
	active?: boolean;
	onClick?: () => void;
}

export default function SidebarItem({ href, icon, title, active = false, onClick }: SidebarItemProps) {
	const Icon = dynamic(() => import('lucide-react').then(mod => mod[icon as keyof typeof mod] as LucideIcon));

	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn('group flex items-center rounded-md px-2 py-2 text-sm font-medium', active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}>
			<Icon className={cn('mr-3 h-5 w-5 flex-shrink-0', active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500')} />
			{title}
		</Link>
	);
}
