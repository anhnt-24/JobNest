'use client';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import { jobService } from '@/service/job.service';
import useSWR from 'swr';
export function SavedJobs() {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const { data } = useSWR('/job/saved', () => jobService.getSavedJobs().then(res => res.data));
	return (
		<>
			<div className='space-y-6'>
				<div className='space-y-2'>
					<h1 className='text-2xl font-bold'>Việc làm đã lưu</h1>
					<p className='text-gray-600'>Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyến ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.</p>
				</div>

				<div className='border-t border-gray-200 my-4'></div>

				<div className='space-y-4'>
					<p className='text-gray-500'>
						Danh sách <span className='font-semibold'>2</span> việc làm đã lưu
					</p>

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
											<p className='text-red-500 font-semibold border-red-500 mt-2'>{res.job.salary}</p>
										</div>

										<div className='space-y-2 text-sm'>
											<p className='text-gray-600'>{res.job.company.name}</p>
											<div className='flex items-center text-gray-500'>
												<Clock className='h-4 w-4 mr-1' />
												<span>Đã lưu: {res.savedAt}</span>
											</div>
										</div>
									</div>
								</div>

								<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
									<div className='flex gap-2'>
										<Badge className='flex items-center text-sm'>
											<MapPin className='h-4 w-4 mr-1 ' />
											<span>Hà Nội</span>
										</Badge>
										<Badge variant={'secondary'} className='flex items-center text-sm text-gray-500'>
											<Clock className='h-4 w-4 mr-1' />
											<span>Cập nhật 10 phút trước</span>
										</Badge>
									</div>
									<div className='flex gap-2 justify-center'>
										<Button className='flex-1' variant='outline'>
											<Trash2 />
											Bỏ lưu
										</Button>
										<Button>Ứng tuyển ngay</Button>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
				<div className='float-right'>
					<Pagination pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} totalItems={50}></Pagination>
				</div>
			</div>
		</>
	);
}

export default SavedJobs;
