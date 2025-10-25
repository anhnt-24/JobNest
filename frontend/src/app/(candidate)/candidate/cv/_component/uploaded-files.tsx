'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Download, Share2, Ellipsis, Link, Star } from 'lucide-react';
import { UploadCvModal } from './upload-file-form';
import useSWR from 'swr';
import { cvService } from '@/service/cv.service';
import Pagination from '@/components/shared/pagination';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import Empty from '@/components/shared/empty';
import { DeleteCvButton } from './delete-cv-btn';
import { toast } from 'sonner';
import { RenameCvButton } from './rename-cv-diaglog';
import { Loading } from '@/components/shared/loading';
import { RelativeTime } from '@/components/shared/relative-time';
export function UploadedFiles() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: cvs, isLoading, mutate } = useSWR(['/cvs/me/UPLOADED', page, limit], () => cvService.me({ page, limit, type: 'UPLOADED' }).then(res => res.data));
	return (
		<Card className='p-6'>
			<CardHeader className='flex justify-between items-center '>
				<CardTitle>File đã tải lên</CardTitle>
				<UploadCvModal></UploadCvModal>
			</CardHeader>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{cvs && cvs?.items?.length > 0 ? (
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
													<DropdownMenuContent className='w-64 text-gray-600' align='end'>
														<DropdownMenuItem
															onClick={() => {
																navigator.clipboard.writeText(cv?.fileUrl || '');
																toast.success('Đã sao chép liên kết!');
															}}>
															<Link className='mr-2 h-4 w-4 text-inherit' />
															<span>Sao chép liên kết</span>
														</DropdownMenuItem>
														<DropdownMenuItem>
															<Share2 className='mr-2 h-4 w-4 text-inherit' />
															<span>Chia sẻ trên Facebook</span>
														</DropdownMenuItem>

														<RenameCvButton id={cv.id} title={cv.title} mutate={() => mutate()} />
														<DeleteCvButton id={cv.id} title={cv.title} onDeleted={() => mutate()} />
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</div>
									</Card>

									<div className='mt-2'>
										<h4 className='hover:text-primary  text-lg font-semibold text-gray-700 '>{cv.title}</h4>
										<span className='text-base text-gray-500 font-medium'>
											<RelativeTime prefix='Cập nhật: ' date={cv.createdAt}></RelativeTime>
										</span>
									</div>
								</div>
							))}

							<div className='float-right'>
								<Pagination totalItems={cvs?.meta.total} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
							</div>
						</div>
					) : (
						<Empty></Empty>
					)}
				</>
			)}
		</Card>
	);
}

export default UploadedFiles;
