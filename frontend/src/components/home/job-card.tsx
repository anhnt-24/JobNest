'use client';
import { Card } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { SaveJobButton } from '../shared/save-job-btn';

export function JobCard({ job }: { job?: any }) {
	return (
		<Card className='p-4 hover:border-primary group  rounded-lg border border-transparent '>
			<div className='flex gap-3'>
				<Link href={`/jobs/${job.id}`}>
					<Avatar className='rounded-sm w-18 h-18 '>
						<AvatarImage src={job.company.user.avatarUrl} alt='@user' className='border object-contain' />
						<AvatarFallback>TA</AvatarFallback>
					</Avatar>
				</Link>

				<div>
					{/* <div className='space-x-1'>
						{true && <CustomBadge type='top'></CustomBadge>}
						{true && <CustomBadge type='gap'></CustomBadge>}
					</div> */}

					<Link href={`/jobs/${job.id}`}>
						<p className='line-clamp-2 font-semibold  cursor-pointer group-hover:text-primary'>{job.title}</p>
					</Link>
					<Link href={''}>
						<p className='text-sm font-medium text-gray-400 line-clamp-1'>{job.company?.user.name}</p>
					</Link>
				</div>
			</div>

			<div className=' flex justify-between items-center'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm'>
					<Badge variant={'secondary'} className='rounded-full py-1'>
						{job.salary}
					</Badge>
					<Badge variant={'secondary'} className='rounded-full py-1'>
						{job.areaTags[0]}
					</Badge>
				</div>
				<SaveJobButton iconOnly iconType='heart' size='md' jobId={job.id} rounded></SaveJobButton>
			</div>
		</Card>
	);
}
