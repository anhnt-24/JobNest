'use client';

import * as React from 'react';
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/ui/company/nav-main';
import { NavSecondary } from '@/components/ui/company/nav-secondary';
import { NavUser } from '@/components/ui/company/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Rainbow } from 'lucide-react';

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/image.png',
	},
	navMain: [
		{
			title: 'Bảng tin',
			url: '#',
			icon: IconDashboard,
		},
		{
			title: 'Tin tuyển dụng',
			url: '#',
			icon: IconListDetails,
		},
		{
			title: 'Quản lý CV ứng viên',
			url: '#',
			icon: IconChartBar,
		},
		{
			title: 'Nhắn tin',
			url: '#',
			icon: IconFolder,
		},
		{
			title: 'Tài khoản',
			url: '#',
			icon: IconUsers,
		},
	],

	navSecondary: [
		{
			title: 'Cài đặt',
			url: '#',
			icon: IconSettings,
		},
		{
			title: 'Hỗ trợ',
			url: '#',
			icon: IconHelp,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='offcanvas' {...props} className='p-0'>
			<h1 className='text-primary font-bold text-center text-3xl flex justify-center items-center border-b py-1'>
				<Rainbow className='size-12 mr-2'></Rainbow>
				<span className='text-black'>JobNest'</span>
			</h1>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
