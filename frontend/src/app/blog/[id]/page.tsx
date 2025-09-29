'use client';

import 'github-markdown-css/github-markdown-light.css';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { FaClock, FaEye, FaPen } from 'react-icons/fa6';
import BlogList from './_component/blog-list';
import useSWR from 'swr';
import { postService } from '@/service/post.service';
import { useParams } from 'next/navigation';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
interface TocItem {
	id: string;
	text: string;
	level: number;
}
const content = `

Trong vài năm gần đây, nghề **backend developer** ngày càng được quan tâm. Không chỉ là người đứng sau vận hành hệ thống, backend còn quyết định đến sự ổn định, tốc độ và bảo mật của một ứng dụng.
## Vì sao chọn Backend?

Nếu frontend là bộ mặt của ứng dụng, thì backend chính là "bộ não". Người dùng không nhìn thấy trực tiếp, nhưng mọi thao tác của họ đều được xử lý ở tầng backend.

### Ưu điểm khi làm backend

1. Làm việc với **logic phức tạp** và nhiều bài toán thú vị.  
2. Cơ hội nghiên cứu sâu về **cơ sở dữ liệu**, **bảo mật**, **hiệu năng**.  
3. Lộ trình sự nghiệp rõ ràng, có thể phát triển thành **solution architect** hoặc **devops engineer**.  

## Ngôn ngữ & Framework phổ biến

### JavaScript / TypeScript

- **Node.js**: linh hoạt, cộng đồng mạnh.  
- **NestJS**: opinionated framework, dễ mở rộng và tổ chức code theo module.  

### Python

- **Django**: mạnh về ORM, admin tool tích hợp sẵn.  
- **FastAPI**: tốc độ cao, dễ dùng với OpenAPI.  

### Java

- **Spring Boot**: lựa chọn hàng đầu trong hệ thống enterprise.  

## Kiến thức cốt lõi cần nắm

### 1. Cơ sở dữ liệu

- SQL: MySQL, PostgreSQL.  
- NoSQL: MongoDB, Redis.  
- Thiết kế schema, tối ưu query.  

### 2. API

- RESTful API.  
- GraphQL.  
- Authentication: JWT, OAuth2.  

### 3. Hệ thống phân tán

- Message queue: Kafka, RabbitMQ.  
- Caching: Redis, Memcached.  
- Scaling: horizontal vs vertical.  

## Học như thế nào?

### Bước 1: Nắm chắc một ngôn ngữ

Chọn một ngôn ngữ chính, ví dụ **TypeScript**, và thực hành thật nhiều.  

### Bước 2: Xây dựng project nhỏ

- Blog API.  
- Todo App có authentication.  
- File upload service.  

### Bước 3: Đọc sách & tài liệu

- *Clean Code* (Robert C. Martin).  
- *Designing Data-Intensive Applications* (Martin Kleppmann).  
## Thách thức thường gặp

- **Quản lý state phức tạp** khi ứng dụng lớn dần.  
- **Bảo mật**: SQL Injection, XSS, CSRF.  
- **Hiệu năng**: query chậm, bottleneck ở database.  
## Kết luận

Làm backend không chỉ là viết API mà còn là **xây dựng nền tảng** cho toàn bộ hệ thống. Đây là công việc đòi hỏi sự kiên nhẫn, tư duy logic và niềm đam mê với việc tối ưu hóa.

Nếu bạn kiên trì, học hỏi đúng hướng và thực hành nhiều, chắc chắn con đường trở thành **backend developer chuyên nghiệp** sẽ không còn xa.
`;

export default function BlogPage() {
	const [toc, setToc] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const { id } = useParams();
	const { data: post, isLoading } = useSWR(id ? 'post' : null, () => postService.getById(id).then(res => res.data));
	useEffect(() => {
		const headings = Array.from(document.querySelectorAll('article h2, article h3')).map(el => ({
			id: el.id,
			text: el.textContent || '',
			level: el.tagName === 'H2' ? 2 : 3,
		}));
		setToc(headings);
		const headingElements = Array.from(document.querySelectorAll('article h2, article h3'));

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: '-20% 0px -70% 0px',
				threshold: 0.1,
			}
		);

		headingElements.forEach(el => observer.observe(el));

		return () => {
			headingElements.forEach(el => observer.unobserve(el));
		};
	}, [post]);
	if (isLoading) return <></>;
	return (
		<div className='space-y-6 max-w-7xl mx-auto mt-8 '>
			<div className='grid grid-cols-12 gap-6 '>
				<aside className='col-span-3 sticky top-24 h-fit'>
					<Card className='p-4 gap-2 '>
						<h2 className='font-bold mb-2 flex gap-2 items-center'>
							<Menu></Menu>
							Mục lục
						</h2>
						<Separator />
						<ul className='text-sm'>
							{toc.map(item => (
								<li
									key={item.id}
									className={`pl-${item.level === 3 ? '4' : '0'} border-l-3 border-transparent pl-2 py-1 ${activeId === item.id ? '!border-primary' : 'text-gray-700 hover:text-primary'}`}>
									<a href={`#${item.id}`} className={`transition-colors  ${activeId === item.id ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}`}>
										{item.text}
									</a>
								</li>
							))}
						</ul>
					</Card>
				</aside>
				<Card className='col-span-9 p-0 overflow-hidden'>
					<AspectRatio ratio={16 / 9}>
						<Image src={post.thumbnail} alt='blog' fill></Image>
					</AspectRatio>
					<article className='prose  max-w-none markdown-body p-6'>
						<h1 className='border-none'>
							{post.title}
							<div className='text-gray-400 flex text-lg items-center gap-6 mt-2  '>
								<div className='text-gray-400 flex text-lg items-center gap-2  '>
									<FaPen />
									<span className='!font-normal'>Tác giả: {post.author}</span>
								</div>

								<div className='text-gray-400 flex text-lg items-center gap-2  '>
									<FaClock className='!font-base' />
									<span className='!font-normal'>Cập nhật: {post.updatedAt}</span>
								</div>
								<div className='text-gray-400 flex text-lg items-center gap-2  '>
									<FaEye className='!font-base' />
									<span className='!font-normal'>Lượt xem: 25</span>
								</div>
							</div>
						</h1>

						<ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]}>{post.content}</ReactMarkdown>
					</article>
				</Card>
			</div>
			<div>
				<CardTitle>Bài viết hữu ích</CardTitle>
				<BlogList></BlogList>
			</div>
			<div>
				<CardTitle>Bài viết dành cho bạn</CardTitle>
				<BlogList></BlogList>
			</div>
		</div>
	);
}
