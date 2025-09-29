'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { JobResponse } from '@/schema/job.schema';
import { jobService } from '@/service/job.service';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import useSWR from 'swr';
import LoadingCard from '../../candidate/profile/skeleton';

const fallbackJob: JobResponse = {
	id: 0,
	title: '',
	description: '',
	requirements: '',
	benefits: '',
	areaTags: '',
	categories: '',
	companyId: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
	deadline: new Date(),
	education: '',
	experience: '',
	level: '',
	mustSkills: '',
	niceSkills: '',
	quantity: 0,
	salaryFrom: 0,
	salaryTo: 0,
	status: '',
	type: 'FULL_TIME',
	workingAddress: '',
	workingMethod: '',
	workingTime: '',
};
function JobDetails() {
	const params = useParams();
	const id = params.id;
	const { data: job, error } = useSWR(id ? `/jobs/${id}` : null, () => jobService.getById(Number(id)).then(res => res.data), { suspense: true, fallbackData: fallbackJob });

	return (
		<>
			<div className='space-y-2'>
				<CardTitle>Danh mục nghề liên quan</CardTitle>
				<ul className='space-y-2'>
					<li className='flex items-center gap-2'>
						<Badge className='text-sm'>{job.categories.split(';').join('/')}</Badge>
					</li>
				</ul>
			</div>

			<div className='space-y-2'>
				<h2>Kỹ năng cần có</h2>
				<ul className='space-y-2'>
					{job.mustSkills.split(';').map(skill => (
						<li key={skill} className='flex items-center gap-2'>
							<span className='h-2 w-2 rounded-full bg-gray-500'></span>
							<span>{skill}</span>
						</li>
					))}
				</ul>
			</div>

			<div className='space-y-2'>
				<h2>Kỹ năng nên có</h2>
				<ul className='space-y-2'>
					{job.niceSkills?.split(';').map(skill => (
						<li key={skill} className='flex items-center gap-2'>
							<span className='h-2 w-2 rounded-full bg-muted-foreground'></span>
							<span>{skill}</span>
						</li>
					))}
				</ul>
			</div>
			{/* Location Section */}
			<div className='space-y-2'>
				<h2>Khu vực</h2>
				<div className='flex flex-wrap gap-2'>
					{job.areaTags.split(';').map(location => (
						<Badge variant={'secondary'} key={location} className='text-sm'>
							{location}
						</Badge>
					))}
				</div>
			</div>
		</>
	);
}

function Component() {
	return (
		<Card>
			<Suspense fallback={<LoadingCard />}>
				<JobDetails></JobDetails>
			</Suspense>
		</Card>
	);
}

export default Component;
