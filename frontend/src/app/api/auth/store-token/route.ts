// app/api/auth/store-token/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { access_token, refresh_token } = body;

	if (!access_token || !refresh_token) {
		return NextResponse.json({ message: 'Thiếu token' }, { status: 400 });
	}

	const accessCookie = serialize('access_token', access_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 5 phút
	});

	const refreshCookie = serialize('refresh_token', refresh_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 7 ngày
	});

	const res = NextResponse.json({ message: 'Đã lưu token vào cookie' });
	res.headers.set('Set-Cookie', [accessCookie, refreshCookie].join(', '));

	return res;
}
