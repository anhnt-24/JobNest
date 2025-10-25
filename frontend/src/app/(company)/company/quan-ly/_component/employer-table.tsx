'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Ellipsis, Pencil, Search, Trash2 } from 'lucide-react';
import { FaMagnifyingGlass, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { Loading } from '@/components/shared/loading';
import { EmployerRes, EmployerReq } from '@/schema/employer.schema';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ActiveStatusSelect } from '@/components/shared/active-status-select';
import { employerService } from '@/service/employer.service';
import { toast } from 'sonner';

interface EmployerTableProps {
	employers?: EmployerRes[];
	onEdit: (employer: EmployerReq) => void;
	onDelete: (id: number) => void;
	isLoading: boolean;
}

export const EmployerTable = ({ employers, isLoading }: EmployerTableProps) => {
	const handleStatusChange = async (employerId: number, newValue: boolean) => {
		try {
			await employerService.toggleActive(employerId, newValue);
			toast.success(`Thành công. `);
		} catch (error) {
			console.error(error);
			toast.error('Thất bại.');
		}
	};
	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>#</TableHead>
						<TableHead>Họ và tên</TableHead>
						<TableHead>Giới tính</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Số điện thoại</TableHead>
						<TableHead>Ngày sinh</TableHead>
						<TableHead>Địa chỉ</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Vị trí</TableHead>
						<TableHead>Thao tác</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employers?.map(emp => (
						<TableRow key={emp.id}>
							<TableCell>{emp.employeeId}</TableCell>
							<TableCell
								className='flex gap-2 items-center
							'>
								<Avatar className='size-12 border'>
									<AvatarImage src={emp.user.avatarUrl} className='  size-12 object-cover'></AvatarImage>
								</Avatar>
								{emp.user.name}
							</TableCell>
							<TableCell>{emp.gender}</TableCell>
							<TableCell>{emp.user.email}</TableCell>
							<TableCell>{emp.user.phone}</TableCell>
							<TableCell>{emp.dob.split('T')[0]}</TableCell>
							<TableCell>{emp.address}</TableCell>
							<TableCell>
								<ActiveStatusSelect value={emp.active} onChange={newValue => handleStatusChange(emp.id, newValue)}></ActiveStatusSelect>
							</TableCell>
							<TableCell>{emp.position}</TableCell>
							<TableCell className=''>
								<div className='h-full'>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant={'ghost'}>
												<Ellipsis />
											</Button>
										</DropdownMenuTrigger>

										<DropdownMenuContent align='end' className='w-48 text-gray-600'>
											<DropdownMenuItem className='text-red-500'>
												<Trash2 className='mr-2 size-5' /> Xóa
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{isLoading && <Loading type='table'></Loading>}
		</div>
	);
};
