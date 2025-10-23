'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { EmployerTable } from './_component/employer-table';
import { EmployerForm } from './_component/employer-form';
import Pagination from '@/components/ui/custom/pagination';
import { Card, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { employerService } from '@/service/employer.service';
import { authService } from '@/service/auth.service';

export default function EmployerPage() {
	const [openForm, setOpenForm] = useState(false);
	const [editEmployer, setEditEmployer] = useState<any | null>(null);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: employers, isLoading } = useSWR(['/employer/get', page, limit], () => employerService.getAllByCompany({ page, limit }).then(res => res.data));
	const handleEdit = (emp: any) => {
		setEditEmployer(emp);
		setOpenForm(true);
	};

	const handleAdd = () => {
		setEditEmployer(null);
		setOpenForm(true);
	};

	const handleDelete = (id: number) => {};

	return (
		<div>
			<Card>
				<div className='flex justify-between items-center mb-2'>
					<CardTitle>Quản lý người tuyển dụng</CardTitle>
					<Button onClick={handleAdd}>+ Thêm mới</Button>
				</div>

				<EmployerTable isLoading={isLoading} employers={employers?.items} onEdit={handleEdit} onDelete={handleDelete} />
				<div>
					<Pagination pageSize={limit} onPageChange={setPage} onPageSizeChange={setLimit} currentPage={page} totalItems={employers?.total}></Pagination>
				</div>
			</Card>

			<EmployerForm
				employer={editEmployer}
				onClose={() => setOpenForm(false)}
				open={openForm}
				onSave={async saved => {
					if (!editEmployer) {
						await authService.employerRegister(saved);
					} else {
						await employerService.update(saved);
					}
					if (saved.avatar) await employerService.uploadAvatar(saved.avatar);
					setOpenForm(false);
				}}
			/>
		</div>
	);
}
