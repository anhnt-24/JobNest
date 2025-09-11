'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, User, Mail, Phone, Calendar, FileText, ArrowUpDown, Filter, MapPin, DollarSign, Briefcase, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/ui/custom/pagination';

const CVTable = ({ job, cvs }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('Tất cả');
	const [sortField, setSortField] = useState('ngayNop');
	const [sortDirection, setSortDirection] = useState('desc');

	const filteredAndSortedCVs = useMemo(() => {
		let filtered = cvs.filter(cv => {
			const matchesSearch = cv.ten.toLowerCase().includes(searchTerm.toLowerCase()) || cv.email.toLowerCase().includes(searchTerm.toLowerCase()) || cv.sdt.includes(searchTerm);

			const matchesStatus = statusFilter === 'Tất cả' || cv.trangThai === statusFilter;

			return matchesSearch && matchesStatus;
		});

		filtered.sort((a, b) => {
			let aValue = a[sortField];
			let bValue = b[sortField];

			if (sortField === 'ngayNop') {
				aValue = new Date(aValue);
				bValue = new Date(bValue);
			}

			if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		return filtered;
	}, [cvs, searchTerm, statusFilter, sortField, sortDirection]);

	const handleSort = field => {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('desc');
		}
	};

	const handleDownloadCV = cv => {
		alert(`Tải CV của ${cv.ten} từ ${cv.fileUrl}`);
	};

	const getStatusVariant = status => {
		switch (status) {
			case 'Mới':
				return 'default';
			case 'Đã xem':
				return 'secondary';
			case 'Đã liên hệ':
				return 'outline';
			case 'Phù hợp':
				return 'default';
			case 'Không phù hợp':
				return 'secondary';
			default:
				return 'default';
		}
	};

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const info = [
		{ icon: <MapPin className='h-5 w-5 text-muted-foreground' />, label: 'Địa điểm', value: job.diaDiem },
		{ icon: <DollarSign className='h-5 w-5 text-muted-foreground' />, label: 'Mức lương', value: job.mucLuong },
		{ icon: <User className='h-5 w-5 text-muted-foreground' />, label: 'Cấp bậc', value: job.capBac },
		{ icon: <Clock className='h-5 w-5 text-muted-foreground' />, label: 'Hạn nộp', value: job.hanNop },
	];
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-xl flex items-center gap-2'>
					<Briefcase className='h-5 w-5' />
					{job.viTri}
				</CardTitle>
			</CardHeader>

			<CardContent className='space-y-6'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Thông tin</TableHead>
							<TableHead>Chi tiết</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{info.map((item, idx) => (
							<TableRow key={idx}>
								<TableCell>
									<div className='flex items-center gap-2'>
										{item.icon}

										{item.label}
									</div>
								</TableCell>
								<TableCell>{item.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='' onClick={() => handleSort('ten')}>
									<div className='flex items-center'>
										Ứng viên
										<ArrowUpDown className='ml-2 h-4 w-4' />
									</div>
								</TableHead>
								<TableHead>Thông tin liên hệ</TableHead>
								<TableHead onClick={() => handleSort('ngayNop')}>
									<div className='flex items-center'>
										Ngày nộp
										<ArrowUpDown className='ml-2 h-4 w-4' />
									</div>
								</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead className='text-right'>Thao tác</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAndSortedCVs.length > 0 ? (
								filteredAndSortedCVs.map(cv => (
									<TableRow key={cv.id}>
										<TableCell>
											<div className='font-medium'>{cv.ten}</div>
											<div className='text-sm text-muted-foreground'>{cv.viTri}</div>
										</TableCell>
										<TableCell>
											<div className='flex flex-col gap-1'>
												<div className='flex items-center gap-2'>
													<Mail className='h-3 w-3' />
													<span className='text-sm'>{cv.email}</span>
												</div>
												<div className='flex items-center gap-2'>
													<Phone className='h-3 w-3' />
													<span className='text-sm'>{cv.sdt}</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-2'>
												<Calendar className='h-4 w-4 text-muted-foreground' />
												{cv.ngayNop}
											</div>
										</TableCell>
										<TableCell>
											<Badge variant={getStatusVariant(cv.trangThai)}>{cv.trangThai}</Badge>
										</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end gap-2'>
												<Button variant='outline' size='sm' asChild>
													<a href={cv.fileUrl} target='_blank' rel='noopener noreferrer'>
														<FileText className='h-4 w-4 mr-1' />
														Xem CV
													</a>
												</Button>
												<Button variant='default' size='sm' onClick={() => handleDownloadCV(cv)}>
													<Download className='h-4 w-4 mr-1' />
													Tải
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} className='h-24 text-center'>
										Không tìm thấy CV nào phù hợp.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<Pagination totalItems={200} pageSize={pageSize} currentPage={page} onPageChange={setPage} onPageSizeChange={setPageSize} pageSizeOptions={[5, 10, 20, 50]} />
			</CardContent>
		</Card>
	);
};

export default CVTable;
