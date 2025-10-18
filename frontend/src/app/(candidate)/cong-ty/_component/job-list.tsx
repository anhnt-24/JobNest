'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Bookmark, Heart, Info } from 'lucide-react';
import { SaveJobButton } from '@/components/ui/custom/save-job-btn';
import { JobRes } from '@/schema/job.schema';
export default function JobList({ jobs }: { jobs: JobRes[] }) {
	return (
		<div className='flex-2 space-y-6'>
			<div className='space-y-4'>
				{jobs?.map(job => (
					<div className='p-4  hover:shadow-md transition-shadow border rounded-lg hover:bg-primary/5  hover:border-primary'>
						<div className='flex gap-4 items-start'>
							<Avatar className='size-24 border border-gray-200 rounded-xs p-1 bg-white'>
								<AvatarImage className='object-contain' src={job.company.user.avatarUrl} alt='@user' />
							</Avatar>

							<div className='flex-1 space-y-1'>
								<div className='flex justify-between gap-4 '>
									<Link href={`/jobs/${job.id}`} className='flex-1'>
										<p className=' line-clamp-2  hover:text-primary text-lg font-semibold'>{job.title}</p>
									</Link>
									<p className='text-primary font-semibold text-lg '>{job.salary}</p>
								</div>
								<Link href={`/cong-ty/${job.companyId}`}>
									<p className='text-gray-600 '>{job.company?.user.name}</p>
								</Link>
							</div>
						</div>

						<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
							<div className='flex gap-2'>
								<Badge variant={'secondary'}>Hà Nội</Badge>
								<Badge variant={'secondary'}>
									Còn <strong className='text-sm'>30</strong> ngày để ứng tuyển
								</Badge>
								<Badge variant={'secondary'}>Cập nhật 10 phút trước</Badge>
							</div>
							<div className='flex gap-2 justify-center items-center'>
								<Link href={`/jobs/${job.id}`}>
									<Button size={'md'}>Ứng tuyển</Button>
								</Link>
								<SaveJobButton size='md' iconOnly jobId={job.id} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
