import { SidebarJobCard } from '@/components/candidate/sidebar-job-card';
import { CompanyCard } from './_component/company-sidebar-card';
import GeneralInfo from './_component/general-info';
import JobDetails from './_component/job-details';
import RelatedJobs from './_component/related-jobs';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex  gap-4'>
			<div className='flex-2 space-y-4'>
				{children}
				<RelatedJobs></RelatedJobs>
			</div>
			<div className='flex-1 space-y-4'>
				<CompanyCard></CompanyCard>
				<GeneralInfo></GeneralInfo>
				<JobDetails />
				<SidebarJobCard></SidebarJobCard>
			</div>
		</div>
	);
}
