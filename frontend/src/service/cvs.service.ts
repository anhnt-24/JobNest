import { api } from '@/lib/axios';

export const cvsService = {
	createCv: (file: File, title: string) => {
		const data = new FormData();
		if (file) data.append('file', file as File);
		data.append('title', title);

		return api.post('/cvs/create', data);
	},
	getCvs: (query: any) => api.post('/cvs/me', query),
	getCvById: (id: number) => api.get(`/cvs/${id}`),
	updateCv: (id: number, data: any) => api.patch(`/cvs/${id}`, data),
	deleteCv: (id: number) => api.delete(`/cvs/${id}`),
};
