'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import Link from 'next/link';
import { SaveJobButton } from '@/components/shared/save-job-btn';
import { useState } from 'react';
import Pagination from '@/components/shared/pagination';
import { Loading } from '@/components/shared/loading';
import { RelativeTime } from '@/components/shared/relative-time';
import { Countdown } from '@/components/shared/count-down';
function SuggestedJobs() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const { data: jobs, isLoading } = useSWR([`/timviec/`, page, limit], () => jobService.getAll({ page, limit }).then(res => res.data));
	return (
		<div className='px-4 space-y-4'>
			<div>
				<h2>Việc làm gợi ý cho bạn</h2>
				<p className='text-gray-600'>Những công việc phù hợp nhất với bạn dựa trên mong muốn, kỹ năng và kinh nghiệm.</p>
			</div>

			{isLoading && <Loading></Loading>}
			{jobs?.items?.map(job => (
				<div className='p-4  hover:shadow-md transition-shadow border rounded-lg hover:bg-primary/5  hover:border-primary'>
					<div className='flex gap-4 items-start'>
						<Link href={`/jobs/${job.id}`}>
							<Avatar className='size-24 border border-gray-200 rounded-xs p-1 bg-white'>
								<AvatarImage className='object-contain' src={job.company.user.avatarUrl} alt='@user' />
							</Avatar>
						</Link>

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
							<Badge variant={'secondary'}>{job.areaTags[0]}</Badge>
							<Badge variant={'secondary'}>
								<Countdown date={job.deadline as Date} prefix='Còn' suffix='để ứng tuyển' />
							</Badge>
							<Badge variant={'secondary'}>
								<RelativeTime date={job.updatedAt}></RelativeTime>
							</Badge>
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
			<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={jobs?.meta?.total}></Pagination>
		</div>
	);
}
export default SuggestedJobs;
