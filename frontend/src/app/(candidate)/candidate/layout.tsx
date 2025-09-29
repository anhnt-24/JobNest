import Footer from '@/components/home-page/footer';
import Header from '@/components/home-page/header';
import { Card } from '@/components/ui/card';
import { ProfileStatusCard } from '@/components/candidate/profile-status-card';
import { SidebarJobCard } from '@/components/candidate/sidebar-job-card';
import { HorizontalTabs } from './_component/horizonal-tabs';
import CVStatsCard from '@/components/candidate/cv-stats-card';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className=' flex-1 flex gap-4 mt-24 '>
			<HorizontalTabs></HorizontalTabs>
			<div className='flex-2 space-y-4'>{children}</div>
			<div className='flex-1 space-y-4'>
				<ProfileStatusCard />
				<CVStatsCard />
				<SidebarJobCard></SidebarJobCard>
			</div>
		</div>
	);
}
