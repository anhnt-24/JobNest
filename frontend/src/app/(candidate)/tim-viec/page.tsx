'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { useSearchParams } from 'next/navigation';
import AdvancedFilter from './_components/advanced-filter';
import JobList from './_components/job-list';
import JobSearchBar from './_components/job-search-bar';
import Pagination from '@/components/ui/custom/pagination';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
function Page() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const searchParams = useSearchParams();
	const title = searchParams.get('title');
	const { data: jobs, isLoading } = useSWR([`/timviec`, page, limit, title], () => jobService.getAll({ page, limit, title }).then(res => res.data));
	if (isLoading) return <></>;
	return (
		<div className='w-full mt-18'>
			<JobSearchBar title={title as string} />
			<p className='mb-4 font-medium'>
				Tuyển dụng <span className='text-primary font-semibold'>{jobs.meta.total} </span> việc làm {title} tại Hà Nội [Update 20/08/2025]
			</p>
			<div className='flex gap-4'>
				<AdvancedFilter />
				<div className='flex-2 space-y-6'>
					<div className='flex items-center gap-3  justify-end'>
						<span className='text-gray-700'>Sắp xếp theo:</span>
						<Select defaultValue='ai'>
							<SelectTrigger className='w-40  bg-white'>
								<SelectValue placeholder='Chọn' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='ai'>Mới nhất</SelectItem>
								<SelectItem value='date'>Ngày đăng</SelectItem>
								<SelectItem value='salary'>Mức lương</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{jobs.items.length > 0 ? (
						<>
							<JobList jobs={jobs} />

							<div className='float-right'>
								<Pagination totalItems={jobs?.meta?.totalPages} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
							</div>
						</>
					) : (
						<div className='flex items-center flex-col bg-white'>
							<Image alt='404' src={'/404.png'} height={1000} width={1000} className=' size-32'></Image>
							<p className='mt-4'>Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Page;
