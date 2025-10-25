'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Clock, HeartPlus } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomPagination from '@/components/candidate/custom-pagination';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { useState } from 'react';
import JobList from './job-list';
import Pagination from '@/components/shared/pagination';
import Empty from '@/components/shared/empty';
import { Loading } from '@/components/shared/loading';
export default function CompanyJobs({ id }: { id: number | undefined }) {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: jobs, isLoading } = useSWR(['/job/company/', page, limit, id], () => jobService.getAll({ page, limit, companyId: id }).then(res => res.data));
	return (
		<Card>
			<CardTitle className='border-b'>Tuyển dụng</CardTitle>
			<div className='flex flex-col sm:flex-row gap-3  items-center justify-end'>
				<div className='flex items-center w-full sm:w-1/2 border rounded-lg px-2'>
					<Search className='size-5 text-gray-400 ' />
					<Input type='text' placeholder='Tên công việc, vị trí ứng tuyển...' className='flex-1 border-none ring-0 shadow-none ' />
				</div>

				<Button>
					<Search className='size-4' />
					Tìm kiếm
				</Button>
			</div>
			{isLoading && <Loading></Loading>}
			{jobs && jobs.items?.length > 0 && (
				<>
					<JobList jobs={jobs.items} />
					<div className='float-right'>
						<Pagination totalItems={jobs?.meta?.total} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} />
					</div>
				</>
			)}
			{jobs && jobs.items?.length === 0 && <Empty></Empty>}
		</Card>
	);
}
