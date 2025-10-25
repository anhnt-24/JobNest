import { Suspense } from 'react';
import JobPosting from '../_component/job-posting';
import { CompanyCard } from '../_component/company-sidebar-card';
import GeneralInfo from '../_component/general-info';
import JobDetails from '../_component/job-details';
import { SidebarJobCard } from '@/components/candidate/sidebar-job-card';
import { jobService } from '@/service/job.service';
import RelatedJobs from '@/components/candidate/related-jobs';
import { Loading } from '@/components/shared/loading';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const job = await jobService.getById(id).then(res => res.data);

	return (
		<div className='flex  gap-6'>
			<div className='flex-2 space-y-6'>
				<Suspense fallback={<Loading />}>
					<JobPosting job={job}></JobPosting>
				</Suspense>
				<RelatedJobs></RelatedJobs>
			</div>
			<div className='flex-1 space-y-6'>
				<CompanyCard company={job.company}></CompanyCard>
				<GeneralInfo></GeneralInfo>
				<JobDetails job={job} />
				<SidebarJobCard></SidebarJobCard>
			</div>
		</div>
	);
}
