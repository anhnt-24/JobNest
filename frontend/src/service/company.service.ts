import { api } from '@/lib/axios';
import { CompanyRes } from '@/schema/company.schema';

export const companyService = {
	me: () => api.get<CompanyRes>('/company/me'),
	getById: (id: number) => api.get<CompanyRes>(`/company/${id}`),
	update: (data: any) => api.put<CompanyRes>('/company', data),
	uploadAvatar: (logo: File) => {
		const formData = new FormData();
		formData.append('avatar', logo);
		return api.patch<string>('/company/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
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
