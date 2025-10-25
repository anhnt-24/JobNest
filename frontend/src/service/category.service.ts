import { api } from '@/lib/axios';
import { CategoryRes, CategoryReq } from '@/schema/category.schema';

export const categoryService = {
	create: (req: CategoryReq) => api.post<CategoryRes>('/categories/create', req),
	findAll: () => api.post<CategoryRes[]>('/categories/list'),
	getById: (id: number) => api.get<CategoryRes>(`/categories/${id}`),
	update: (id: number, req: CategoryReq) => api.put<CategoryRes>(`/categories/${id}`, req),
	delete: (id: number) => api.delete(`/categories/${id}`),
};
