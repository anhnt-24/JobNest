'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, Ellipsis, Eye, Download, Sheet } from 'lucide-react';
import Pagination from '@/components/ui/custom/pagination';

// Fake data
const fakeCVs = Array.from({ length: 42 }).map((_, idx) => {
	const jobTitles = ['Backend Dev', 'Frontend Dev', 'UI/UX Designer', 'QA Engineer', 'Project Manager'];
	const randomJob = jobTitles[Math.floor(Math.random() * jobTitles.length)];
	return {
		id: `cv-${idx + 1}`,
		job: {
			id: `JOB-${Math.floor(idx / 5) + 1001}`,
			title: randomJob,
		},
		candidate: {
			name: `Ứng viên ${idx + 1}`,
			email: `user${idx + 1}@gmail.com`,
			phone: `090${Math.floor(100000 + Math.random() * 900000)}`,
		},
		appliedAt: `2025-09-${String((idx % 28) + 1).padStart(2, '0')}`,
		status: ['Pending', 'Accepted', 'Rejected'][Math.floor(Math.random() * 3)],
	};
});

export default function CVManagementTable() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortOrder('asc');
		}
	};

	const filteredCVs = fakeCVs
		.filter(cv =>
			search
				? cv.candidate.name.toLowerCase().includes(search.toLowerCase()) ||
				  cv.candidate.email.toLowerCase().includes(search.toLowerCase()) ||
				  cv.candidate.phone.includes(search) ||
				  cv.job.title.toLowerCase().includes(search.toLowerCase()) ||
				  cv.job.id.toLowerCase().includes(search.toLowerCase())
				: true
		)
		.filter(cv => (statusFilter ? cv.status === statusFilter : true))
		.sort((a, b) => {
			if (!sortField) return 0;
			const valA = sortField === 'name' ? a.candidate.name : sortField === 'appliedAt' ? a.appliedAt : a.job.title;
			const valB = sortField === 'name' ? b.candidate.name : sortField === 'appliedAt' ? b.appliedAt : b.job.title;
			return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
		});

	return (
		<div className='space-y-6 bg-white p-6'>
			<h2>Quản lí hồ sơ ứng viên</h2>

			{/* Search + filter */}
			<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 '>
				<div className='relative flex-1'>
					<Input placeholder='Tìm kiếm ứng viên hoặc việc làm...' value={search} onChange={e => setSearch(e.target.value)} className='pr-10' />
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='sketch'>
							<Filter />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						<DropdownMenuItem onClick={() => setStatusFilter(null)}>Tất cả</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setStatusFilter('Accepted')}>Accepted</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setStatusFilter('Rejected')}>Rejected</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button variant='sketch'>
					<Sheet />
				</Button>
				<Button>Tìm kiếm ứng viên</Button>
			</div>

			{/* CV Table */}
			<Table className='bg-white'>
				<TableHeader>
					<TableRow>
						<TableHead>#</TableHead>
						<TableHead className='cursor-pointer' onClick={() => handleSort('job')}>
							Việc làm <ArrowUpDown className='inline w-4 h-4' />
						</TableHead>
						<TableHead className='cursor-pointer' onClick={() => handleSort('name')}>
							Ứng viên <ArrowUpDown className='inline w-4 h-4' />
						</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Số điện thoại</TableHead>
						<TableHead className='cursor-pointer' onClick={() => handleSort('appliedAt')}>
							Ngày nộp <ArrowUpDown className='inline w-4 h-4' />
						</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Thao tác</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{filteredCVs.slice((page - 1) * limit, page * limit).map((cv, idx) => (
						<TableRow key={cv.id} className='hover:bg-gray-50'>
							<TableCell>{idx + 1 + (page - 1) * limit}</TableCell>
							<TableCell>
								<div className='flex flex-col'>
									<span className='font-medium'>{cv.job.title}</span>
									<span className='text-xs text-gray-500'>{cv.job.id}</span>
								</div>
							</TableCell>
							<TableCell>{cv.candidate.name}</TableCell>
							<TableCell>{cv.candidate.email}</TableCell>
							<TableCell>{cv.candidate.phone}</TableCell>
							<TableCell>{cv.appliedAt}</TableCell>
							<TableCell>
								<Badge variant={cv.status === 'Accepted' ? 'default' : cv.status === 'Rejected' ? 'destructive' : 'secondary'}>{cv.status}</Badge>
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
											<Eye className='mr-2 w-4 h-4' strokeWidth={1.5} /> Xem CV
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Download className='mr-2 w-4 h-4' strokeWidth={1.5} /> Tải xuống
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Pagination */}
			<Pagination totalItems={filteredCVs.length} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
		</div>
	);
}
