'use client';

import { usePathname } from 'next/navigation';

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { IconNode, LucideProps } from 'lucide-react';

export function NavMain({
	items,
	title,
}: {
	items: {
		title: string;
		url: string;
		icon?: any;
	}[];
	title?: string;
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className='flex flex-col'>
				<SidebarMenu className='px-0'>
					{title && <p className='text-gray-500 text-sm  font-semibold mb-2 px-4 uppercase'>{title}</p>}
					{items.map(item => {
						const isActive = pathname === item.url; //
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									tooltip={item.title}
									asChild
									className={`space-x-3 rounded-none  py-[19]  text-base
										hover:bg-blue-600/5 hover:text-blue-600
										px-8
										${isActive ? 'border-r-2 border-blue-600 bg-blue-600/5 text-primary  ' : '  '}`}>
									<a href={item.url}>
										{item.icon && <item.icon className='!size-6 ' strokeWidth={1.2} />}
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
