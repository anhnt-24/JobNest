'use client';
import { api, nextApi, tokenStorage } from '@/lib/axios';
import { authService } from '@/service/auth.service';
import { useRouter } from 'next/navigation';
import { createContext, useState, ReactNode, useEffect, useLayoutEffect, Dispatch } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
	user: any;
	login: (email: string, password: string) => Promise<void>;
	candidateRegister: (data: any) => Promise<void>;
	companyRegister: (data: any) => Promise<void>;
	logout: () => Promise<void>;
	setUser: Dispatch<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any | null>(null);
	const router = useRouter();
	useLayoutEffect(() => {
		const loadUser = async () => {
			try {
				const data = await authService.me();
				setUser(data.data);
			} catch (err) {}
		};
		loadUser();
	}, []);
	const login = async (email: string, password: string) => {
		try {
			const res = await authService.login(email, password);
			const { access_token, refresh_token, user } = res.data;
			await authService.setAuth(access_token, refresh_token);
			setUser(user);
			toast.success('Đăng nhập thành công.');
			router.replace('/');
		} catch {}
	};
	const candidateRegister = async (data: any) => {
		try {
			const res = await authService.candidateRegister(data);
			const { access_token, refresh_token, user } = res.data;
			await authService.setAuth(access_token, refresh_token);
			setUser(user);
			toast.success('Đăng kí thành công.');
			router.replace('/');
		} catch {}
		{
			toast.error('Email đã tồn tại.');
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

		tokenStorage.acessToken = '';
		tokenStorage.refreshToken = '';
	};

	return <AuthContext.Provider value={{ user, setUser, login, logout, candidateRegister, companyRegister }}>{children}</AuthContext.Provider>;
};
