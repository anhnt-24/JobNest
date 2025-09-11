import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function JobsPage() {
	const jobs = [
		{
			id: 1,
			title: 'Lập trình viên Frontend',
			company: 'Công ty A',
			location: 'Hà Nội',
			type: 'Toàn thời gian',
			posted: '2 ngày trước',
			status: 'active',
		},
		{
			id: 2,
			title: 'Lập trình viên Backend',
			company: 'Công ty B',
			location: 'TP.HCM',
			type: 'Toàn thời gian',
			posted: '1 tuần trước',
			status: 'active',
		},
		// Thêm dữ liệu mẫu khác...
	];

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Quản lý việc làm</h1>
				<Button>
					<Plus className='mr-2 h-4 w-4' />
					Thêm việc làm
				</Button>
			</div>

			<div className='flex items-center space-x-2'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<Input type='search' placeholder='Tìm kiếm việc làm...' className='pl-10' />
				</div>
				{/* Có thể thêm các filter khác ở đây */}
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tiêu đề</TableHead>
							<TableHead>Công ty</TableHead>
							<TableHead>Địa điểm</TableHead>
							<TableHead>Loại hình</TableHead>
							<TableHead>Đăng tải</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{jobs.map(job => (
							<TableRow key={job.id}>
								<TableCell className='font-medium'>{job.title}</TableCell>
								<TableCell>{job.company}</TableCell>
								<TableCell>{job.location}</TableCell>
								<TableCell>{job.type}</TableCell>
								<TableCell>{job.posted}</TableCell>
								<TableCell>
									<span className={`px-2 py-1 rounded-full text-xs ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
										{job.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
									</span>
								</TableCell>
								<TableCell>
									<Button variant='ghost' size='icon'>
										<MoreHorizontal className='h-4 w-4' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
