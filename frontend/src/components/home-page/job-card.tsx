'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Gem, Heart, HeartPlus, Zap } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { CustomBadge } from '../ui/custom/custom-badge';
import Link from 'next/link';

export function JobCard({ job }: { job?: any }) {
	const id = job.id;
	const { data: isSaved, mutate } = useSWR(id ? `/jobs/${id}/toggle-save` : null, () => jobService.isJobSaved(Number(id)).then(res => res.data));
	const handleSaveJob = async () => {
		await jobService.toggleSave(id);
		mutate(!!isSaved);
	};
	return (
		<Card className='p-4 hover:border-primary group  rounded-lg border border-transparent '>
			<div className='flex gap-3'>
				<Link href={`/jobs/${job.id}`}>
					<Avatar className='rounded-sm w-18 h-18 '>
						<AvatarImage src={job.company.avatarUrl} alt='@user' />
						<AvatarFallback>TA</AvatarFallback>
					</Avatar>
				</Link>

				<div>
					<div className='space-x-1'>
						{true && <CustomBadge type='top'></CustomBadge>}
						{true && <CustomBadge type='gap'></CustomBadge>}
					</div>

					<Link href={`/jobs/${job.id}`}>
						<h4 className='line-clamp-1 font-medium  cursor-pointer group-hover:text-primary'>{job.title}</h4>
					</Link>
					<Link href={''}>
						<p className='text-sm font-medium text-gray-400 line-clamp-1'>{job.company.name}</p>
					</Link>
				</div>
			</div>

			<div className=' flex justify-between items-center'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm'>
					<Badge variant={'secondary'}>10 - 35 triệu</Badge>
					<Badge variant={'secondary'}>Hà Nội, Hồ Chí Minh</Badge>
				</div>
				<button onClick={handleSaveJob} className='rounded-full border border-primary text-primary p-1 cursor-pointer hover:bg-primary/5'>
					{isSaved ? <Heart className='fill-primary size-6'></Heart> : <Heart className='size-6' />}
				</button>
			</div>
		</Card>
	);
}
