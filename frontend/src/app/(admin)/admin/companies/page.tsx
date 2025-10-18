import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function CompaniesPage() {
	const companies = [
		{
			id: 1,
			name: 'Công ty A',
			email: 'contact@companya.com',
			phone: '0243823456',
			jobsPosted: 12,
			joinedDate: '15/03/2022',
		},
		{
			id: 2,
			name: 'Công ty B',
			email: 'hr@companyb.com',
			phone: '0283823456',
			jobsPosted: 8,
			joinedDate: '22/07/2023',
		},
		// Thêm dữ liệu mẫu khác...
	];

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Quản lý công ty</h1>
				<Button>
					<Plus className='mr-2 h-4 w-4' />
					Thêm công ty
				</Button>
			</div>

			<div className='flex items-center space-x-2'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<Input type='search' placeholder='Tìm kiếm công ty...' className='pl-10' />
				</div>
				{/* Có thể thêm các filter khác ở đây */}
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên công ty</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Số điện thoại</TableHead>
							<TableHead>Số việc đã đăng</TableHead>
							<TableHead>Ngày tham gia</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{companies.map(company => (
							<TableRow key={company.id}>
								<TableCell className='font-medium'>{company?.user.name}</TableCell>
								<TableCell>{company.email}</TableCell>
								<TableCell>{company.phone}</TableCell>
								<TableCell>{company.jobsPosted}</TableCell>
								<TableCell>{company.joinedDate}</TableCell>
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
