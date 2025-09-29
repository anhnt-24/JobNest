'use client';

import { useState } from 'react';
import { CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaEnvelope, FaFile, FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import { FaGlobeAmericas, FaSave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import FormatToolbar from './_component/format-toolbar';
import { AutosizeTextarea } from '@/components/ui/custom/autosize-textarea';
import CVDialog from './_component/cv-dialog';

export default function CVA4() {
	const [avatar, setAvatar] = useState('/image.png');

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const fileUrl = URL.createObjectURL(e.target.files[0]);
			setAvatar(fileUrl);
		}
	};

	return (
		<div className='my-24 flex justify-center gap-6 relative'>
			{/* giữ nguyên CSS của bạn */}
			<style jsx>{`
				.custom-input,
				input,
				textarea {
					resize: none !important;
					outline: none !important;
					border-radius: 0.25rem; /* rounded-sm */
					border: 1px solid transparent; /* border + border-transparent */
					padding-left: 0.5rem; /* px-2 */
					padding-right: 0.5rem; /* px-2 */
					transition: border 0.2s ease; /* transition */
				}

				.custom-input:hover,
				textarea:hover,
				input:hover {
					border-color: currentColor !important; /* hover:border-current */
					border-style: dashed; /* hover:border-dashed */
				}

				.custom-input:focus,
				textarea:focus,
				input:focus {
					border-style: solid; /* focus:border-solid */
				}
			`}</style>

			<FormatToolbar />

			<div className='bg-white max-w-5xl grid grid-cols-12 gap-2 border shadow-sm '>
				{/* Header */}
				<div className='fixed px-12 items-center justify-between flex h-20 top-17 shadow-sm bg-primary z-10 0 left-0 right-0'>
					<div className='text-yellow-400 flex gap-2 text-2xl items-center font-semibold'>
						<FaFile className='size-8' />
						<input type='text' defaultValue='Fullstack Developer' />
					</div>
					<div className='items-center flex gap-2'>
						<Button variant='secondary' className='font-semibold rounded-full'>
							<X />
							Hủy
						</Button>

						<CVDialog />
						<Button variant='secondary' className='bg-yellow-400 rounded-full !px-6 font-semibold'>
							<FaSave />
							Lưu
						</Button>
					</div>
				</div>

				{/* Sidebar */}
				<aside className='col-span-4 text-white overflow-hidden '>
					<div className='flex flex-col bg-primary p-6 items-center space-y-4 w-full relative'>
						<Avatar className='size-full border-4 border-white'>
							<AvatarImage src={avatar} alt='Avatar' />
							<AvatarFallback>NA</AvatarFallback>
						</Avatar>
						<input
							type='text'
							defaultValue='Nguyễn Tuấn Anh'
							className='text-2xl font-semibold text-center rounded-sm border border-transparent hover:border-current transition hover:border-dashed px-2 focus:border-solid '
						/>
						<input type='text' defaultValue='Software Engineer' className='text-lg text-center' />
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
								<input type='text' defaultValue='Nam' className='flex-1' />
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaPhone className='size-4' />
								</div>
								<input type='text' defaultValue='0123454789' className='flex-1' />
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaEnvelope className='size-4' />
								</div>
								<input type='text' defaultValue='tech.growth@topcv.vn' className='flex-1' />
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaGlobeAmericas className='size-4' />
								</div>
								<input type='text' defaultValue='facebook.com/' className='flex-1' />
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaLocationDot className='size-4' />
								</div>
								<input type='text' defaultValue='Ba Đình, Hà Nội' placeholder='Địa chỉ' className='flex-1' />
							</p>
						</div>

						{/* Kỹ năng */}
						<div>
							<h2 className='font-semibold text-xl mb-3'>Kỹ năng</h2>
							<ul className='list-disc list-inside space-y-1'>
								<li className='flex'>
									<AutosizeTextarea minHeight={6} placeholder='Kỹ năng' defaultValue='Kỹ năng Digital Marketing' className='flex-1 custom-input' />
								</li>
								<li className='flex'>
									<AutosizeTextarea minHeight={6} placeholder='Kỹ năng' defaultValue='Kỹ năng Digital Marketing' className='flex-1 custom-input' />
								</li>
							</ul>
						</div>

						{/* Chứng chỉ */}
						<div>
							<h2 className='font-semibold text-xl mb-3'>Chứng chỉ</h2>
							<ul className='space-y-1 pl-1'>
								<li className='flex gap-4'>
									<input type='text' defaultValue='2025' className='font-semibold max-w-18' />
									<input type='text' defaultValue='Toeic 900' className='flex-1' />
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
						<AutosizeTextarea
							className='custom-input'
							defaultValue='Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.'
						/>
					</div>

					{/* Học vấn */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Học vấn và Giải thưởng</CardTitle>
						<ul className='space-y-4'>
							<li>
								<div className='flex items-center gap-4 font-semibold'>
									<div className='size-2 rounded-full bg-gray-700'></div>
									<input type='text' defaultValue='Học viện Công nghệ Bưu chính Viễn Thông' className='flex-1' />
									<input type='text' defaultValue='2022 - Hiện tại' className='ml-auto font-normal text-right max-w-40' />
								</div>
								<div className='pl-1'>
									<div className='border-l pl-4 border-gray-500'>
										<AutosizeTextarea
											className='custom-input w-full'
											defaultValue='Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.'
										/>
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
									<input type='text' defaultValue='Học viện Công nghệ Bưu chính Viễn Thông' className='flex-1' />
									<input type='text' defaultValue='2022 - Hiện tại' className='ml-auto font-normal text-right max-w-40' />
								</div>
								<div>
									<AutosizeTextarea
										className='custom-input w-full'
										defaultValue='Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.'
									/>
								</div>
							</li>
						</ul>
					</div>

					{/* Kinh nghiệm làm việc */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Kinh nghiệm làm việc</CardTitle>

						<div className='space-y-4'>
							<div>
								<div className='flex items-center gap-4 font-semibold'>
									<input type='text' defaultValue='Học viện Công nghệ Bưu chính Viễn Thông' className='flex-1' />
									<input type='text' defaultValue='2022 - Hiện tại' className='ml-auto font-normal text-right max-w-40' />
								</div>
								<input type='text' defaultValue='Công ty BCD TopCV' className='italic w-full' />
								<AutosizeTextarea
									className='custom-input w-full'
									defaultValue='Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.'
								/>
							</div>

							<div>
								<div className='flex items-center gap-4 font-semibold'>
									<input type='text' defaultValue='Học viện Công nghệ Bưu chính Viễn Thông' className='flex-1' />
									<input type='text' defaultValue='2022 - Hiện tại' className='ml-auto font-normal text-right max-w-40' />
								</div>
								<input type='text' defaultValue='Công ty ABC TopCV' className='italic w-full' />
								<AutosizeTextarea
									className='custom-input w-full'
									defaultValue='Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.'
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
