'use client';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { JobFilters } from './job-filters';
import { JobCard } from './job-card';
import { CardTitle } from '../ui/card';
import { jobService } from '@/service/job.service';
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export function UrgentJobList() {
	const [page, setPage] = useState(1);
	const { data: jobs, isLoading } = useSWR(['/job/listings', page], () => jobService.getAll({ page, limit: 9 }).then(res => res.data));
	if (isLoading) return <></>;
	const handlePrev = () => {
		setPage(prev => (prev > 1 ? prev - 1 : prev));
	};

	const handleNext = () => {
		setPage(prev => (prev < jobs?.meta?.totalPages ? prev + 1 : prev));
	};
	return (
		<div>
			<div className='max-w-7xl mx-auto pb-6 font-sans w-full border-primary border  rounded-xs'>
				<div className='flex justify-between px-4 bg-primary'>
					<div className='py-2'>
						<h2 className='text-white'>Việc làm cần tuyển gấp</h2>
						<p className='text-gray-200'>Nhanh tay ứng tuyển để không bỏ lỡ cơ hội!</p>
					</div>
					<div className='flex items-center gap-1 text-primary cursor-pointer hover:text-primary/80'>
						<p className='font-semibold text-yellow-300 border-b border-yellow-300'>Xem tất cả</p>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
					{jobs?.items?.map(job => (
						<Link href={`/jobs/${job.id}`}>
							<JobCard job={job} />
						</Link>
					))}
				</div>
				<div className='flex items-center justify-center gap-x-4 mt-4'>
					<button
						onClick={handlePrev}
						disabled={page === 1}
						className='rounded-full text-primary border border-primary p-2 hover:bg-primary/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
						<ChevronLeft size={20} className='!text-lg' />
					</button>

					<p className='font-semibold'>
						<span className='text-primary'>{page}</span>
						<span className='text-gray-400'>/ {jobs.meta.totalPages}</span>
					</p>

					<button
						onClick={handleNext}
						disabled={page === jobs.meta.totalPages}
						className='rounded-full text-primary border border-primary p-2 hover:bg-primary/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
