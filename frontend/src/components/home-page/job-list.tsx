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

export function JobListings() {
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
			<div className='max-w-7xl mx-auto py-6 font-sans w-full '>
				<div className='flex justify-between'>
					<h1> Việc làm tốt nhất</h1>
					<div className='flex items-center gap-1 text-primary cursor-pointer hover:text-primary/80'>
						<p className='font-semibold '>Xem tất cả</p>
						<ChevronRight />
					</div>
				</div>
				<JobFilters />

				<p className='text-sm  p-2 rounded-lg border-blue-600 bg-blue-50 border '>
					<span className='font-bold'>
						<Lightbulb className='inline text-blue-600 ' size={18}></Lightbulb> Gợi ý:{' '}
					</span>
					Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
				</p>

				<Separator className='my-4' />

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{jobs?.items?.map(job => (
						<JobCard job={job} />
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
