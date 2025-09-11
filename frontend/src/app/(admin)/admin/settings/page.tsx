import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Cài đặt</h1>

			<div className='grid gap-4 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Cài đặt chung</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='site-name'>Tên trang web</Label>
							<Input id='site-name' defaultValue='JobBoard' />
						</div>

						<div className='space-y-2'>
							<Label htmlFor='site-description'>Mô tả trang web</Label>
							<Input id='site-description' defaultValue='Nền tảng tìm kiếm việc làm hàng đầu' />
						</div>

						<Button>Lưu thay đổi</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Bảo mật</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label>Đổi mật khẩu</Label>
							<Input type='password' placeholder='Mật khẩu hiện tại' />
							<Input type='password' placeholder='Mật khẩu mới' />
							<Input type='password' placeholder='Xác nhận mật khẩu mới' />
						</div>

						<Button>Đổi mật khẩu</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
