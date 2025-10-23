'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { FaSave } from 'react-icons/fa';

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		notifyEmail: true,
		notifySMS: false,
		notifyInApp: true,
		primaryColor: '#15803d',
		enable2FA: false,
		restrictIP: false,
		sessionTimeout: 30,
		password: '',
		confirmPassword: '',
	});

	const handleChange = (field: string, value: any) => {
		setSettings(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = () => {
		console.log('Saved settings:', settings);
		alert('✅ Cài đặt đã được lưu');
	};

	return (
		<Card className='p-6 space-y-2'>
			<Card>
				<CardHeader>
					<CardTitle>Thông báo</CardTitle>
					<CardDescription className='text-gray-600'>Quản lý cách bạn và nhân viên nhận thông tin từ hệ thống.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label>Email</Label>
						<Switch checked={settings.notifyEmail} onCheckedChange={v => handleChange('notifyEmail', v)} />
					</div>
					<div className='flex items-center justify-between'>
						<Label>SMS</Label>
						<Switch checked={settings.notifySMS} onCheckedChange={v => handleChange('notifySMS', v)} />
					</div>
					<div className='flex items-center justify-between'>
						<Label>Trong ứng dụng</Label>
						<Switch checked={settings.notifyInApp} onCheckedChange={v => handleChange('notifyInApp', v)} />
					</div>
				</CardContent>
			</Card>

			{/* Giao diện */}
			<Card>
				<CardHeader>
					<CardTitle>Giao diện & hiển thị</CardTitle>
					<CardDescription>Tùy chỉnh giao diện hệ thống để phù hợp với thương hiệu công ty.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-6'>
					{/* Màu chủ đạo */}
					<div className='flex items-center justify-between'>
						<Label>Màu chủ đạo</Label>
						<Input type='color' value={settings.primaryColor} onChange={e => handleChange('primaryColor', e.target.value)} className='w-16 h-10 p-1' />
					</div>

					{/* Dark mode */}
					<div className='flex items-center justify-between'>
						<Label>Chế độ tối (Dark mode)</Label>
						<Switch checked={settings.darkMode} onCheckedChange={v => handleChange('darkMode', v)} />
					</div>

					{/* Ngôn ngữ */}
					<div className='flex justify-between items-center'>
						<Label>Ngôn ngữ hiển thị</Label>
						<Select value={settings.language} onValueChange={v => handleChange('language', v)}>
							<SelectTrigger className='w-80'>
								<SelectValue placeholder='Chọn ngôn ngữ' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='vi'>Tiếng Việt</SelectItem>
								<SelectItem value='en'>English</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Bảo mật */}
			<Card>
				<CardHeader>
					<CardTitle>Bảo mật</CardTitle>
					<CardDescription>Tăng cường bảo mật tài khoản và truy cập hệ thống.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label>Kích hoạt xác thực 2 lớp (2FA)</Label>
						<Switch checked={settings.enable2FA} onCheckedChange={v => handleChange('enable2FA', v)} />
					</div>
					<div className='flex items-center justify-between'>
						<Label>Giới hạn theo IP</Label>
						<Switch checked={settings.restrictIP} onCheckedChange={v => handleChange('restrictIP', v)} />
					</div>
				</CardContent>
			</Card>

			{/* Tài khoản */}
			<Card>
				<CardHeader>
					<CardTitle>Tài khoản</CardTitle>
					<CardDescription>Quản lý mật khẩu và thông tin đăng nhập của bạn.</CardDescription>
				</CardHeader>
				<Button className='w-32'>Đổi mật khẩu</Button>
			</Card>

			<div className='flex justify-end'>
				<Button onClick={handleSave}>
					<FaSave></FaSave>
					Lưu{' '}
				</Button>
			</div>
		</Card>
	);
}
