'use client';
import { api, nextApi, tokenStorage } from '@/lib/axios';
import { CompanyRegisterReq, LoginReq, RegisterReq } from '@/schema/auth.schema';
import { UserRes } from '@/schema/user.schema';
import { authService } from '@/service/auth.service';
import { useRouter } from 'next/navigation';
import { createContext, useState, ReactNode, useEffect, Dispatch } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
	user: UserRes | null;
	login: (req: LoginReq) => Promise<void>;
	candidateRegister: (req: RegisterReq) => Promise<void>;
	companyRegister: (req: CompanyRegisterReq) => Promise<void>;
	logout: () => Promise<void>;
	setUser: Dispatch<UserRes>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserRes | null>(null);
	const router = useRouter();
	useEffect(() => {
		const loadUser = async () => {
			try {
				const data = await authService.me();
				setUser(data.data);
			} catch (err) {}
		};
		loadUser();
	}, []);
	const login = async (req: LoginReq) => {
		try {
			const res = await authService.login(req);
			const { access_token, refresh_token, user } = res.data;
			await authService.setAuth(access_token, refresh_token);
			setUser(user);
			toast.success('Đăng nhập thành công.');
			if (user.role === 'ADMIN') router.replace('/admin/dashboard');
			else if (user.role === 'CANDIDATE') router.replace('/');
			else if (user.role === 'EMPLOYER') router.replace('/employer/dashboard');
			else if (user.role === 'COMPANY') router.replace('/company/dashboard');
		} catch {
			toast.error('Tài khoản hoặc mật khẩu không chính xác.');
			throw new Error('Login failed');
		}
	};
	const candidateRegister = async (req: RegisterReq) => {
		try {
			const res = await authService.candidateRegister(req);
			const { access_token, refresh_token, user } = res.data;
			await authService.setAuth(access_token, refresh_token);
			setUser(user);
			toast.success('Đăng kí thành công.');
			router.replace('/');
		} catch {}
		{
			toast.error('Email đã tồn tại.');
			throw new Error('Register failed');
		}
	};

	const companyRegister = async (data: any) => {
		try {
			const res = await authService.companyRegister(data);
			const { access_token, refresh_token, user } = res.data;
			await authService.setAuth(access_token, refresh_token);
			setUser(user);
			toast.success('Đăng kí thành công.');
			router.replace('/company/dashboard');
		} catch {}

		{
			toast.error('Email đã tồn tại.');
		}
	};

	const logout = async () => {
		await nextApi.post('/auth/logout');
		setUser(null);
		toast.success('Đăng xuất thành công.');
		router.replace('/login');
		tokenStorage.acessToken = '';
		tokenStorage.refreshToken = '';
	};

	return <AuthContext.Provider value={{ user, setUser, login, logout, candidateRegister, companyRegister }}>{children}</AuthContext.Provider>;
};
