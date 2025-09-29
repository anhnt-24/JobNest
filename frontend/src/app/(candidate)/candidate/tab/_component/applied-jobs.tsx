'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileText, MessageSquare, CheckCircle, ChevronRight, MapPin, Trash2, Gem, Zap, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import Link from 'next/link';
import { CustomBadge } from '@/components/ui/custom/custom-badge';
import LoadingCard from '@/components/ui/custom/skeleton';

export function AppliedJobs() {
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const { data, isLoading } = useSWR(['/job/applied', page, limit], () => jobService.getAppliedJobs({ page, limit }).then(res => res.data));
	return (
		<>
			<div className='px-4 space-y-6'>
				<CardHeader className='flex justify-between items-center'>
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
				</CardHeader>
				{isLoading ? (
					<LoadingCard />
				) : (
					<div className='space-y-4'>
						{data?.items?.map(res => (
							<div className='p-4 hover:shadow-md transition-shadow border border-gray-200  bg-primary/5 hover:bg-primary/10 cursor-pointer '>
								<div className=''>
									<div className='flex gap-4 items-start'>
										<Avatar className='size-24 border border-gray-200 rounded-xs'>
											<AvatarImage className='size-full' src={res.job.company.avatarUrl} alt='@user' />
										</Avatar>
										<div className='flex-1 space-y-2 '>
											<div className='flex justify-between '>
												<div className='space-y-2'>
													<div className='space-x-1'>
														{true && <CustomBadge type='top'></CustomBadge>}
														{true && <CustomBadge type='gap'></CustomBadge>}
														<h3 className='inline line-clamp-2 max-w-md'>{res.job.title}</h3>
													</div>
													<p className='text-gray-500 text-sm font-medium'>{res.job.company.name}</p>
													<div className='flex items-center text-gray-500'>
														<Clock className='h-4 w-4 mr-1' />
														<span>Thời gian ứng tuyển: {res.appliedAt}</span>
													</div>
												</div>
												<p className='text-primary text-lg  font-semibold'> {res.job.salary}</p>
											</div>
										</div>
									</div>

									<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
										<div className='flex gap-2'>
											<p className='flex items-center font-semibold  text-blue-500'>Đã ứng tuyển</p>
										</div>
										<div className='flex gap-2 justify-center'>
											<Button className='flex-1' variant={'outline'} size={'md'}>
												<MessageSquare></MessageSquare>
												Nhắn tin
											</Button>
											<Button className='flex-1' size={'md'}>
												<Search />
												Xem CV
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				<div className='float-right'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={data?.meta.totalPages}></Pagination>
				</div>
			</div>
		</>
	);
}

export default AppliedJobs;
