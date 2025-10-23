'use client';

import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye, Plus, Filter, Search, Download, User, Mail, Phone, Calendar, FileText, Edit, Ellipsis, PencilLine, Trash } from 'lucide-react';
import Pagination from '@/components/ui/custom/pagination';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import JobStatusCell from './_component/job-status-cell';
import CVTable from './_component/cv-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaEye, FaMagnifyingGlass, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { JobRes } from '@/schema/job.schema';

export default function JobTable() {
	const [selectedJob, setSelectedJob] = useState<JobRes>();
	const [cvDialogOpen, setCvDialogOpen] = useState(false);

	const handleViewCV = (job: JobRes) => {
		setSelectedJob(job);
		setCvDialogOpen(true);
	};

	const handleEdit = (id: string) => {
		alert(`Chỉnh sửa job id: ${id}`);
	};

	const handleDelete = (id: number) => {
		if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
		}
	};

	const handleAddJob = () => {
		alert('Thêm tin tuyển dụng mới');
	};

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const { data } = useSWR([`/api/jobs`, page, limit], () => jobService.me({ page, limit }).then(res => res.data));
	console.log(data);
	return (
		<>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0'>
					<CardTitle>Danh sách tin tuyển dụng</CardTitle>
					<Button onClick={handleAddJob}>
						<Plus /> Thêm tin
					</Button>
				</CardHeader>
				<div className='space-y-6'>
					<div className='overflow-x-auto'>
						<Table className='bg-white'>
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead>Vị trí</TableHead>
									<TableHead>Mức lương</TableHead>
									<TableHead>Địa điểm</TableHead>
									<TableHead>Cấp bậc</TableHead>
									<TableHead>Kinh nghiệm</TableHead>
									<TableHead>Hình thức</TableHead>
									<TableHead>Số lượng</TableHead>
									<TableHead>Hạn nộp</TableHead>
									<TableHead>Trạng thái</TableHead>
									<TableHead>Thao tác</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.items?.map((job, idx) => (
									<TableRow key={job.id}>
										<TableCell>{job.id}</TableCell>

										<TableCell className='font-medium'>{job.title}</TableCell>
										<TableCell>{job.salary}</TableCell>
										<TableCell>{job.workingAddress}</TableCell>
										<TableCell>{job.level}</TableCell>
										<TableCell>{job.experience}</TableCell>
										<TableCell>{job.type}</TableCell>
										<TableCell>{job.quantity}</TableCell>
										<TableCell>{new Date(job.createdAt).toLocaleDateString('vi-VN')}</TableCell>
										<JobStatusCell job={job}></JobStatusCell>

										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button className='rounded-full' variant='ghost'>
														<Ellipsis />
													</Button>
												</DropdownMenuTrigger>

												<DropdownMenuContent align='end' className='w-54 text-gray-600'>
													<DropdownMenuItem onClick={() => console.log('edit', job.id)}>
														<PencilLine className='mr-2  size-5 ' strokeWidth={1.5} /> Chỉnh sửa
													</DropdownMenuItem>
													<DropdownMenuItem onClick={() => handleViewCV(job)}>
														<Eye className='mr-2  size-5' strokeWidth={1.5} /> Xem CV
													</DropdownMenuItem>
													<DropdownMenuItem onClick={() => handleDelete(job.id)} className='text-red-600'>
														<Trash className='mr-2 size-5' strokeWidth={1.5} /> Xóa
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{data?.items?.length === 0 && <div className='text-center py-8 text-muted-foreground'>Không tìm thấy tin tuyển dụng nào phù hợp</div>}
					<Pagination totalItems={200} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
				</div>
			</Card>
			{selectedJob && <CVTable job={selectedJob} />}
		</>
	);
}
