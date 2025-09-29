import { api } from '@/lib/axios';

export const employerService = {
	me: () => api.get('/employer/me'),

	findOne: (id: number) => api.get(`/employer/${id}`),

	remove: (id: number) => api.delete(`/employer/${id}`),

	getAll: (query: any) => api.post('/employer/get', query),

	getAllByCompany: (query?: any) => api.post('/employer/get-by-company', query),

	update: (data: any) => api.put('/employer/update', data),

	uploadAvatar: (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file);
		return api.patch('/employer/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
