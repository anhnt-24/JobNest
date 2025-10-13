import { authService } from '@/service/auth.service';
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
});

const nextApi = axios.create({
	baseURL: '/api',
});

class TokenStorage {
	private access_token: string | null = null;
	private refresh_token: string | null = null;
	get acessToken() {
		return this.access_token;
	}
	set acessToken(token: string | null) {
		this.access_token = token;
	}

	get refreshToken() {
		return this.refresh_token;
	}

	set refreshToken(token: string | null) {
		this.refresh_token = token;
	}
}
const tokenStorage = new TokenStorage();
api.interceptors.request.use(async config => {
	if (!tokenStorage.acessToken) {
		try {
			await authService
				.getToken()
				.then(res => {
					tokenStorage.acessToken = res.data.access_token;
					tokenStorage.refreshToken = res.data.refresh_token;
				})
				.catch();
		} catch {}
	}

	config.headers['Authorization'] = `Bearer ${tokenStorage.acessToken || ''}`;

	return config;
});

api.interceptors.response.use(
	res => {
		return res;
	},
	err => {
		return Promise.reject(err);
	}
);

export { api, nextApi, tokenStorage };
