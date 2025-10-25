import { api } from '@/lib/axios';
import { EmployerReq, EmployerRes } from '@/schema/employer.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const employerService = {
	me: () => api.get<EmployerRes>('/employers/me'),
	delete: (id: number) => api.delete<EmployerRes>(`/employers/${id}`),
	toggleActive: (id: number, active: boolean) => api.patch<EmployerRes>(`/employers/${id}/active`, { active }),
	getById: (id: number) => api.get<EmployerRes>(`/employers/${id}`),
	getAll: (query: any) => api.post<PaginationRes<EmployerRes>>('/employers/list', query),
	update: (req: EmployerReq) => api.put<EmployerRes>('/employers/me', req),
};
