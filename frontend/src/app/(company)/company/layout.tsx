import { AppSidebar } from '@/components/ui/company/app-sidebar';
import { ChartAreaInteractive } from '@/components/ui/company/chart-area-interactive';
import { DataTable } from '@/components/ui/company/data-table';
import { SectionCards } from '@/components/ui/company/section-cards';
import { SiteHeader } from '@/components/ui/company/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Children } from 'react';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 64)',
					'--header-height': 'calc(var(--spacing) * 12)',
				} as React.CSSProperties
			}>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2'>
						<div className='flex flex-col gap-4 p-6 md:gap-6 md:py-6'>{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
