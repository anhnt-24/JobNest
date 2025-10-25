import { api } from '@/lib/axios';

export const postService = {
	create: (data: any) => api.post<any>('/posts', data),
	getAll: (query: any) => api.post<{ items: any[]; meta: any }>('/posts/get', query),
	getById: (id: number) => api.get<any>(`/posts/${id}`),
	update: (id: number, data: any) => api.put<any>(`/posts/${id}`, data),
	delete: (id: number) => api.delete<string>(`/posts/${id}`),
	uploadThumbnail: (id: number, file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		return api.patch<string>(`/posts/${id}/thumbnail`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
};
