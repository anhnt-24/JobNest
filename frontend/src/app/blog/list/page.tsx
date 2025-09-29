'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import CustomPagination from '@/components/candidate/custom-pagination';
import { FaSort } from 'react-icons/fa6';
import useSWR from 'swr';
import { postService } from '@/service/post.service';
import { ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';

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

export default function AllBlogsPage() {
	const [sortBy, setSortBy] = useState('newest');
	const [page, setPage] = useState(1);
	const perPage = 4;
	const { data: posts } = useSWR('blogs', () => postService.getAll({}).then(res => res.data));
	const sortedBlogs = [...blogs].sort((a, b) => {
		if (sortBy === 'newest') return b.id - a.id;
		if (sortBy === 'oldest') return a.id - b.id;
		return 0;
	});
	const totalPages = Math.ceil(sortedBlogs.length / perPage);
	const paginatedBlogs = sortedBlogs.slice((page - 1) * perPage, page * perPage);

	return (
		<div className='w-full mt-6 max-w-7xl mx-auto'>
			{/* Header */}
			<div className='flex items-center justify-between mb-4'>
				<CardTitle>Tất cả Blog</CardTitle>
				<div className='border rounded-lg flex items-center pl-2'>
					<div className='font-semibold text-base text-primary flex gap-2 items-center'>
						<FaSort></FaSort>
						Sắp xếp theo:{' '}
					</div>
					<Select value={sortBy} onValueChange={value => setSortBy(value)}>
						<SelectTrigger className='w-[120px] border-0 font-medium'>
							<SelectValue placeholder='Sắp xếp theo' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='newest'>Mới nhất</SelectItem>
							<SelectItem value='oldest'>Cũ nhất</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Blog grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{posts?.items?.map(post => (
					<Link href={`/blog/${post.id}`}>
						<Card key={post.id} className='overflow-hidden p-0 gap-2'>
							<AspectRatio ratio={16 / 9}>
								<Image src={post.thumbnail} alt={post.title} fill className=' object-cover' />
							</AspectRatio>
							<div className='px-4 space-y-1 flex flex-col flex-1'>
								<p className='font-bold text-xl  line-clamp-2'>{post.title}</p>
								<p className='text-gray-600 text-base line-clamp-3'>{post.excerpt}</p>
								<div className='flex items-center justify-between flex-1'>
									<a href='#' className='text-base text-primary font-semibold hover:underline flex items-center mt-auto mb-4'>
										Bắt đầu đọc <ChevronRight className=''></ChevronRight>
									</a>
								</div>
							</div>
						</Card>
					</Link>
				))}
			</div>
			<div className='mt-6'>
				<CustomPagination></CustomPagination>
			</div>
		</div>
	);
}
