'use client';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import { jobService } from '@/service/job.service';
import useSWR from 'swr';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import { CustomBadge } from '@/components/ui/custom/custom-badge';
import { Input } from '@/components/ui/input';
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
						{/* Text */}
						<p className='text-gray-500'>
							Danh sách <span className='font-semibold text-primary'>2</span> việc làm đã lưu
						</p>

						{/* Input ShadCN */}
						<Input
							type='text'
							placeholder='Tìm kiếm việc làm...'
							className='w-64' // chiều rộng tùy chỉnh
						/>
					</div>
					{data?.items?.map(res => (
						<div className='border-b p-4 bg-primary/5  hover:bg-primary/10 cursor-pointer '>
							<div className='space-y-2'>
								<div className='flex gap-4 items-start'>
									<Avatar className='size-24 border border-gray-100'>
										<AvatarImage className='size-full' src={res.job.company.avatarUrl} alt='@user' />
									</Avatar>
									<div className='flex-1 space-y-2'>
										<div>
											<div className='space-y-2 text-sm'>
												<div className='flex gap-8 justify-between'>
													<div className='space-x-1'>
														{true && <CustomBadge type='top'></CustomBadge>}
														{true && <CustomBadge type='gap'></CustomBadge>}
														<h3 className=' line-clamp-2 inline max-w-md'>{res.job.title} caic caica caica cac cacsoc ac acac ac</h3>
													</div>
													<p className='text-primary font-semibold text-lg '>{res.job.salary}</p>
												</div>
												<p className='text-gray-600'>{res.job.company.name}</p>
												<div className='flex gap-2'>
													<Badge variant={'secondary'} className='flex items-center text-sm '>
														<span>Hà Nội</span>
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
												<Button className='rounded-xs' size={'md'} variant={'outline'}>
													<Trash2></Trash2>
													Bỏ lưu
												</Button>
												<Button className='rounded-xs' size={'md'}>
													Ứng tuyển ngay
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='float-right mt-4'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={50}></Pagination>
				</div>
			</div>
		</>
	);
}

export default SavedJobs;
