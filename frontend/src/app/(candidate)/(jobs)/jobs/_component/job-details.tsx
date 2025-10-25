'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { JobRes } from '@/schema/job.schema';
import { jobService } from '@/service/job.service';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import useSWR from 'swr';

export default function JobDetails({ job }: { job: JobRes }) {
	return (
		<Card>
			<div className='space-y-2'>
				<h2>Danh mục nghề liên quan</h2>
				<ul className='space-y-2'>
					<li className='flex items-center gap-2'>
						<Badge variant={'secondary'}>{job.category}</Badge>
					</li>
				</ul>
			</div>

			<div className='space-y-2'>
				<h2>Kỹ năng cần có</h2>
				<ul className='space-y-2 space-x-2'>
					{job.mustSkills.map(skill => (
						<Badge key={skill} variant={'secondary'}>
							{skill}
						</Badge>
					))}
				</ul>
			</div>

			<div className='space-y-2'>
				<h2>Kỹ năng nên có</h2>
				<ul className='space-y-2 space-x-2'>
					{job.niceSkills?.map(skill => (
						<Badge key={skill} variant={'secondary'}>
							{skill}
						</Badge>
					))}
				</ul>
			</div>
			<div className='space-y-2'>
				<h2>Khu vực</h2>
				<div className='flex flex-wrap gap-2'>
					{job.areaTags?.map(location => (
						<Badge variant={'secondary'} key={location} className='text-sm'>
							{location}
						</Badge>
					))}
				</div>
			</div>
		</Card>
	);
}
