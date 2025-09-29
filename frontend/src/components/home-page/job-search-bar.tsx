'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Separator } from '../ui/separator';
import { DropdownMenu } from '../ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Badge } from '../ui/badge';
import { FaLocationDot } from 'react-icons/fa6';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { SearchResultDropdown } from '../ui/custom/search-result-dropdown';

export function JobSearchBar() {
	const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
	const [query, setQuery] = useState('');
	const images = ['/banner/banner (1).jpeg', '/banner/banner (1).jpg', '/banner/banner (1).png', '/banner/banner (2).jpg', '/banner/banner (3).jpg'];
	const [focused, setFocused] = useState(false);
	return (
		<div className='bg-gradient-to-b from-black/90 to-green-900 flex h-112 justify-center items-center relative'>
			<div className='absolute top-0 left-0 bottom-0'>
				<img src={'/left.png'} className='h-full'></img>
			</div>
			<div
				className='w-full  max-w-7xl mx-auto
			'>
				<div className='my-auto'>
					<div className='text-center mb-6'>
						<h1 className=' font-bold text-3xl text-primary-foreground'>Hãy chia sẻ nhu cầu công việc của bạn</h1>
					</div>

					<div className='flex gap-4'>
						<div className='flex-1 flex gap-3 mb-6 h-16 items-center rounded-xs bg-white  shadow-lg font-medium text-base px-4 py-4 relative'>
							{focused && <SearchResultDropdown query={query} />}
							<div className='flex-1 relative'>
								<Input
									placeholder='Nhập nhu cầu công việc của bạn'
									className='shadow-none py-6 px-4 md:text-base text-black !border-none'
									value={query}
									onChange={e => setQuery(e.target.value)}
									onFocus={() => setFocused(true)}
									onBlur={() => setTimeout(() => setFocused(false), 200)}
								/>
							</div>
							<Separator orientation='vertical'></Separator>
							<div className='w-48'>
								<DropdownMenu>
									<DropdownMenuTrigger className='text-lg text-gray-800'>
										<FaLocationDot className='inline size-6 mr-2 text-gray-600'></FaLocationDot> Địa điểm
									</DropdownMenuTrigger>
									<DropdownMenuContent>c</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<Button className='py-8 px-12 bg-primary text-white rounded-xs text-lg font-semibold'>
							<Search className='size-6' />
							Tìm kiếm
						</Button>
					</div>
					<div className='flex flex-wrap gap-3 items-center'>
						<p className='text-primary-foreground font-bold'>Gợi ý:</p>
						{['Fullstack developer intern', 'Intern nodejs developer', 'Nhân viên kinh doanh', 'Full stack developer'].map(job => (
							<Badge
								key={job}
								variant='outline'
								className='rounded-full border cursor-pointer p-0 text-sm border-gray-300 bg-transparent text-primary-foreground px-2 py-2 hover:text-primary hover:border-primary'>
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
