import { api } from '@/lib/axios';
import { CVReq, CVRes } from '@/schema/cv.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const cvService = {
	upload: (file: File, title: string) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', title);
		return api.post<CVRes>('/cvs/upload', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
	create: (req: CVReq) => api.post<CVRes>('/cvs/create', req),
	me: (query: any) => api.post<PaginationRes<CVRes>>('/cvs/me', query),
	getAll: (query: any) => api.post<PaginationRes<CVRes>>('/cvs/list', query),
	getById: (id: number) => api.get<CVRes>(`/cvs/${id}`),
	update: (id: number, req: CVReq) => api.patch<CVRes>(`/cvs/${id}`, req),
	delete: (id: number) => api.delete<string>(`/cvs/${id}`),
};
