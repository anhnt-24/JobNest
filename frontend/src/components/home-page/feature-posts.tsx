'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface Post {
	id: number;
	title: string;
	description: string;
	image: string;
	link: string;
}

const posts: Post[] = [
	{
		id: 1,
		title: 'Thực trạng ứng dụng AI và Tuyển dụng IT tại Việt Nam 2025',
		description: "Dựa trên báo cáo 'Thực Trạng Ứng Dụng AI & Tuyển Dụng IT tại Việt Nam 2025' của ITviec, dưới đây là 7 điểm then chốt...",
		image: '/blog.png',
		link: '#',
	},
	{
		id: 2,
		title: 'Top 30+ câu hỏi phỏng vấn Docker phổ biến',
		description: 'Top 30+ câu hỏi phỏng vấn Docker từ cơ bản đến nâng cao',
		image: '/blog.png',
		link: '#',
	},
	{
		id: 3,
		title: 'Top 30+ câu hỏi phỏng vấn jQuery thường gặp',
		description: 'Top 30+ câu hỏi phỏng vấn jQuery thường gặp mọi cấp độ',
		image: '/blog.png',
		link: '#',
	},
	{
		id: 4,
		title: 'Cách tuỳ chỉnh Slider trong Bootstrap',
		description: 'Hướng dẫn sử dụng Carousel Bootstrap chi tiết kèm ví dụ',
		image: '/blog.png',
		link: '#',
	},
	{
		id: 5,
		title: 'Null vs undefined trong JavaScript',
		description: 'Cách phân biệt và xử lý null vs undefined trong JavaScript',
		image: '/blog.png',
		link: '#',
	},
];

export default function FeaturedPosts() {
	return (
		<div className='max-w-7xl mx-auto space-y-4 py-6 '>
			<div className='flex items-center justify-between '>
				<h1>Bài viết nổi bật</h1>
				<Link href='#' className='flex items-center  font-semibold text-primary hover:text-primary'>
					Xem tất cả
					<ChevronRight></ChevronRight>
				</Link>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
				<Card className='lg:col-span-2 p-0  overflow-hidden gap-0'>
					<div className='h-80 overflow-hidden'>
						<Image src={posts[0].image} alt={posts[0].title} width={800} height={800} className='w-full h-full object-cover hover:scale-110 transition' />
					</div>
					<div className='p-4 flex flex-col flex-1 '>
						<Link href={''} className=' text-2xl font-semibold'>
							{posts[0].title}
						</Link>
						<p className='text-gray-400'>{posts[0].description}</p>
						<Link href={posts[0].link} className='text-primary hover:underline font-semibold text-lg hover:text-primary  mt-auto'>
							Bắt đầu đọc <ChevronRight className='inline size-6'></ChevronRight>
						</Link>
					</div>
				</Card>

				<div className='grid grid-cols-1 col-span-2 sm:grid-cols-2 gap-4'>
					{posts.slice(1).map(post => (
						<Card key={post.id} className='p-0 gap-0 overflow-hidden'>
							<div className='h-40 overflow-hidden'>
								<Image src={post.image} alt={post.title} width={400} height={400} className=' w-full h-full  object-cover hover:scale-110 transition' />
							</div>
							<div className=' flex flex-col  p-2 space-y-1'>
								<Link href={''} className='font-semibold text-lg'>
									{post.title}
								</Link>
							</div>
							<Link href={post.link} className=' mt-auto font-semibold text-primary hover:underline p-2 pt-0'>
								Bắt đầu đọc <ChevronRight className='inline size-5'></ChevronRight>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
