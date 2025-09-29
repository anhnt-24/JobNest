'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Download, Share2, Plus, Ellipsis, ArrowUp, Link, Copy, Trash, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import CustomPagination from '@/components/candidate/custom-pagination';
import { UploadCvModal } from './upload-file-form';
import useSWR from 'swr';
import { cvsService } from '@/service/cvs.service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from 'react-icons/fa';
import LoadingCard from '../profile/skeleton';
import { LoadingTable } from '@/components/ui/custom/loading-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

export function renderCVIcon(format: string, className?: string) {
	switch (format) {
		case 'PDF':
			return <FaFilePdf className={className + ' text-red-500'} />;
		case 'DOC':
		case 'DOCX':
			return <FaFileWord className={className + ' text-blue-500'} />;
		case 'PNG':
		case 'JPG':
		case 'JPEG':
			return <FaFileImage className={className + ' text-green-500'} />;
		default:
			return <FaFileAlt className={className + ' text-gray-500'} />;
	}
}

export function UploadedFiles() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: cvs, isLoading } = useSWR(['/cvs/me', page, limit], () => cvsService.getCvs({ page, limit }).then(res => res.data));
	if (isLoading) return <>1</>;
	return (
		<Card className='p-6'>
			<CardHeader className='flex justify-between items-center '>
				<CardTitle>File đã tải lên</CardTitle>
				<UploadCvModal></UploadCvModal>
			</CardHeader>
			{isLoading ? (
				<LoadingTable />
			) : (
				<div className=' grid-cols-2 grid gap-6'>
					{cvs?.items.map(cv => (
						<div>
							<Card className='rounded-lg overflow-hidden shadow-xs p-0 relative group cursor-pointer h-100 justify-center items-center '>
								<div className='w-full h-full p-10 group-hover:brightness-75 transition-all bg-white flex'>
									<Image src={'/illustration/undraw_resume_jrgi.png'} width={300} height={200} alt={``} className='w-full my-auto ' />
								</div>
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
								<h4 className='hover:text-primary  text-lg font-semibold text-gray-700 '>{cv.title}</h4>
								<span className='text-base text-gray-500 font-medium'>Cập nhật: {cv.updatedAt.split('T')[0]}</span>
							</div>
						</div>
					))}

					<div className='float-right'>
						<Pagination totalItems={cvs.meta.totalPages} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
					</div>
				</div>
			)}
		</Card>
	);
}

export default UploadedFiles;
