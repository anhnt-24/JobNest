import { AppSidebar } from '@/components/ui/company/app-sidebar';
import { SiteHeader } from '@/components/ui/company/site-header';
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
					'--primary': 'lab(44.0605% 29.0279 -86.0352)',
				} as React.CSSProperties
			}>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2 bg-gray-50'>
						<div className='flex flex-col gap-4 p-4 '>{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
