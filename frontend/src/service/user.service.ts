import { api } from '@/lib/axios';
import { UserRes } from '@/schema/user.schema'; // nếu chưa có thì tạo schema tương tự CV
import { PaginationRes } from '@/schema/pagination.schema';

export const userService = {
	getAll: () => api.post<PaginationRes<UserRes>>('/users/list'),
	me: () => api.get<UserRes>('/users/me'),
	getById: (id: number) => api.get<UserRes>(`/users/${id}`),
	delete: (id: number) => api.delete<string>(`/users/${id}`),
	uploadAvatar: (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file);
		return api.patch<string>('/users/avatar', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
	updateActive: (id: number, active: boolean) => api.patch<UserRes>(`/users/${id}/active`, { active }),
	updateVerified: (id: number, verified: boolean) => api.patch<UserRes>(`/users/${id}/verified`, { verified }),
};
