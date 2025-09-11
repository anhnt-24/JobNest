'use client';

import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye, Plus, Filter, Search, Download, User, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Pagination from '@/components/ui/custom/pagination';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import JobStatusCell from './job-status-cell';
import { JobResponse } from '@/schema/job.schema';

export function JobTable() {
	const [jobs, setJobs] = useState<JobResponse[]>([]);
	const [selectedJob, setSelectedJob] = useState<JobResponse>();
	const [cvDialogOpen, setCvDialogOpen] = useState(false);

	const handleViewCV = (job: JobResponse) => {
		setSelectedJob(job);
		setCvDialogOpen(true);
	};

	const handleEdit = (id: string) => {
		alert(`Chỉnh sửa job id: ${id}`);
	};

	const handleDelete = (id: number) => {
		if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
			setJobs(prev => prev.filter(job => job.id !== id));
		}
	};

	const handleAddJob = () => {
		alert('Thêm tin tuyển dụng mới');
	};

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const { data } = useSWR(`/api/jobs?page=${page}&pageSize=${pageSize}`, () => jobService.getme({ page, pageSize }), {
		suspense: true,
		fallbackData: [],
	});
	useEffect(() => {
		if (data?.data?.items) {
			setJobs(data.data?.items);
		}
	}, [data]);
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
				<CardTitle>Danh sách tin tuyển dụng</CardTitle>
				<Button onClick={handleAddJob}>
					<Plus /> Thêm tin
				</Button>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Mã việc làm</TableHead>
								<TableHead>Vị trí</TableHead>
								<TableHead>Mức lương</TableHead>
								<TableHead>Địa điểm</TableHead>
								<TableHead>Cấp bậc</TableHead>
								<TableHead>Kinh nghiệm</TableHead>
								<TableHead>Hình thức</TableHead>
								<TableHead>Số lượng</TableHead>
								<TableHead>Hạn nộp</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead>CV ứng tuyển</TableHead>
								<TableHead>Thao tác</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{jobs.map((job, idx) => (
								<TableRow key={job.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<TableCell>{job.id}</TableCell>

									<TableCell>{job.title}</TableCell>
									<TableCell>
										{job.salaryFrom}-{job.salaryTo}
									</TableCell>
									<TableCell>{job.workingAddress}</TableCell>
									<TableCell>{job.level}</TableCell>
									<TableCell>{job.experience}</TableCell>
									<TableCell>{job.type}</TableCell>
									<TableCell>{job.quantity}</TableCell>
									<TableCell>{job.deadline?.split('T')[0]}</TableCell>
									<JobStatusCell job={job}></JobStatusCell>
									<TableCell>
										<Button variant='outline' size='sm' onClick={() => handleViewCV(job)} disabled={job.soLuongCV === 0}>
											{job.soLuongCV} CV
										</Button>
									</TableCell>
									<TableCell>
										<div className='flex justify-center space-x-2'>
											<Button variant='outline' size='icon' onClick={() => handleEdit(job.id)} title='Chỉnh sửa'>
												<Pencil className='h-4 w-4' />
											</Button>
											<Button variant='outline' size='icon' onClick={() => handleDelete(job.id)} title='Xóa' className='text-red-600 hover:text-red-700 hover:bg-red-100'>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{jobs.length === 0 && <div className='text-center py-8 text-muted-foreground'>Không tìm thấy tin tuyển dụng nào phù hợp</div>}
				{/* Dialog hiển thị CV ứng viên */}
				<Dialog open={cvDialogOpen} onOpenChange={setCvDialogOpen}>
					<DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>CV ứng tuyển cho vị trí: {selectedJob?.viTri}</DialogTitle>
							<DialogDescription>Tổng số: {selectedJob?.cvs?.length || 0} CV</DialogDescription>
						</DialogHeader>

						<div className='mt-4 space-y-4'>
							{selectedJob?.cvs?.length > 0 ? (
								selectedJob.cvs.map(cv => (
									<div key={cv.id} className='border rounded-lg p-4'>
										<div className='flex justify-between items-start'>
											<div className='space-y-2'>
												<div className='flex items-center gap-2'>
													<User className='h-4 w-4' />
													<span className='font-medium'>{cv.ten}</span>
												</div>
												<div className='flex items-center gap-2'>
													<Mail className='h-4 w-4' />
													<span>{cv.email}</span>
												</div>
												<div className='flex items-center gap-2'>
													<Phone className='h-4 w-4' />
													<span>{cv.sdt}</span>
												</div>
												<div className='flex items-center gap-2'>
													<Calendar className='h-4 w-4' />
													<span>Ngày nộp: {cv.ngayNop}</span>
												</div>
												<div>
													<Badge variant={getCVStatusVariant(cv.trangThai)}>{cv.trangThai}</Badge>
												</div>
											</div>
											<div>
												<Button variant='outline' size='sm' onClick={() => handleDownloadCV(cv)}>
													<Download className='h-4 w-4 mr-2' />
													Tải CV
												</Button>
											</div>
										</div>
										<div className='mt-3 pt-3 border-t'>
											<a href={cv.fileUrl} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 flex items-center gap-2'>
												<FileText className='h-4 w-4' />
												Xem CV
											</a>
										</div>
									</div>
								))
							) : (
								<p className='text-center text-muted-foreground py-4'>Chưa có CV nào ứng tuyển cho vị trí này</p>
							)}
						</div>
					</DialogContent>
				</Dialog>
				<Pagination totalItems={200} pageSize={pageSize} currentPage={page} onPageChange={setPage} onPageSizeChange={setPageSize} pageSizeOptions={[5, 10, 20, 50]} />
			</CardContent>
		</Card>
	);
}

export default function Page() {
	return (
		<Suspense fallback={<>cc</>}>
			<JobTable></JobTable>
		</Suspense>
	);
}
