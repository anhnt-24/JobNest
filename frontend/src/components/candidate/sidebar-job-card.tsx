'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, HeartPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { ApplyJobDialog } from './apply-job-diaglog';
import Link from 'next/link';
import { CustomBadge } from '../ui/custom/custom-badge';
interface SidebarJobItemProps {
	job: any;
}

function SidebarJobItem({ job }: SidebarJobItemProps) {
	const id = job.id;
	const { data: isSaved, mutate } = useSWR(id ? `/jobs/${id}/toggle-save` : null, () => jobService.isJobSaved(Number(id)).then(res => res.data), { suspense: true, fallbackData: false });

	const handleSaveJob = async () => {
		await jobService.toggleSave(id);
		mutate(!!isSaved);
	};
	return (
		<div className='p-4 rounded-lg  bg-white space-y-2 hover:border-primary transition-all border cursor-pointer group'>
			<div className='flex items-start gap-3'>
				<Avatar className='w-18 h-18 rounded-xs'>
					<AvatarImage src={job.company.avatarUrl} alt={job.company.name} />
					<AvatarFallback className='rounded-md border border-gray-200'>TA</AvatarFallback>
				</Avatar>
				<div>
					<div className='space-x-1'>
						<CustomBadge type='top'></CustomBadge>
						<CustomBadge type='gap'></CustomBadge>
					</div>

					<h4 className='line-clamp-1 cursor-pointer hover:text-primary'>{job.title}</h4>
					<p className='line-clamp-1 text-sm text-gray-500 font-medium'>{job.company.name}</p>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 '>
					{job.salary && (
						<Badge variant='secondary' className='bg-primary/10 text-primary font-semibold rounded-xs'>
							{job.salary}
						</Badge>
					)}
					<Badge variant='secondary' className='rounded-xs'>
						{job.areaTags.split(';')[0]}
					</Badge>
				</div>
				<div className='flex items-center gap-2'>
					{/* <div className='hidden group-hover:block transition-all '>
						<ApplyJobDialog job={job} />
					</div> */}
					<button onClick={handleSaveJob} className='rounded-full border border-primary text-primary p-1 cursor-pointer hover:bg-primary/5'>
						{isSaved ? <Heart size={14} className='size-6 fill-primary'></Heart> : <Heart className='size-6' />}
					</button>
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
		<Card className='gap-4'>
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
