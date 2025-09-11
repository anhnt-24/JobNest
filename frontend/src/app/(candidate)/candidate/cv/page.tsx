'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Download, Share2, Plus, Ellipsis, ArrowUp, Link, Copy, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CustomPagination from '@/components/candidate/custom-pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadedFiles from './uploaded-files';
import { useState } from 'react';
import Pagination from '@/components/ui/custom/pagination';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
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
				<CardHeader className='flex justify-between items-center '>
					<CardTitle>Quản lý CV của bạn</CardTitle>
					<Button>
						<Plus />
						Tạo CV mới
					</Button>
				</CardHeader>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
					{resumes.map(resume => (
						<Card key={resume.id} className='hover:shadow-lg border p-0 overflow-hidden rounded-sm'>
							<div className='relative'>
								<Image src={'/image.png'} width={100} height={100} alt={`Preview of ${resume.title}`} className='w-full h-48 object-cover border-b' />
							</div>

							<div className='px-4 pb-4'>
								<h4 className='hover:text-primary'>{resume.title}</h4>
								<span className='text-sm text-gray-500'>Cập nhật: {resume.lastUpdated}</span>

								<div className='hidden flex-wrap gap-2 mt-4 justify-center'>
									<Button variant='outline' size='sm' className='gap-2 '>
										<Download className='h-4 w-4' />
										Tải xuống
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' size='sm' className='gap-2 '>
												<Ellipsis className='h-4 w-4' />
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
