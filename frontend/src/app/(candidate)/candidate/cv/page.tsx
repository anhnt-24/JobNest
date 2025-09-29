'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Download, Share2, Plus, Ellipsis, ArrowUp, Link, Copy, Trash, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CustomPagination from '@/components/candidate/custom-pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadedFiles from './uploaded-files';
import { useState } from 'react';
import Pagination from '@/components/ui/custom/pagination';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
export function ResumeList() {
	const resumes = [
		{
			id: 1,
			title: 'CV Frontend Developer',
			lastUpdated: '15/08/2025',
			isDefault: true,
			previewImage: '/cv-preview-1.png',
		},
		{
			id: 2,
			title: 'CV Fullstack Engineer',
			lastUpdated: '10/08/2025',
			isDefault: false,
			previewImage: '/cv-preview-2.png',
		},
		{
			id: 3,
			title: 'CV UI/UX Designer',
			lastUpdated: '05/08/2025',
			isDefault: false,
			previewImage: '/cv-preview-3.png',
		},
	];
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(1);
	return (
		<>
			<Card>
				<div className='flex justify-between items-center '>
					<h2>Quản lý CV của bạn</h2>
					<Button className='rounded-full'>
						<Plus />
						Tạo mới
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 '>
					{resumes.map(resume => (
						<div key={resume.id}>
							<Card className='rounded-lg overflow-hidden  !p-0 shadow-sm border relative group cursor-pointer  '>
								<Image src={'/cv.png'} width={300} height={200} alt={`Preview of ${resume.title}`} className='w-full group-hover:brightness-75 transition-all ' />

								<div className='flex-wrap flex flex-col items-center gap-2 absolute opacity-0  h-full w-full transition-all delay-50 group-hover:opacity-100'>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant='ghost' className='mb-auto ml-auto mt-4 text-white'>
												<Star className='size-10 float-right fill-gray-400' />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p className='max-w-50 text-sm px-2'>Đặt làm CV chính. CV này sẽ được hiện thị cho nhà tuyển dụng khi tìm kiếm ứng viên.</p>
										</TooltipContent>
									</Tooltip>
									<div className='mt-auto mb-4 flex gap-2 '>
										<Button size='sm' variant={'secondary'} className='rounded-full text'>
											<Download className='size-4' />
											Tải xuống
										</Button>
										<Button size='sm' variant={'secondary'} className='rounded-full text'>
											<Edit className='size-4' />
											Chỉnh sửa
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant='secondary' size='sm' className=' rounded-full'>
													<Ellipsis className='size-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-56 text-gray-600' align='end'>
												<DropdownMenuItem>
													<Link className='mr-2 h-4 w-4 text-inherit' />
													<span>Sao chép liên kết</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Share2 className='mr-2 h-4 w-4 text-inherit' />
													<span>Chia sẻ trên Facebook</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Copy className='mr-2 h-4 w-4 text-inherit' />
													<span>Tạo bản sao</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Edit className='mr-2 h-4 w-4 text-inherit' />
													<span>Đổi tên</span>
												</DropdownMenuItem>
												<DropdownMenuItem className='text-red-500'>
													<Trash className='mr-2 h-4 w-4 text-inherit' />
													<span>Xoá</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</Card>

							<div className='mt-2'>
								<h4 className='hover:text-primary  text-lg font-semibold text-gray-700 '>{resume.title}</h4>
								<span className='text-base text-gray-500 font-medium'>Cập nhật: {resume.lastUpdated}</span>
							</div>
						</div>
					))}
				</div>
				<div className='float-right'>
					<Pagination totalItems={200} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
				</div>
			</Card>
			<UploadedFiles></UploadedFiles>
		</>
	);
}

export default ResumeList;
