'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import useSWR from 'swr';
import { employerService } from '@/service/employer.service';
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram, FaPencil } from 'react-icons/fa6';

const InfoItem = ({ label, value }: { label: string; value?: string | number }) => (
	<div>
		<p className=' text-gray-500'>{label}</p>
		<p className='font-medium text-lg'>{value || '-'}</p>
	</div>
);

const ProfilePage = () => {
	const { data, isLoading } = useSWR('/employer/me', () => employerService.me().then(res => res.data));

	if (isLoading) return <div>Đang tải...</div>;

	return (
		<Card>
			<Card className='p-6'>
				<div className='flex items-center gap-4'>
					<Avatar className='size-24'>
						<AvatarImage src={data.avatarUrl} />
						<AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<h2 className='text-2xl font-bold'>{data.name}</h2>
						<p className='text-gray-500'>
							{data.position} • {data.address}
						</p>
					</div>
				</div>
			</Card>

			{/* Thông tin cá nhân */}
			<Card>
				<div className='flex items-center justify-between '>
					<CardTitle>Thông tin cá nhân</CardTitle>
					<Button variant='outline'>
						<FaPencil></FaPencil>Chỉnh sửa
					</Button>
				</div>
				<div className='grid grid-cols-2 gap-6'>
					<div className='grid grid-cols-2 gap-6'>
						<InfoItem label='Họ và tên' value={data.name} />
						<InfoItem label='Mã nhân viên' value={data.employeeId} />
						<InfoItem label='Giới tính' value={data.gender} />
						<InfoItem label='Ngày sinh' value={new Date(data.dob).toLocaleDateString('vi-VN')} />
						<InfoItem label='Số điện thoại' value={data.phone} />
						<InfoItem label='Email' value={data.user.email} />
					</div>
				</div>
			</Card>

			<Card>
				<CardTitle>Công ty</CardTitle>
				<div className='flex items-center gap-4'>
					<Avatar className='size-24'>
						<AvatarImage src={data.company.user.avatarUrl} />
						<AvatarFallback>{data.company?.user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<h2 className='text-xl font-semibold'>{data.company?.user.name}</h2>
						<p className='text-gray-500'>{data.company.industry}</p>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-6'>
					<div className='grid grid-cols-2 gap-6'>
						<InfoItem label='Website' value={data.company.website} />
						<InfoItem label='Số điện thoại' value={data.company.phone} />
						<InfoItem label='Quy mô nhân sự' value={data.company.employeeCount.toLocaleString('vi-VN')} />
						<InfoItem label='Địa chỉ' value={`${data.company.addressDetail}, ${data.company.ward}, ${data.company.district}, ${data.company.province}`} />
					</div>
				</div>
			</Card>
		</Card>
	);
};

export default ProfilePage;
