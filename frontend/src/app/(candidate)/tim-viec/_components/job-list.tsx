'use client';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Heart } from 'lucide-react';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2, HeartPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import CustomPagination from '@/components/candidate/custom-pagination';
import { useState } from 'react';
import Pagination from '@/components/ui/custom/pagination';
import { FaBookmark } from 'react-icons/fa';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
export default function JobList() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: jobs } = useSWR(`/timviec?page=${page}&limit=${limit}`, () => jobService.getme({ page, limit }).then(res => res.data));
	return (
		<div className='flex-2 space-y-6'>
			<div className='flex items-center gap-3  justify-end'>
				<span className='text-gray-700'>Tìm kiếm theo:</span>
				<ToggleGroup type='single' defaultValue='job' className='px-2 gap-2 '>
					<ToggleGroupItem value='job' className='flex items-center gap-1  px-3 py-1 rounded-full'>
						<Check className='w-4 h-4' /> Tên việc làm
					</ToggleGroupItem>
					<ToggleGroupItem value='company' className=' rounded-full'>
						Tên công ty
					</ToggleGroupItem>
				</ToggleGroup>
				<div className='h-6 w-px bg-gray-300' />

				<span className='text-gray-700'>Ưu tiên hiển thị theo:</span>
				<Select defaultValue='ai'>
					<SelectTrigger className='w-40 rounded-full bg-white'>
						<SelectValue placeholder='Chọn' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='ai'>Search by AI</SelectItem>
						<SelectItem value='date'>Ngày đăng</SelectItem>
						<SelectItem value='salary'>Mức lương</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='space-y-4'>
				{jobs?.items?.map(item => (
					<Card className='hover:shadow-md transition-shadow border bg-primary/3  border-primary '>
						<div>
							<div className='flex gap-4 items-start'>
								<Avatar className='size-24 border border-gray-200'>
									<AvatarImage className='size-full' src={item.company.avatarUrl} alt='@user' />
								</Avatar>
								<div className='flex-1 space-y-2'>
									<div className='flex justify-between items-start '>
										<h3 className=' line-clamp-2 max-w-md hover:text-primary cursor-pointer'>{item.title}</h3>
										<p className='text-primary font-semibold border-primary mt-2'>{item.salary}</p>
									</div>
									<p className='text-gray-600'>{item.company.name}</p>
								</div>
							</div>

							<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
								<div className='flex gap-2'>
									<Badge className='flex items-center text-sm'>
										<MapPin className='h-4 w-4 mr-1 ' />
										<span>{item.areaTags.split(';')[0]}</span>
									</Badge>
									<Badge variant={'secondary'} className='flex items-center text-sm text-gray-500'>
										<Clock className='h-4 w-4 mr-1' />
										<span>Cập nhật 10 phút trước</span>
									</Badge>
								</div>
								<div className='flex gap-4 justify-center'>
									<Button>Ứng tuyển ngay</Button>
									<button className='rounded-full hover:bg-primary/5 cursor-pointer border border-primary text-primary size-10 p-2'>
										<HeartPlus size={18} />
									</button>
								</div>
							</div>
						</div>
					</Card>
				))}

				<div className='float-right'>
					<Pagination totalItems={200} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
				</div>
			</div>
		</div>
	);
}
