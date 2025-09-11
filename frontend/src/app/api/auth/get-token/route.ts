import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const access_token = req.cookies.get('access_token')?.value;
	const refresh_token = req.cookies.get('refresh_token')?.value;

	if (!access_token) {
		return NextResponse.json({ message: 'Chưa đăng nhập hoặc token hết hạn' }, { status: 401 });
	}

	return NextResponse.json({ access_token, refresh_token });
}
