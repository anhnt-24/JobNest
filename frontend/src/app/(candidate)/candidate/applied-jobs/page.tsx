'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileText, MessageSquare, CheckCircle, ChevronRight, MapPin, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';

export function AppliedJobs() {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const { data } = useSWR('/job/applied', () => jobService.getAppliedJobs().then(res => res.data));
	return (
		<>
			<Card>
				<div className='flex justify-between items-center'>
					<h2>Việc làm đã ứng tuyển</h2>
					<Select>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Trạng thái' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='light'>Đã ứng tuyển</SelectItem>
							<SelectItem value='dark'>NTD đã xem hồ sơ</SelectItem>
							<SelectItem value='cc'>Hồ sơ phù hợp</SelectItem>
							<SelectItem value='system'>Hồ sơ chưa phù hợp</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{data?.map(res => (
					<Card className='p-6 hover:shadow-md transition-shadow border  hover:border-primary '>
						<div className='space-y-2'>
							<div className='flex gap-2 items-center'>
								<Avatar className='size-30 border border-gray-200'>
									<AvatarImage className='size-full' src={res.job.company.avatarUrl} alt='@user' />
								</Avatar>
								<div className='flex-1 space-y-2'>
									<div className='flex justify-between '>
										<h5 className='font-semibold text-lg line-clamp-2 max-w-md'>{res.job.title}</h5>
										<p className='text-primary font-semibold  mt-2'>{res.job.salary}20</p>
									</div>

									<div className='space-y-2 text-sm'>
										<p className='text-gray-600'>{res.job.company.name}</p>
										<div className='flex items-center text-gray-500'>
											<Clock className='h-4 w-4 mr-1' />
											<span>Thời gian ứng tuyển: {res.appliedAt}</span>
										</div>
									</div>
								</div>
							</div>

							<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
								<div className='flex gap-2'>
									<Badge variant={'secondary'} className='flex items-center text-sm bg-green-500 text-white '>
										NTD đã xem hồ sơ
									</Badge>
								</div>
								<div className='flex gap-2 justify-center'>
									<Button className='flex-1' variant='outline'>
										Nhắn tin
									</Button>
									<Button>Xem CV</Button>
								</div>
							</div>
						</div>
					</Card>
				))}
				<div className='float-right'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={50}></Pagination>
				</div>
			</Card>
		</>
	);
}

export default AppliedJobs;
