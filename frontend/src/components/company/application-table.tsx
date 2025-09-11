import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type ApplicationStatus = 'pending' | 'reviewed' | 'rejected' | 'accepted';

interface Application {
	id: string;
	candidateName: string;
	jobTitle: string;
	appliedDate: string;
	status: ApplicationStatus;
	email: string;
	phone: string;
}

interface ApplicationTableProps {
	status?: ApplicationStatus | 'all';
}

export function ApplicationTable({ status = 'all' }: ApplicationTableProps) {
	const applications: Application[] = [
		{
			id: '1',
			candidateName: 'NguyễnVăn A',
			jobTitle: 'Frontend Developer',
			appliedDate: '2023-10-15',
			status: 'pending',
			email: 'a.nguyen@example.com',
			phone: '0912345678',
		},
		{
			id: '2',
			candidateName: 'Trần Thị B',
			jobTitle: 'Backend Developer',
			appliedDate: '2023-10-14',
			status: 'reviewed',
			email: 'b.tran@example.com',
			phone: '0987654321',
		},
		{
			id: '3',
			candidateName: 'Lê Văn C',
			jobTitle: 'Fullstack Developer',
			appliedDate: '2023-10-13',
			status: 'accepted',
			email: 'c.le@example.com',
			phone: '0978123456',
		},
		{
			id: '4',
			candidateName: 'Phạm Thị D',
			jobTitle: 'UI/UX Designer',
			appliedDate: '2023-10-12',
			status: 'rejected',
			email: 'd.pham@example.com',
			phone: '0965432187',
		},
	];

	// Filter applications based on status
	const filteredApplications = status === 'all' ? applications : applications.filter(app => app.status === status);

	const getStatusBadge = (status: ApplicationStatus) => {
		switch (status) {
			case 'pending':
				return <Badge variant='secondary'>Chờ xử lý</Badge>;
			case 'reviewed':
				return <Badge variant='default'>Đã xem</Badge>;
			case 'accepted':
				return <Badge>Chấp nhận</Badge>;
			case 'rejected':
				return <Badge variant='destructive'>Từ chối</Badge>;
			default:
				return <Badge variant='outline'>Unknown</Badge>;
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Ứng viên</TableHead>
					<TableHead>Vị trí</TableHead>
					<TableHead>Ngày ứng tuyển</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{filteredApplications.map(application => (
					<TableRow key={application.id}>
						<TableCell className='font-medium'>{application.candidateName}</TableCell>
						<TableCell>{application.jobTitle}</TableCell>
						<TableCell>{new Date(application.appliedDate).toLocaleDateString('vi-VN')}</TableCell>
						<TableCell>{getStatusBadge(application.status)}</TableCell>
						<TableCell className='text-right'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' size='sm'>
										<MoreHorizontal className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem>
										<FileText className='mr-2 h-4 w-4' />
										Xem hồ sơ
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Mail className='mr-2 h-4 w-4' />
										Gửi email
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Phone className='mr-2 h-4 w-4' />
										Gọi điện
									</DropdownMenuItem>
									{application.status === 'pending' && (
										<>
											<DropdownMenuItem className='text-green-600'>Chấp nhận</DropdownMenuItem>
											<DropdownMenuItem className='text-red-600'>Từ chối</DropdownMenuItem>
										</>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
