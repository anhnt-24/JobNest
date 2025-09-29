'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash, Edit, Check, X, Search } from 'lucide-react';

// NOTE: This component expects shadcn/ui components to exist in your project as imports above.
// It also expects an API at /api/admin/users for GET (list), PUT (update), DELETE (delete), POST (create) etc.

type Role = 'candidate' | 'employer' | 'admin' | 'company';

type User = {
	id: number;
	email: string;
	role: Role;
	active: boolean;
	verified: boolean;
	createdAt: string;
};

export default function AdminUsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [query, setQuery] = useState('');
	const [roleFilter, setRoleFilter] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(12);
	const [loading, setLoading] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [editing, setEditing] = useState<Partial<User> | null>(null);

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		try {
			const params: any = { page, pageSize };
			if (query) params.q = query;
			if (roleFilter) params.role = roleFilter;

			const res = await axios.get('/api/admin/users', { params });
			// Expecting { data: User[], total: number }
			setUsers(res.data.data || []);
		} catch (err) {
			console.error(err);
			// TODO: toast error
		} finally {
			setLoading(false);
		}
	}, [page, pageSize, query, roleFilter]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const onToggleActive = async (u: User) => {
		try {
			const res = await axios.put(`/api/admin/users/${u.id}`, { active: !u.active });
			// optimistic update
			setUsers(prev => prev.map(p => (p.id === u.id ? { ...p, active: res.data.active } : p)));
		} catch (err) {
			console.error(err);
		}
	};

	const onDelete = async (u: User) => {
		if (!confirm(`Xác nhận xóa tài khoản ${u.email}?`)) return;
		try {
			await axios.delete(`/api/admin/users/${u.id}`);
			setUsers(prev => prev.filter(p => p.id !== u.id));
		} catch (err) {
			console.error(err);
		}
	};

	const openEdit = (u: User) => {
		setSelectedUser(u);
		setEditing(u);
	};

	const closeEdit = () => {
		setSelectedUser(null);
		setEditing(null);
	};

	const saveEdit = async () => {
		if (!editing || !selectedUser) return;
		try {
			const payload = {
				email: editing.email,
				role: editing.role,
				active: editing.active,
				verified: editing.verified,
			};
			const res = await axios.put(`/api/admin/users/${selectedUser.id}`, payload);
			setUsers(prev => prev.map(p => (p.id === selectedUser.id ? res.data : p)));
			closeEdit();
		} catch (err) {
			console.error(err);
		}
	};

	const filtered = useMemo(() => {
		return users;
	}, [users]);

	return (
		<div className='space-y-6 p-6'>
			<Card>
				<CardHeader>
					<CardTitle>Quản lý tài khoản</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
						<div className='flex items-center gap-2 w-full md:w-1/2'>
							<Input placeholder='Tìm theo email, tên...' value={query} onChange={e => setQuery(e.target.value)} className='flex-1' />
							<Button variant='outline' onClick={() => fetchUsers()}>
								<Search size={16} />
								<span className='ml-2'>Tìm</span>
							</Button>
						</div>

						<div className='flex items-center gap-2'>
							<Select onValueChange={v => setRoleFilter(v || null)}>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Lọc theo vai trò' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='cc'>Tất cả</SelectItem>
									<SelectItem value='candidate'>Candidate</SelectItem>
									<SelectItem value='employer'>Employer</SelectItem>
									<SelectItem value='admin'>Admin</SelectItem>
									<SelectItem value='company'>Company</SelectItem>
								</SelectContent>
							</Select>
							<Button
								onClick={() => {
									setQuery('');
									setRoleFilter(null);
									fetchUsers();
								}}>
								Reset
							</Button>
						</div>
					</div>

					<div className='mt-4 overflow-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Active</TableHead>
									<TableHead>Verified</TableHead>
									<TableHead>Created</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map(u => (
									<TableRow key={u.id}>
										<TableCell>
											<div className='flex items-center gap-3'>
												<Avatar>
													<AvatarFallback>{u.email?.charAt(0)?.toUpperCase()}</AvatarFallback>
												</Avatar>
												<div className='flex flex-col'>
													<span className='font-medium'>{u.email}</span>
													<span className='text-sm text-muted-foreground'>ID: {u.id}</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge>{u.role}</Badge>
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-2'>
												<Button size='sm' variant='ghost' onClick={() => onToggleActive(u)}>
													{u.active ? <Check size={16} /> : <X size={16} />}
												</Button>
												<span>{u.active ? 'Active' : 'Inactive'}</span>
											</div>
										</TableCell>
										<TableCell>{u.verified ? <Badge>Verified</Badge> : <Badge variant='secondary'>Unverified</Badge>}</TableCell>
										<TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
										<TableCell>
											<div className='flex items-center gap-2'>
												<Button size='sm' variant='ghost' onClick={() => openEdit(u)}>
													<Edit size={14} />
												</Button>
												<Button size='sm' variant='destructive' onClick={() => onDelete(u)}>
													<Trash size={14} />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{loading && <div className='py-4'>Đang tải...</div>}
						{!loading && users.length === 0 && <div className='p-4 text-center text-sm text-muted-foreground'>Không tìm thấy tài khoản</div>}
					</div>

					{/* Simple pagination controls */}
					<div className='mt-4 flex items-center justify-between'>
						<div className='text-sm text-muted-foreground'>Hiển thị {users.length} tài khoản</div>
						<div className='flex items-center gap-2'>
							<Button variant='ghost' onClick={() => setPage(p => Math.max(1, p - 1))}>
								Prev
							</Button>
							<div className='px-3'>{page}</div>
							<Button variant='ghost' onClick={() => setPage(p => p + 1)}>
								Next
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Edit dialog */}
			<Dialog
				open={!!selectedUser}
				onOpenChange={open => {
					if (!open) closeEdit();
				}}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
					</DialogHeader>

					{editing && (
						<div className='space-y-4'>
							<div>
								<label className='text-sm'>Email</label>
								<Input value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })} />
							</div>

							<div>
								<label className='text-sm'>Role</label>
								<Select value={(editing.role as string) || ''} onValueChange={v => setEditing({ ...editing, role: v as Role })}>
									<SelectTrigger className='w-full'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='candidate'>Candidate</SelectItem>
										<SelectItem value='employer'>Employer</SelectItem>
										<SelectItem value='admin'>Admin</SelectItem>
										<SelectItem value='company'>Company</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='flex gap-2'>
								<Button onClick={saveEdit}>Lưu</Button>
								<Button variant='ghost' onClick={closeEdit}>
									Hủy
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

/*
  Server expectations (example Next.js API route)

  GET /api/admin/users -> { data: User[], total }
  PUT /api/admin/users/:id -> returns updated user
  DELETE /api/admin/users/:id -> 204

  Your API can be implemented with Prisma like:

  import { prisma } from '@/lib/prisma';

  export default async function handler(req, res) {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({ take, skip, orderBy: { createdAt: 'desc' } });
      return res.json({ data: users, total: await prisma.user.count() });
    }

    if (req.method === 'PUT') {
      const id = Number(req.query.id);
      const body = req.body;
      const updated = await prisma.user.update({ where: { id }, data: body });
      return res.json(updated);
    }

    if (req.method === 'DELETE') {
      const id = Number(req.query.id);
      await prisma.user.delete({ where: { id } });
      return res.status(204).end();
    }
  }
*/
