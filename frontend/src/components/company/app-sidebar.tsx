'use client';

import * as React from 'react';
import { IconChartBar, IconFolder, IconHelp, IconListDetails, IconSettings, IconUsers } from '@tabler/icons-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavMain } from '../ui/sidebar/nav-main';
import { BriefcaseBusiness, Info, LayoutDashboard, MessageSquare, MessageSquareDot, Rainbow, Settings, UserCircle } from 'lucide-react';

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/image.png',
	},
	navMain: [
		{
			title: 'Bảng tin',
			url: '/company/jobs',
			icon: LayoutDashboard,
		},
		{
			title: 'Tin tuyển dụng',
			url: '#',
			icon: BriefcaseBusiness,
		},
		{
			title: 'Nhắn tin',
			url: '#',
			icon: MessageSquareDot,
		},
		{
			title: 'Tài khoản',
			url: '#',
			icon: UserCircle,
		},
	],

	navSecondary: [
		{
			title: 'Cài đặt',
			url: '#',
			icon: Settings,
		},
		{
			title: 'Hỗ trợ',
			url: '#',
			icon: Info,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='offcanvas' {...props} className='p-0 border-r'>
			<h1 className='text-primary font-bold text-center text-3xl flex justify-center items-center py-2'>
				<Rainbow className='size-16 mr-2'></Rainbow>
				<span className='text-black'>JobNest'</span>
			</h1>
			<SidebarContent>
				<NavMain items={data.navMain} title='Điều hướng' />
				<NavMain items={data.navSecondary} title='Khác' />
			</SidebarContent>
		</Sidebar>
	);
}
