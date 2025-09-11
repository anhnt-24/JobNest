'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Lock, User, Globe, Moon, Sun, Eye } from 'lucide-react';

export default function SettingsPage() {
	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			<div className='bg-white p-6 rounded-lg border shadow-sm'>
				<h2 className='text-xl font-semibold mb-6'>Cài đặt tài khoản</h2>

				{/* Thông tin cá nhân */}
				<div className='space-y-6'>
					<div className='pb-6 border-b'>
						<h3 className='flex items-center gap-2 font-medium mb-4'>
							<User className='w-5 h-5' />
							Thông tin cá nhân
						</h3>
						<div className='grid gap-4 max-w-md'>
							<div>
								<label className='block text-sm mb-2'>Ảnh đại diện</label>
								<div className='flex items-center gap-4'>
									<div className='w-20 h-20 rounded-full bg-gray-200'></div>
									<Button variant='outline'>Thay đổi ảnh</Button>
								</div>
							</div>
							<div>
								<label className='block text-sm mb-2'>Họ và tên</label>
								<Input type='text' placeholder='Nhập họ và tên' />
							</div>
							<div>
								<label className='block text-sm mb-2'>Email</label>
								<Input type='email' placeholder='your@email.com' />
							</div>
							<div>
								<label className='block text-sm mb-2'>Số điện thoại</label>
								<Input type='tel' placeholder='Nhập số điện thoại' />
							</div>
						</div>
					</div>

					{/* Bảo mật */}
					<div className='pb-6 border-b'>
						<h3 className='flex items-center gap-2 font-medium mb-4'>
							<Lock className='w-5 h-5' />
							Bảo mật
						</h3>
						<div className='grid gap-4 max-w-md'>
							<div>
								<label className='block text-sm mb-2'>Mật khẩu hiện tại</label>
								<Input type='password' placeholder='••••••••' />
							</div>
							<div>
								<label className='block text-sm mb-2'>Mật khẩu mới</label>
								<Input type='password' placeholder='••••••••' />
							</div>
							<div>
								<label className='block text-sm mb-2'>Xác nhận mật khẩu mới</label>
								<Input type='password' placeholder='••••••••' />
							</div>
							<Button className='w-fit'>Đổi mật khẩu</Button>
						</div>
					</div>

					{/* Thông báo */}
					<div className='pb-6 border-b'>
						<h3 className='flex items-center gap-2 font-medium mb-4'>
							<Bell className='w-5 h-5' />
							Cài đặt thông báo
						</h3>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium'>Thông báo qua email</p>
									<p className='text-sm text-gray-500'>Nhận thông báo về tin nhắn và phỏng vấn qua email</p>
								</div>
								<div className='h-6 w-11 bg-gray-200 rounded-full relative cursor-pointer'>
									<div className='h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow'></div>
								</div>
							</div>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium'>Thông báo trên trình duyệt</p>
									<p className='text-sm text-gray-500'>Hiển thị thông báo trên trình duyệt</p>
								</div>
								<div className='h-6 w-11 bg-blue-500 rounded-full relative cursor-pointer'>
									<div className='h-5 w-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow'></div>
								</div>
							</div>
						</div>
					</div>

					{/* Hiển thị */}
					<div className='pb-6 border-b'>
						<h3 className='flex items-center gap-2 font-medium mb-4'>
							<Eye className='w-5 h-5' />
							Hiển thị
						</h3>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium'>Chế độ tối</p>
									<p className='text-sm text-gray-500'>Thay đổi giao diện sang tối/sáng</p>
								</div>
								<Button variant='outline' className='gap-2'>
									<Sun className='w-4 h-4' />
									Sáng
								</Button>
							</div>
						</div>
					</div>

					{/* Ngôn ngữ */}
					<div>
						<h3 className='flex items-center gap-2 font-medium mb-4'>
							<Globe className='w-5 h-5' />
							Ngôn ngữ
						</h3>
						<div className='max-w-xs'>
							<select className='w-full p-2 border rounded-md'>
								<option value='vi'>Tiếng Việt</option>
								<option value='en'>English</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className='flex justify-end gap-4'>
				<Button variant='outline'>Hủy</Button>
				<Button>Lưu thay đổi</Button>
			</div>
		</div>
	);
}
