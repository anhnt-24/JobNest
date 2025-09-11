import { api } from '@/lib/axios';
import { CompanyResponse } from '@/schema/company.schema';

export const companyService = {
	getMyInfo: () => api.get<CompanyResponse>('/company/me'),
	getCompanyById: (id: number) => api.get<CompanyResponse>(`/company/${id}`),
	updateCompanyInfo: (data: any) => api.put<CompanyResponse>('/company/me', data),
	updateCompanyLogo: (logo: File) => {
		const formData = new FormData();
		formData.append('avatar', logo);
		return api.patch<string>('/company/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	updateCompanyCover: (cover: File) => {
		const formData = new FormData();
		formData.append('cover', cover);
		return api.patch<string>('/company/cover', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
