'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye, Plus, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Demo data
const demoJobs = [
	{
		id: '1',
		viTri: 'Backend Engineer',
		mucLuong: '20–30 triệu',
		diaDiem: 'Hà Nội',
		capBac: 'Senior',
		kinhNghiem: '3 năm',
		hinhThuc: 'Toàn thời gian',
		soLuong: 2,
		hanNop: '2025-09-01',
		trangThai: 'Đang tuyển',
		moTa: 'Tìm kiếm lập trình viên Backend có kinh nghiệm với Node.js và MongoDB',
		kyNang: 'Node.js, MongoDB, Express, REST API',
		nhaTuyenDung: 'Công ty Công nghệ ABC',
		ngayTao: '2025-07-15',
		soLuongCV: 15,
	},
	{
		id: '2',
		viTri: 'Frontend Developer',
		mucLuong: '15–25 triệu',
		diaDiem: 'TP.HCM',
		capBac: 'Junior',
		kinhNghiem: '1 năm',
		hinhThuc: 'Hybrid',
		soLuong: 1,
		hanNop: '2025-08-31',
		trangThai: 'Đang tuyển',
		moTa: 'Tuyển dụng Frontend Developer có hiểu biết về React và Vue',
		kyNang: 'React, Vue, JavaScript, HTML, CSS',
		nhaTuyenDung: 'Công ty Phần mềm XYZ',
		ngayTao: '2025-07-20',
		soLuongCV: 8,
	},
	{
		id: '3',
		viTri: 'Data Scientist',
		mucLuong: '25–35 triệu',
		diaDiem: 'Đà Nẵng',
		capBac: 'Mid-level',
		kinhNghiem: '2 năm',
		hinhThuc: 'Remote',
		soLuong: 3,
		hanNop: '2025-09-15',
		trangThai: 'Sắp tuyển',
		moTa: 'Cần chuyên gia phân tích dữ liệu với kỹ năng machine learning',
		kyNang: 'Python, R, Machine Learning, SQL',
		nhaTuyenDung: 'Công ty Dữ liệu DEF',
		ngayTao: '2025-08-01',
		soLuongCV: 0,
	},
];

export default function JobTable() {
	const [jobs, setJobs] = useState(demoJobs);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('Tất cả');

	const handleViewCV = (id: string) => {
		alert(`Xem CV cho job id: ${id}`);
	};

	const handleEdit = (id: string) => {
		alert(`Chỉnh sửa job id: ${id}`);
	};

	const handleDelete = (id: string) => {
		if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
			setJobs(prev => prev.filter(job => job.id !== id));
		}
	};

	const handleAddJob = () => {
		alert('Thêm tin tuyển dụng mới');
	};

	const filteredJobs = jobs.filter(job => {
		const matchesSearch = job.viTri.toLowerCase().includes(searchTerm.toLowerCase()) || job.diaDiem.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = filterStatus === 'Tất cả' || job.trangThai === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const getStatusVariant = status => {
		switch (status) {
			case 'Đang tuyển':
				return 'default';
			case 'Sắp tuyển':
				return 'outline';
			case 'Đã đóng':
				return 'secondary';
			default:
				return 'default';
		}
	};

	return (
		<Card className='shadow-lg border rounded-2xl'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
				<CardTitle className='text-2xl'>Danh sách tin tuyển dụng</CardTitle>
				<Button onClick={handleAddJob}>
					<Plus className='mr-2 h-4 w-4' /> Thêm tin
				</Button>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col md:flex-row gap-4 mb-6'>
					<div className='relative flex-1'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input placeholder='Tìm kiếm theo vị trí, địa điểm...' className='pl-8' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
					</div>
					<div className='flex gap-2'>
						<Button variant='outline' className='flex items-center gap-2'>
							<Filter className='h-4 w-4' /> Lọc
						</Button>
						<select className='border rounded-md px-3 py-2 text-sm' value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
							<option value='Tất cả'>Tất cả trạng thái</option>
							<option value='Đang tuyển'>Đang tuyển</option>
							<option value='Sắp tuyển'>Sắp tuyển</option>
							<option value='Đã đóng'>Đã đóng</option>
						</select>
					</div>
				</div>

				<div className='overflow-x-auto'>
					<Table className='border border-gray-300'>
						<TableHeader>
							<TableRow className='bg-gray-100'>
								<TableHead className='border border-gray-300'>Vị trí</TableHead>
								<TableHead className='border border-gray-300'>Mức lương</TableHead>
								<TableHead className='border border-gray-300'>Địa điểm</TableHead>
								<TableHead className='border border-gray-300'>Cấp bậc</TableHead>
								<TableHead className='border border-gray-300'>Kinh nghiệm</TableHead>
								<TableHead className='border border-gray-300'>Hình thức</TableHead>
								<TableHead className='border border-gray-300'>Số lượng</TableHead>
								<TableHead className='border border-gray-300'>Hạn nộp</TableHead>
								<TableHead className='border border-gray-300'>Trạng thái</TableHead>
								<TableHead className='border border-gray-300 text-center'>Thao tác</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredJobs.map((job, idx) => (
								<TableRow key={job.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<TableCell className='border border-gray-300 font-medium'>{job.viTri}</TableCell>
									<TableCell className='border border-gray-300'>{job.mucLuong}</TableCell>
									<TableCell className='border border-gray-300'>{job.diaDiem}</TableCell>
									<TableCell className='border border-gray-300'>{job.capBac}</TableCell>
									<TableCell className='border border-gray-300'>{job.kinhNghiem}</TableCell>
									<TableCell className='border border-gray-300'>{job.hinhThuc}</TableCell>
									<TableCell className='border border-gray-300'>{job.soLuong}</TableCell>
									<TableCell className='border border-gray-300'>{job.hanNop}</TableCell>
									<TableCell className='border border-gray-300'>
										<Badge variant={getStatusVariant(job.trangThai)}>{job.trangThai}</Badge>
									</TableCell>
									<TableCell className='border border-gray-300'>
										<div className='flex justify-center space-x-2'>
											<Button variant='outline' size='icon' onClick={() => handleViewCV(job.id)} title='Xem CV'>
												<Eye className='h-4 w-4' />
											</Button>
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
			</CardContent>
		</Card>
	);
}
