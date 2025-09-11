import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal } from 'lucide-react';

export default function ApplicantsPage() {
	const applicants = [
		{
			id: 1,
			name: 'Nguyễn Văn A',
			email: 'a.nguyen@example.com',
			phone: '0123456789',
			appliedJobs: 3,
			lastActive: '2 ngày trước',
		},
		{
			id: 2,
			name: 'Trần Thị B',
			email: 'b.tran@example.com',
			phone: '0987654321',
			appliedJobs: 5,
			lastActive: '1 tuần trước',
		},
		// Thêm dữ liệu mẫu khác...
	];

	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Quản lý ứng viên</h1>

			<div className='flex items-center space-x-2'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<Input type='search' placeholder='Tìm kiếm ứng viên...' className='pl-10' />
				</div>
				{/* Có thể thêm các filter khác ở đây */}
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Số điện thoại</TableHead>
							<TableHead>Số việc đã ứng tuyển</TableHead>
							<TableHead>Hoạt động gần nhất</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{applicants.map(applicant => (
							<TableRow key={applicant.id}>
								<TableCell className='font-medium'>{applicant.name}</TableCell>
								<TableCell>{applicant.email}</TableCell>
								<TableCell>{applicant.phone}</TableCell>
								<TableCell>{applicant.appliedJobs}</TableCell>
								<TableCell>{applicant.lastActive}</TableCell>
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
