'use client';

import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, User, Globe, Moon, Sun, Eye, Computer } from 'lucide-react';

export default function SettingsPage() {
	return (
		<Card>
			<div className='space-y-6'>
				<CardTitle className='mb-4'>Cài đặt tài khoản</CardTitle>
				<div className='space-y-6'>
					<div className='pb-6 border-b'>
						<h3 className='flex items-center gap-2 font-semibold mb-4'>
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

					<div className='space-y-8'>
						{/* Thông báo */}
						<div className='pb-6 border-b'>
							<h3 className='flex items-center gap-2 font-semibold mb-4'>
								<Bell className='w-5 h-5' />
								Cài đặt thông báo
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<p className='font-medium'>Thông báo qua email</p>
										<p className='text-sm text-muted-foreground'>Nhận thông báo về tin nhắn và phỏng vấn qua email</p>
									</div>
									<Switch />
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<p className='font-medium'>Thông báo trên trình duyệt</p>
										<p className='text-sm text-muted-foreground'>Hiển thị thông báo trên trình duyệt</p>
									</div>
									<Switch defaultChecked />
								</div>
							</div>
						</div>

						{/* Hiển thị */}
						<div className='space-y-4 border-b pb-8'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium'>Chế độ tối</p>
									<p className='text-sm text-muted-foreground'>Thay đổi giao diện sang tối/sáng</p>
								</div>
								<Select defaultValue='light'>
									<SelectTrigger className='w-[140px]'>
										<SelectValue placeholder='Chọn chế độ' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='light'>
											<div className='flex items-center gap-2'>
												<Sun className='w-4 h-4' />
												Sáng
											</div>
										</SelectItem>
										<SelectItem value='dark'>
											<div className='flex items-center gap-2'>
												<Moon className='w-4 h-4' />
												Tối
											</div>
										</SelectItem>
										<SelectItem value='system'>
											<div className='flex items-center gap-2'>
												<Computer className='w-4 h-4' />
												Theo hệ thống
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Ngôn ngữ */}
						<div>
							<h3 className='flex items-center gap-2 font-semibold mb-4'>
								<Globe className='w-5 h-5' />
								Ngôn ngữ
							</h3>
							<div className='max-w-xs'>
								<Select defaultValue='vi'>
									<SelectTrigger>
										<SelectValue placeholder='Chọn ngôn ngữ' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='vi'>Tiếng Việt</SelectItem>
										<SelectItem value='en'>English</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex justify-end gap-2'>
				<Button variant='outline'>Hủy</Button>
				<Button>Lưu thay đổi</Button>
			</div>
		</Card>
	);
}
