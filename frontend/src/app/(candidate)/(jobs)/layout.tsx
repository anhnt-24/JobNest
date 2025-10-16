import JobSearchBar from './_component/job-search-bar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='w-full mt-24'>
				<JobSearchBar />
				<Breadcrumb className='mb-4'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/components'>Việc làm IT</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{children}
			</div>
		</>
	);
}

export default Layout;
