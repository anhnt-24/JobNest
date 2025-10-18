import { api, nextApi } from '@/lib/axios';
import { AuthResponse, CompanyRegisterReq, LoginReq, RegisterReq } from '@/schema/auth.schema';
import { UserRes } from '@/schema/user.schema';

export const authService = {
	login: (req: LoginReq) => api.post<AuthResponse>('/auth/login', req),
	logoutNext: () => nextApi.post<string>('/auth/logout'),
	logout: () => api.post<string>('/auth/logout'),
	refresh: () => api.post<AuthResponse>('/auth/refresh'),
	findOne: (id: number) => api.get(`/auth/${id}`),
	candidateRegister: (data: RegisterReq) => api.post<AuthResponse>('/auth/register', data),
	setAuth: (access_token: string, refresh_token: string) => nextApi.post<AuthResponse>('/auth/store-token', { access_token, refresh_token }),
	getToken: () => nextApi.get<AuthResponse>('/auth/get-token'),
	companyRegister: (data: CompanyRegisterReq) => api.post<AuthResponse>('/auth/company-register', data),
	employerRegister: (data: any) => api.post<AuthResponse>('/auth/employer-register', data),
	me: () => api.get<UserRes>('/auth/me'),
};
