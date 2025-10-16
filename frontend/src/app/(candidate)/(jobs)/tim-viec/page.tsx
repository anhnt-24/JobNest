'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { useSearchParams } from 'next/navigation';
import AdvancedFilter from './_components/advanced-filter';
import JobList from './_components/job-list';
import Pagination from '@/components/ui/custom/pagination';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RelatedJobs from './_components/related-jobs copy';
import { JobListQuery } from '@/schema/job.schema';
import LoadingCard from '../../candidate/profile/skeleton';
import { Card } from '@/components/ui/card';
const orderMap: Record<string, Partial<Record<'createdAt' | 'salary' | 'deadline', 'asc' | 'desc'>>> = {
	newest: { createdAt: 'desc' },
	salaryHigh: { salary: 'desc' },
	salaryLow: { salary: 'asc' },
	deadline: { deadline: 'asc' },
};
function Page() {
	const searchParams = useSearchParams();
	const title = searchParams.get('title') || '';

	const [filter, setFilter] = useState<JobListQuery>({
		page: 1,
		limit: 10,
		title,
		orders: orderMap.newest,
	});
	useEffect(() => {
		setFilter(prev => ({
			...prev,
			title: title || '',
			page: 1,
		}));
	}, [title]);

	const { data: jobs, isLoading } = useSWR(['/timviec', filter], () => jobService.getAll(filter).then(res => res.data));

	useEffect(() => {
		if (isLoading) return;
		const history = localStorage.getItem('history');
		const prev: string[] = history ? JSON.parse(history) : [];
		const newHistory = prev.filter(item => item !== title);
		if (newHistory.length >= 5) {
			newHistory.pop();
		}
		if (title.trim() && jobs && jobs?.items?.length > 0) {
			const updated = [title, ...newHistory];
			localStorage.setItem('history', JSON.stringify(updated));
		}
	}, [jobs, isLoading]);
	const handlePageChange = (newPage: number) => {
		setFilter(prev => ({ ...prev, page: newPage }));
	};

	const handleLimitChange = (newLimit: number) => {
		setFilter(prev => ({ ...prev, limit: newLimit }));
	};
	const [orderValue, setOrderValue] = useState('newest');

	return (
		<div>
			<p className='mb-4 font-medium'>
				Tuyển dụng <span className='text-primary font-semibold'>{jobs?.meta.total}</span> việc làm {title} tại Hà Nội [Update 20/08/2025]
			</p>
			<div className='flex gap-6'>
				<AdvancedFilter filter={filter} setFilter={setFilter} />
				<div className='flex-2 space-y-6'>
					<div className='flex items-center gap-3 justify-end'>
						<span className='text-gray-700'>Sắp xếp theo:</span>
						<Select
							value={orderValue}
							onValueChange={value => {
								setOrderValue(value);
								setFilter(prev => ({
									...prev,
									orders: orderMap[value] || {},
								}));
							}}>
							<SelectTrigger className='w-64 bg-white'>
								<SelectValue placeholder='Chọn thứ tự' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='newest'>Mới nhất</SelectItem>
								<SelectItem value='salaryHigh'>Lương cao đến thấp</SelectItem>
								<SelectItem value='salaryLow'>Lương thấp đến cao</SelectItem>
								<SelectItem value='deadline'>Ngày hết hạn</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{isLoading && (
						<Card>
							<LoadingCard></LoadingCard>
						</Card>
					)}
					{jobs && jobs.items?.length > 0 && (
						<>
							<JobList jobs={jobs.items} />
							<div className='float-right'>
								<Pagination
									totalItems={jobs?.meta?.totalPages}
									pageSize={filter.limit as number}
									currentPage={filter.page as number}
									onPageChange={handlePageChange}
									onPageSizeChange={handleLimitChange}
									pageSizeOptions={[5, 10, 20, 50]}
								/>
							</div>
						</>
					)}{' '}
					{jobs && jobs.items?.length === 0 && (
						<div className='flex items-center flex-col '>
							<Image alt='404' src={'/illustration/undraw_taken_mshk.svg'} height={1000} width={1000} className='size-80 my-6' />
							<p className='mt-4'>Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn</p>
						</div>
					)}
					<RelatedJobs />
				</div>
			</div>
		</div>
	);
}

export default Page;
