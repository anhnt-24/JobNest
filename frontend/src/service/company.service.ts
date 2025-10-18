import { api } from '@/lib/axios';
import { CompanyRes } from '@/schema/company.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const companyService = {
	me: () => api.get<CompanyRes>('/company/me'),
	getById: (id: number) => api.get<CompanyRes>(`/company/${id}`),
	update: (data: any) => api.put<CompanyRes>('/company', data),
	getAll: (data: any) => api.post<PaginationRes<CompanyRes>>('/company/get-all', data),

	uploadCover: (cover: File) => {
		const formData = new FormData();
		formData.append('cover', cover);
		return api.patch<string>('/company/cover', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
