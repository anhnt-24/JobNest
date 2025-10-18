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
import { CustomBadge } from '@/components/ui/custom/custom-badge';
import LoadingCard from '@/components/ui/custom/skeleton';
import Empty from '@/components/ui/custom/empty';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function AppliedJobs() {
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const { data, isLoading } = useSWR(['/job/applied', page, limit], () => jobService.getAppliedJobs({ page, limit }).then(res => res.data));
	return (
		<>
			<div className='px-4 space-y-4'>
				<div className='border-b pb-2'>
					<h2>Việc làm đã ứng tuyển</h2>
					<p className='text-gray-600'>Những công việc phù hợp nhất với bạn dựa trên mong muốn, kỹ năng và kinh nghiệm.</p>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<p className='text-gray-500'>
						Danh sách <span className='font-semibold text-primary'>{data?.meta.total}</span> việc làm đã ứng tuyển
					</p>

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
				{isLoading ? (
					<LoadingCard />
				) : (
					<div className='space-y-4'>
						{data?.items?.length === 0 && <Empty></Empty>}

						{data?.items?.map(res => (
							<div className='p-4 hover:border-primary transition-shadow border-b hover:bg-primary/5 cursor-pointer '>
								<div className=''>
									<div className='flex gap-4 items-start '>
										<Avatar className='size-32 border border-gray-200 rounded-xs p-2'>
											<AvatarImage className='object-contain' src={res.job.company.user.avatarUrl} alt='@user' />
										</Avatar>
										<div className='flex-1  '>
											<div className='flex gap-4 justify-between'>
												<Link href={`/job/${res.job.id}`} className='flex-1'>
													<p className=' line-clamp-2 font-semibold text-lg hover:text-primary'>{res.job.title}</p>
												</Link>
												<p className='text-primary font-semibold text-lg '>{res.job.salary}</p>
											</div>
											<Link href={`/cong-ty/${res.job.companyId}`} className='space-x-1 '>
												<p className='text-gray-600'>{res.job.company?.user.name}</p>
											</Link>
											<Badge variant={'secondary'} className='flex gap-2 items-center mt-1'>
												<Clock className='size-4'></Clock>
												<span>Ứng tuyển lúc: {res.appliedAt}</span>
											</Badge>
										</div>
									</div>

									<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
										<div className='flex gap-2'>
											<p className='flex items-center font-semibold  text-blue-500'> Đã ứng tuyển</p>
										</div>
										<div className='flex gap-2 justify-center'>
											<Button variant={'outline'} size={'md'}>
												<MessageSquare></MessageSquare>
											</Button>
											<Button size={'md'}>Xem CV</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				<div className='float-right'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={data?.meta.total}></Pagination>
				</div>
			</div>
		</>
	);
}

export default AppliedJobs;
