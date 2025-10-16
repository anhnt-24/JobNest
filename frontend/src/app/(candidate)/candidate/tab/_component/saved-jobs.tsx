'use client';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import { jobService } from '@/service/job.service';
import useSWR from 'swr';
import { CustomBadge } from '@/components/ui/custom/custom-badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import LoadingCard from '../../profile/skeleton';
import { SaveJobButton } from '@/components/ui/custom/save-job-btn';
import Empty from '@/components/ui/custom/empty';
export function SavedJobs() {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const { data, error, isLoading } = useSWR(['/job/saved', page, limit], () => jobService.getSavedJobs({ page, limit }).then(res => res.data));
	return (
		<>
			<div className='space-y-2 px-4'>
				<div className='border-b pb-2'>
					<h2>Việc làm đã lưu</h2>
					<p className='text-gray-600'>Những công việc phù hợp nhất với bạn dựa trên mong muốn, kỹ năng và kinh nghiệm.</p>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center justify-between gap-4'>
						<p className='text-gray-500'>
							Danh sách <span className='font-semibold text-primary'>{data?.meta.total}</span> việc làm đã lưu
						</p>

						<Input type='text' placeholder='Tìm kiếm việc làm...' className='w-64' />
					</div>
					{data?.items?.length === 0 && <Empty></Empty>}

					{data?.items?.map(res => (
						<div key={res.id} className='border-b p-4 bg-primary/5  hover:bg-primary/10 cursor-pointer '>
							<div className='space-y-2'>
								<div className='flex gap-4 items-start'>
									<Avatar className='size-24 border border-gray-100'>
										<AvatarImage className='size-full' src={res.job.company.avatarUrl} alt='@user' />
									</Avatar>
									<div className='flex-1 space-y-2'>
										<div>
											<div className='text-sm space-y-1'>
												<div className='flex gap-8 justify-between'>
													<Link href={`/job/${res.job.id}`} className='space-x-1'>
														{false && <CustomBadge type='top'></CustomBadge>}
														{false && <CustomBadge type='gap'></CustomBadge>}
														<h3 className=' line-clamp-2 inline max-w-md hover:text-primary'>{res.job.title} caic caica caica cac cacsoc ac acac ac</h3>
													</Link>
													<p className='text-primary font-semibold '>{res.job.salary}</p>
												</div>
												<Link href={`/cong-ty/${res.job.company.id}`} className='space-x-1 '>
													<p className='text-gray-600'>{res.job.company.name}</p>
												</Link>
												<div className='flex gap-2 mt-1'>
													<Badge variant={'secondary'} className='flex items-center text-sm '>
														<span>{res.job.workingAddress}</span>
													</Badge>
													<Badge variant={'secondary'} className='flex items-center'>
														<span>Cập nhật 10 phút trước</span>
													</Badge>
												</div>
											</div>
										</div>
										<div className='border-b'></div>
										<div className='flex gap-2 justify-between'>
											<div className='flex items-center text-gray-500'>
												<Clock className='size-4 mr-1' />
												<span>Đã lưu: {res.savedAt}</span>
											</div>
											<div className='flex gap-2'>
												<SaveJobButton jobId={res.job.id} iconOnly size='md'></SaveJobButton>
												<Link href={`/jobs/${res.job.id}`}>
													<Button className='rounded-xs' size={'md'}>
														Ứng tuyển ngay
													</Button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='float-right mt-4'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={data?.meta.total}></Pagination>
				</div>
			</div>
		</>
	);
}

export default SavedJobs;
