'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const blogs = [
	{
		id: 1,
		title: 'Top 40+ câu hỏi phỏng vấn Lambda AWS từ cơ bản đến nâng cao',
		desc: 'Nếu bạn đang chuẩn bị ứng tuyển cho vị trí DevOps, Cloud Engineer hoặc Software Developer...',
		image: '/blog.png',
		tag: 'Phỏng vấn IT',
		time: '30 phút',
	},
	{
		id: 2,
		title: 'Top 30+ câu hỏi phỏng vấn DevSecOps Engineer phổ biến',
		desc: 'DevSecOps Engineer đang là một trong những vị trí được săn đón nhất trong ngành IT hiện nay...',
		image: '/blog.png',

		tag: 'Phỏng vấn IT',
		time: '27 phút',
	},
	{
		id: 3,
		title: 'Vietnam IT Recruitment Market Overview in Q2 2025',
		desc: "This article is part of the 'Vietnam IT Market Insight' analysis series...",
		image: '/blog.png',

		tag: 'Xu hướng tuyển dụng IT',
		time: '2 phút',
	},
	{
		id: 4,
		title: 'Top 20 câu hỏi phỏng vấn Backend Developer phổ biến',
		desc: 'Backend Developer đóng vai trò quan trọng trong việc xây dựng hệ thống vững chắc...',
		image: '/blog.png',

		tag: 'Phỏng vấn IT',
		time: '25 phút',
	},
	{
		id: 5,
		title: 'Top 20 câu hỏi phỏng vấn Backend Developer phổ biến',
		desc: 'Backend Developer đóng vai trò quan trọng trong việc xây dựng hệ thống vững chắc...',
		image: '/blog.png',

		tag: 'Phỏng vấn IT',
		time: '25 phút',
	},
	{
		id: 6,
		title: 'Top 20 câu hỏi phỏng vấn Backend Developer phổ biến',
		desc: 'Backend Developer đóng vai trò quan trọng trong việc xây dựng hệ thống vững chắc...',
		image: '/blog.png',

		tag: 'Phỏng vấn IT',
		time: '25 phút',
	},
];

export default function BlogList({ title }: { title: string }) {
	return (
		<div className='w-full mt-6 max-w-7xl mx-auto'>
			<div className='flex items-center justify-between mb-4'>
				<CardTitle>{title}</CardTitle>
				<a href='#' className='border-b border-green-600 text-primary text-lg font-semibold '>
					Xem tất cả
				</a>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{blogs.map(blog => (
					<Card key={blog.id} className='overflow-hidden  p-0 gap-2'>
						<div className='relative w-full h-64'>
							<Image src={blog.image} alt={blog.title} fill className='object-cover' />
						</div>
						<div className='px-4 space-y-1 flex flex-col flex-1'>
							<p className='font-bold text-xl line-clamp-2'>{blog.title}</p>
							<p className=' text-gray-600 line-clamp-3'>{blog.desc}</p>
							<div className='flex items-center justify-between flex-1 '>
								<a href='#' className='text-base text-primary font-semibold  hover:underline flex items-center mt-auto mb-4'>
									Bắt đầu đọc ({blog.time}) →
								</a>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
