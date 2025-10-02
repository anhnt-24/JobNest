'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, Ellipsis, Sheet, Plus } from 'lucide-react';
import Pagination from '@/components/ui/custom/pagination';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { JobResponse } from '@/schema/job.schema';
import CVTable from '@/app/(employer)/employer/cv/_component/cv-table';

export default function JobTable() {
	const [selectedJob, setSelectedJob] = useState<JobResponse>();
	const [cvDialogOpen, setCvDialogOpen] = useState(false);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const { data } = useSWR([`/api/jobs`, page, limit], () => jobService.getListByMe({ page, limit }).then(res => res.data));

	const handleViewCV = (job: JobResponse) => {
		setSelectedJob(job);
		setCvDialogOpen(true);
	};

	const handleEdit = (id: string) => alert(`Chỉnh sửa job id: ${id}`);
	const handleDelete = (id: number) => {
		if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
			console.log('delete', id);
		}
	};
	const handleAddJob = () => alert('Thêm tin tuyển dụng mới');

	return (
		<>
			<Card className='gap-6'>
				{/* Header */}
				<h2>Danh sách tin tuyển dụng</h2>

				<div className='flex flex-col sm:flex-row gap-2 items-stretch sm:items-center'>
					{/* Search */}
					<Input placeholder='Tìm kiếm...' className='flex-1' />

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'sketch'}>
								<Filter />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56'>
							<DropdownMenuItem>Vị trí</DropdownMenuItem>
							<DropdownMenuItem>Cấp bậc</DropdownMenuItem>
							<DropdownMenuItem>Hình thức</DropdownMenuItem>
							<DropdownMenuItem>Mức lương</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant={'sketch'} onClick={handleAddJob}>
						<Sheet></Sheet>
					</Button>
					<Button onClick={handleAddJob}>
						<Plus></Plus>
						Thêm tin
					</Button>
				</div>

				<div className='space-y-6'>
					{/* Table */}
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead className='flex items-center gap-2 cursor-pointer'>
										Vị trí <ArrowUpDown className='w-4 h-4' />
									</TableHead>
									<TableHead>
										<span className='flex gap-2 items-center cursor-pointer'>
											Mức lương <ArrowUpDown className='w-4 h-4' />
										</span>
									</TableHead>
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
								{data?.items?.map(job => (
									<TableRow key={job.id}>
										<TableCell>{job.id}</TableCell>
										<TableCell className='font-medium'>{job.title}</TableCell>
										<TableCell>{job.salary}</TableCell>
										<TableCell>{job.workingAddress}</TableCell>
										<TableCell>{job.level}</TableCell>
										<TableCell>{job.experience}</TableCell>
										<TableCell>{job.type}</TableCell>
										<TableCell>{job.quantity}</TableCell>
										<TableCell>{job.deadline?.split('T')[0]}</TableCell>
										<TableCell>
											<span className='text-green-700 font-semibold'>Active</span>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant='ghost' className='rounded-full p-1'>
														<Ellipsis />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem onClick={() => handleEdit(job.id)}>Chỉnh sửa</DropdownMenuItem>
													<DropdownMenuItem onClick={() => handleViewCV(job)}>Xem CV</DropdownMenuItem>
													<DropdownMenuItem className='text-red-600' onClick={() => handleDelete(job.id)}>
														Xóa
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
