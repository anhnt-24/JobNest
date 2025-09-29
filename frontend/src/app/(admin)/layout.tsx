import { AppSidebar } from '@/components/ui/admin/app-sidebar';
import { SiteHeader } from '@/components/ui/admin/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 74)',
					'--header-height': 'calc(var(--spacing) * 12)',
					'--primary': '',
				} as React.CSSProperties
			}>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2 bg-gray-50'>
						<div className='flex flex-col gap-4'>{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
