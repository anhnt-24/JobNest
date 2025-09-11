import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
	const expiredAccess = serialize('access_token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	});

	const expiredRefresh = serialize('refresh_token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	});

	const res = NextResponse.json({ message: 'Đăng xuất thành công' });
	res.headers.set('Set-Cookie', [expiredAccess, expiredRefresh].join(','));
	return res;
}
