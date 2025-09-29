'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, User, Mail, Phone, Calendar, FileText, ArrowUpDown, Filter, MapPin, DollarSign, Briefcase, Clock, Ellipsis, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/ui/custom/pagination';
import useSWR from 'swr';
import { cvsService } from '@/service/cvs.service';
import Link from 'next/link';
import { jobService } from '@/service/job.service';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FaDownload, FaEye, FaMagnifyingGlass } from 'react-icons/fa6';

const CVTable = ({ job }) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const jobId = job.id;
	const { data: cvs, isLoading } = useSWR(['/job/applied', page, limit, jobId], () => jobService.getAppliedJobs({ page, limit, jobId }).then(res => res.data));
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Ứng tuyển vị trí <span className='text-primary'>{job.title}</span>{' '}
				</CardTitle>
			</CardHeader>

			<div className='space-y-6'>
				<Table className='bg-white'>
					<TableHeader>
						<TableRow>
							<TableHead>Thông tin</TableHead>
							<TableHead>Chi tiết</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Mã việc làm</TableCell>
							<TableCell>{job.id}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Vị trí</TableCell>
							<TableCell>{job.title}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Mức lương</TableCell>
							<TableCell>{job.salary}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cấp bậc</TableCell>
							<TableCell>{job.type}</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>

								<TableHead>Ứng viên</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Số điện thoại</TableHead>

								<TableHead>Ngày nộp</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead>Thao tác</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{cvs?.items?.map((cv, idx) => (
								<TableRow key={cv.id}>
									<TableCell>{idx}</TableCell>

									<TableCell>
										<div className='font-medium'>{cv.candidate.name}</div>
									</TableCell>
									<TableCell>{cv.candidate.email}</TableCell>
									<TableCell>{cv.candidate.phone}</TableCell>

									<TableCell>{cv.appliedAt}</TableCell>
									<TableCell>
										<Badge>{cv.status}</Badge>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button className='rounded-full' variant='ghost'>
													<Ellipsis />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent align='center' className='w-48 text-gray-600'>
												<DropdownMenuItem>
													<Eye className='mr-2 size-5' strokeWidth={1.5} /> Xem CV
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Download className='mr-2 size-5' strokeWidth={1.5} /> Tải xuống
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<Pagination totalItems={200} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
			</div>
		</Card>
	);
};

export default CVTable;
