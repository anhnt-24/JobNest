import { api, nextApi } from '@/lib/axios';

export const authService = {
	login: (email: string, password: string) => api.post('/auth/login', { email, password }),
	logoutNext: () => nextApi.post('/auth/logout'),
	logout: () => api.post('/auth/logout'),
	refresh: () => api.post('/auth/refresh'),
	candidateRegister: (data: any) => api.post('/auth/register', data),
	setAuth: (access_token: string, refresh_token: string) => nextApi.post('/auth/store-token', { access_token, refresh_token }),
	getToken: () => nextApi.get('/auth/get-token'),
	companyRegister: (data: any) => api.post('/auth/company-register', data),
	employerRegister: (data: any) => api.post('/auth/employer-register', data),

	me: () => api.get('/auth/me'),
};
