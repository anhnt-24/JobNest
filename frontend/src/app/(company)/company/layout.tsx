import { AppSidebar } from '@/components/company/app-sidebar';
import { SiteHeader } from '@/components/company/site-header';
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
				} as React.CSSProperties
			}>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2 '>
						<div className='flex flex-col gap-6 p-6 flex-1 '>{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
