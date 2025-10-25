'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, HeartPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { ApplyJobDialog } from './apply-job-diaglog';
import Link from 'next/link';
import { CustomBadge } from '../shared/custom-badge';
import { JobRes } from '@/schema/job.schema';
import { SaveJobButton } from '../shared/save-job-btn';

function SidebarJobItem({ job }: { job: JobRes }) {
	return (
		<div className='p-4 rounded-lg  bg-white space-y-4 hover:border-primary transition-all border cursor-pointer group'>
			<div className='flex items-start gap-3'>
				<Link href={`/jobs/${job.id}`}>
					<Avatar className='w-18 h-18 rounded-sm border p-2'>
						<AvatarImage src={job.company?.user.avatarUrl || 'cc'} alt={job.company?.user.name} className='object-contain' />
						<AvatarFallback>TA</AvatarFallback>
					</Avatar>
				</Link>

				<div>
					<Link href={`/jobs/${job.id}`}>
						<h4 className='line-clamp-2 text-base cursor-pointer hover:text-primary font-semibold '>{job.title}</h4>
					</Link>
					<Link href={`/cong-ty/${job.companyId}`}>
						<p className='line-clamp-1 text-sm text-gray-500 font-medium'>{job.company?.user.name}</p>
					</Link>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 '>
					{job.salary && (
						<Badge variant='secondary' className='bg-primary/10 text-primary '>
							{job.salary}
						</Badge>
					)}
					<Badge variant='secondary' className='rounded-xs'>
						{job.areaTags[0]}
					</Badge>
				</div>
				<div className='flex items-center gap-2'>
					<SaveJobButton jobId={job.id} iconOnly size='md' iconType='heart' rounded></SaveJobButton>
				</div>
			</div>
		</div>
	);
}

export function SidebarJobCard() {
	const { data: job } = useSWR('/job', () => jobService.getAll({ page: 1, limit: 10 }).then(res => res.data));
	const handleApplyJob = (id: number) => {
		console.log('Apply job:', id);
	};
	return (
		<Card>
			<CardTitle>Gợi ý việc làm phù hợp</CardTitle>
			{job?.items?.map((job: any) => (
				<SidebarJobItem key={job.id} job={job} />
			))}
			<Link href='' className='flex items-center gap-2 justify-center font-semibold  text-primary hover:text-primary/80 hover:underline'>
				Xem tất cả
				<ArrowRight className='size-4' strokeWidth={3} />
			</Link>
		</Card>
	);
}
