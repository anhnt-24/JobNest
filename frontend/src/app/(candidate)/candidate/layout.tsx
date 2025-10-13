import Footer from '@/components/home-page/footer';
import Header from '@/components/home-page/header';
import { Card } from '@/components/ui/card';
import { ProfileStatusCard } from '@/components/candidate/profile-status-card';
import { SidebarJobCard } from '@/components/candidate/sidebar-job-card';
import { HorizontalTabs } from './_component/horizonal-tabs';
import CVStatsCard from '@/components/candidate/cv-stats-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Breadcrumb className='mt-24 mb-4'>
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

			<div className=' flex-1 flex gap-4 '>
				<HorizontalTabs></HorizontalTabs>

				<div className='flex-2 space-y-4'>{children}</div>
				<div className='flex-1 space-y-4'>
					<ProfileStatusCard />
					<CVStatsCard />
					<SidebarJobCard></SidebarJobCard>
				</div>
			</div>
		</div>
	);
}
