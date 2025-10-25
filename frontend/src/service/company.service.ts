import { api } from '@/lib/axios';
import { CompanyRes, CompanyReq } from '@/schema/company.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const companyService = {
	me: () => api.get<CompanyRes>('/companies/me'),
	getById: (id: number) => api.get<CompanyRes>(`/companies/${id}`),
	update: (data: CompanyReq) => api.put<CompanyRes>('/companies/me', data),
	getAll: (data: any) => api.post<PaginationRes<CompanyRes>>('/companies/list', data),
	uploadCover: (cover: File) => {
		const formData = new FormData();
		formData.append('cover', cover);
		return api.patch<string>('/companies/cover', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
