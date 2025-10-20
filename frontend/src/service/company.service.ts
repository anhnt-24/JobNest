import { api } from '@/lib/axios';
import { CompanyRes, UpdateCompanyReq } from '@/schema/company.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const companyService = {
	me: () => api.get<CompanyRes>('/company/me'),
	getById: (id: number) => api.get<CompanyRes>(`/company/${id}`),
	update: (data: UpdateCompanyReq) => api.put<CompanyRes>('/company/me', data),
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
