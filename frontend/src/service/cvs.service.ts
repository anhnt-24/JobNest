import { api } from '@/lib/axios';

export const cvService = {
	create: (file: File, title: string) => {
		const data = new FormData();
		if (file) data.append('file', file as File);
		data.append('title', title);

		return api.post('/cv/create', data);
	},
	me: (query: any) => api.post('/cv/me', query),
	getAll: (query: any) => api.post('/cv', query),
	getByID: (id: number) => api.get(`/cv/${id}`),
	update: (id: number, data: any) => api.patch(`/cv/${id}`, data),
	delete: (id: number) => api.delete(`/cv/${id}`),
};
