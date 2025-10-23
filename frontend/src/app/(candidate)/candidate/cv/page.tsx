'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Download, Share2, Plus, Ellipsis, ArrowUp, Copy, Trash, Star, Link2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadedFiles from './uploaded-files';
import { useState } from 'react';
import Pagination from '@/components/ui/custom/pagination';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import useSWR from 'swr';
import { cvService } from '@/service/cvs.service';
import LoadingCard from '@/components/ui/custom/skeleton';
import Empty from '@/components/ui/custom/empty';
import Link from 'next/link';
export function ResumeList() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(1);
	const { data: cvs, isLoading, mutate } = useSWR(['/cvs/me/GENERATED', page, limit], () => cvService.me({ page, limit, type: 'GENERATED' }).then(res => res.data));
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
				{isLoading ? (
					<LoadingCard />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 '>
						{cvs?.items?.map(cv => (
							<div key={cv.id}>
								<Link href={`/cv/edit/${cv.id}`}>
									<Card className='rounded-lg overflow-hidden  !p-0 shadow-sm border relative group cursor-pointer  '>
										<Image src={'/cv.png'} width={300} height={200} alt={`Preview of ${cv.title}`} className='w-full group-hover:brightness-75 transition-all ' />

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
															<Link2 className='mr-2 h-4 w-4 text-inherit' />
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
								</Link>
								<div className='mt-2'>
									<Link href={`/cv/edit/${cv.id}`}>
										<h4 className='hover:text-primary  text-lg font-semibold text-gray-700 '>{cv.title}</h4>
									</Link>
									<span className='text-base text-gray-500 font-medium'>Cập nhật: {cv.updatedAt}</span>
								</div>
							</div>
						))}
					</div>
				)}
				{cvs?.items?.length == 0 && <Empty />}
				<div className='float-right'>
					<Pagination totalItems={cvs?.meta?.totalItems} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} />
				</div>
			</Card>
			<UploadedFiles></UploadedFiles>
		</>
	);
}

export default ResumeList;
