'use client';

import { useState } from 'react';
import { CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaEnvelope, FaFile, FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import { FaGlobeAmericas, FaSave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { AutosizeTextarea } from '@/components/ui/custom/autosize-textarea';

export default function CVA4() {
	const [avatar, setAvatar] = useState('/image.png');

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const fileUrl = URL.createObjectURL(e.target.files[0]);
			setAvatar(fileUrl);
		}
	};

	return (
		<div className=' flex justify-center gap-6 relative'>
			<div className='bg-white max-w-5xl grid grid-cols-12 gap-2 border shadow-sm '>
				<aside className='col-span-4 text-white overflow-hidden '>
					<div className='flex flex-col bg-primary p-6 items-center space-y-4 w-full relative'>
						<Avatar className='size-full border-4 border-white'>
							<AvatarImage src={avatar} alt='Avatar' />
							<AvatarFallback>NA</AvatarFallback>
						</Avatar>
						<p className='text-2xl font-semibold text-center'>Nguyễn Tuấn Anh</p>
						<p className='text-lg text-center'>Software Engineer</p>
					</div>

					<div className='hidden size-0'>
						<input type='file' accept='image/*' onChange={handleUpload} className='text-sm absolute hidden' />
					</div>

					<div className='space-y-6 p-6 bg-[#004933] h-full'>
						{/* Thông tin cá nhân */}
						<div className='space-y-2'>
							<h2 className='font-semibold text-xl mb-3'>Thông tin cá nhân</h2>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaUser className='size-4' />
								</div>
								<span>Nam</span>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaPhone className='size-4' />
								</div>
								<span>0123454789</span>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaEnvelope className='size-4' />
								</div>
								<span>tech.growth@topcv.vn</span>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaGlobeAmericas className='size-4' />
								</div>
								<span>facebook.com/</span>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaLocationDot className='size-4' />
								</div>
								<span>Ba Đình, Hà Nội</span>
							</p>
						</div>

						{/* Kỹ năng */}
						<div>
							<h2 className='font-semibold text-xl mb-3'>Kỹ năng</h2>
							<ul className='list-disc px-4 space-y-1'>
								<li>
									<p>Kỹ năng Digital Marketing</p>
								</li>
								<li>
									<p>Kỹ năng Digital Marketing</p>
								</li>
							</ul>
						</div>

						{/* Chứng chỉ */}
						<div>
							<h2 className='font-semibold text-xl mb-3'>Chứng chỉ</h2>
							<ul className='space-y-1 pl-1'>
								<li className='flex gap-4'>
									<p className='font-semibold max-w-18'>2025</p>
									<p className='flex-1'>Toeic 900</p>
								</li>
							</ul>
						</div>
					</div>
				</aside>

				{/* Nội dung chính */}
				<section className='col-span-8 space-y-6 p-4'>
					{/* Mục tiêu nghề nghiệp */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Mục tiêu nghề nghiệp</CardTitle>
						<p>
							Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing,
							E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.
						</p>
					</div>

					{/* Học vấn */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Học vấn và Giải thưởng</CardTitle>
						<ul className='space-y-4'>
							<li>
								<div className='flex items-center gap-4 font-semibold'>
									<div className='size-2 rounded-full bg-gray-700'></div>
									<p className='flex-1'>Học viện Công nghệ Bưu chính Viễn Thông</p>
									<p className='ml-auto font-normal text-right max-w-40'>2022 - Hiện tại</p>
								</div>
								<div className='pl-1'>
									<div className='border-l pl-4 border-gray-500'>
										<p>
											Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email
											Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					{/* Dự án */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Dự án</CardTitle>
						<ul className='space-y-4'>
							<li className='space-y-1'>
								<div className='flex items-center gap-4 font-semibold'>
									<p className='flex-1'>Học viện Công nghệ Bưu chính Viễn Thông</p>
									<p className='ml-auto font-normal text-right max-w-40'>2022 - Hiện tại</p>
								</div>
								<p>
									Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing,
									E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.
								</p>
							</li>
						</ul>
					</div>

					{/* Kinh nghiệm làm việc */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Kinh nghiệm làm việc</CardTitle>

						<div className='space-y-4'>
							<div>
								<div className='flex items-center gap-4 font-semibold'>
									<p className='flex-1'>Học viện Công nghệ Bưu chính Viễn Thông</p>
									<p className='ml-auto font-normal text-right max-w-40'>2022 - Hiện tại</p>
								</div>
								<p className='italic w-full'>Công ty BCD TopCV</p>
								<p>
									Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing,
									E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.
								</p>
							</div>

							<div>
								<div className='flex items-center gap-4 font-semibold'>
									<p className='flex-1'>Học viện Công nghệ Bưu chính Viễn Thông</p>
									<p className='ml-auto font-normal text-right max-w-40'>2022 - Hiện tại</p>
								</div>
								<p className='italic w-full'>Công ty ABC TopCV</p>
								<p>
									Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing,
									E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
