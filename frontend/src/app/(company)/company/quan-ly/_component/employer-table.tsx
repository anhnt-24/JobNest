'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { FaMagnifyingGlass, FaPencil, FaTrashCan } from 'react-icons/fa6';

interface EmployerTableProps {
	employers: any[];
	onEdit: (employer: any) => void;
	onDelete: (id: number) => void;
}

export const EmployerTable = ({ employers, onEdit, onDelete }: EmployerTableProps) => {
	return (
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
				{employers.map(emp => (
					<TableRow key={emp.id}>
						<TableCell>{emp.employeeId}</TableCell>
						<TableCell>{emp.gender}</TableCell>
						<TableCell>{emp.name}</TableCell>
						<TableCell>{emp.user.email}</TableCell>
						<TableCell>{emp.phone}</TableCell>
						<TableCell>{emp.dob.split('T')[0]}</TableCell>
						<TableCell>{emp.address}</TableCell>
						<TableCell>
							<Badge variant={emp.user.active ? 'default' : 'destructive'}>{emp.user.active ? 'active' : 'restricted'} </Badge>
						</TableCell>
						<TableCell>{emp.position}</TableCell>
						<TableCell className='flex gap-2'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button className='rounded-full' variant='ghost'>
										<Ellipsis />
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent align='end' className='w-48 text-gray-600'>
									<DropdownMenuItem>
										<FaPencil className='mr-2 size-5' /> Chỉnh sửa
									</DropdownMenuItem>
									<DropdownMenuItem>
										<FaMagnifyingGlass className='mr-2 size-5' /> Xem CV
									</DropdownMenuItem>
									<DropdownMenuItem className='text-red-500'>
										<FaTrashCan className='mr-2 size-5' /> Xóa
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
