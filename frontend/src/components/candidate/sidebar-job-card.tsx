'use client';

import { Card } from '@/components/ui/card';
import { Heart, HeartPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { ApplyJobDialog } from './apply-job-diaglog';
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
		<div className='p-3 bg-white rounded-sm space-y-2 hover:shadow-md transition-shadow border cursor-pointer'>
			<div className='flex items-start gap-2'>
				<Avatar className='rounded-md w-16 h-16 bg-amber-400'>
					<AvatarImage src={job.company.avatarUrl} alt={job.company.name} />
					<AvatarFallback>TA</AvatarFallback>
				</Avatar>
				<div>
					<h6 className='line-clamp-2 font-bold cursor-pointer hover:text-primary'>{job.title}</h6>
					<p className='text-sm text-gray-600 line-clamp-1'>{job.company.name}</p>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm'>
					{job.salary && <Badge variant='secondary'>{job.salary}</Badge>}
					<Badge variant='secondary'>{job.areaTags.split(';')[0]}</Badge>
				</div>
				<div className='flex items-center gap-2'>
					<ApplyJobDialog job={job} />
					<button onClick={handleSaveJob} className='rounded-full border border-primary text-primary p-2'>
						{isSaved ? <Heart size={14} className='fill-primary'></Heart> : <HeartPlus size={14} />}
					</button>
				</div>
			</div>
		</div>
	);
}

export function SidebarJobCard() {
	const { data: job } = useSWR('/job', () => jobService.getme({ page: 1, limit: 10 }).then(res => res.data));
	const handleApplyJob = (id: number) => {
		console.log('Apply job:', id);
	};
	return (
		<Card>
			<h2>Gợi ý việc làm phù hợp</h2>
			{job?.items?.map((job: any) => (
				<SidebarJobItem key={job.id} job={job} />
			))}
		</Card>
	);
}
