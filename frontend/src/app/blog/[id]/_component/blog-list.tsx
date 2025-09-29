'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaClock } from 'react-icons/fa6';
import { ArrowRight } from 'lucide-react';

interface Blog {
	id: number;
	title: string;
	description: string;
	date: string;
	image: string;
	href: string;
}

const blogs: Blog[] = [
	{
		id: 1,
		title: 'Hành trình trở thành Backend Developer',
		description: 'Chia sẻ lộ trình, kiến thức và kỹ năng cần thiết để trở thành backend developer chuyên nghiệp.',
		date: '20/09/2025',
		image: '/blog.png',
		href: '/blog/backend-journey',
	},
	{
		id: 2,
		title: 'Hiểu về RESTful API',
		description: 'Tìm hiểu các nguyên tắc thiết kế API và cách xây dựng API chuẩn REST.',
		date: '18/09/2025',
		image: '/blog.png',
		href: '/blog/restful-api',
	},
	{
		id: 3,
		title: 'GraphQL cho người mới bắt đầu',
		description: 'So sánh GraphQL với REST và cách áp dụng trong dự án thực tế.',
		date: '15/09/2025',
		image: '/blog.png',
		href: '/blog/graphql-intro',
	},
	{
		id: 4,
		title: 'Tối ưu cơ sở dữ liệu',
		description: 'Các kỹ thuật tối ưu query, indexing và thiết kế schema hiệu quả.',
		date: '10/09/2025',
		image: '/blog.png',
		href: '/blog/db-optimization',
	},
];

export default function BlogList() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			{blogs.map(blog => (
				<Card key={blog.id} className='gap-0 flex flex-col hover:shadow-lg transition-shadow duration-300 p-0 cursor-pointer'>
					<div className='h-40 w-full overflow-hidden rounded-t-xl'>
						<img src={blog.image} alt={blog.title} className='h-full w-full object-cover hover:scale-110 transition-transform duration-300' />
					</div>
					<CardContent className='flex flex-col flex-1 pb-5 p-4 space-y-1'>
						<h3 className='font-semibold text-lg line-clamp-2 hover:text-primary'>{blog.title}</h3>
						<span className='text- text-gray-500 flex gap-2 items-center '>
							<FaClock></FaClock>
							{blog.date}
						</span>
						<p className=' text-gray-600 line-clamp-2 flex-1'>{blog.description}</p>
						<Link href={blog.href} className='flex items-center justify-end gap-2  hover:text-primary w-full text-right text-primary font-medium mt-2'>
							Đọc thêm
							<ArrowRight className='size-5' />
						</Link>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
