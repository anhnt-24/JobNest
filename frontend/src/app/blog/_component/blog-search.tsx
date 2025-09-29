'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { FaLocationDot } from 'react-icons/fa6';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function BlogSearch() {
	const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

	const images = ['/banner/banner (1).jpeg', '/banner/banner (1).jpg', '/banner/banner (1).png', '/banner/banner (2).jpg', '/banner/banner (3).jpg'];
	return (
		<div className='bg-gradient-to-b from-black/90 to-green-900 flex h-128 justify-center items-center relative -mt-8'>
			<div className='absolute top-0 left-0 bottom-0'>
				<img src={'/left.png'} className='h-full'></img>
			</div>
			<div
				className='w-full max-w-7xl mx-auto
			'>
				{/* Main heading */}
				<div className=''>
					<div className='text-center mb-6'>
						<h1 className=' font-bold text-3xl text-primary-foreground'>Tìm kiếm bài viết mà bạn yêu thích</h1>
					</div>

					<div className='flex gap-4'>
						<div className='flex-1 flex gap-3 mb-6 h-16 items-center rounded-xs bg-white  shadow-lg font-medium text-base px-4 py-4'>
							<div className='flex-1'>
								<Input placeholder='Nhập từ khóa tìm kiếm' className='focus:ring-0 shadow-none py-6 px-4 md:text-base text-black !border-none ' />
							</div>
						</div>
						<Button className='py-8 px-12 bg-primary text-white rounded-xs text-lg font-semibold'>
							<Search className='size-6' />
							Tìm kiếm
						</Button>
					</div>

					{/* Popular jobs */}
					<div className='flex flex-wrap gap-3 items-center'>
						<p className='text-primary-foreground font-bold'>Gợi ý:</p>
						{['Fullstack developer intern', 'Intern nodejs developer', 'Nhân viên kinh doanh', 'Full stack developer'].map(job => (
							<Badge key={job} variant='outline' className='rounded-full p-0 text-sm border-gray-300 bg-transparent text-primary-foreground px-2 py-2 hover:text-primary hover:border-primary'>
								{job}
							</Badge>
						))}
					</div>
				</div>
			</div>

			<div className='absolute top-0 right-0 bottom-0'>
				<img src={'/right.png'} className='h-full'></img>
			</div>
		</div>
	);
}
