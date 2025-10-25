'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import Image from 'next/image';
import { Gem } from 'lucide-react';
import { FaGem } from 'react-icons/fa6';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const FeaturedEmployers = () => {
	const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
	const employers = [
		{ name: 'Apollo', isTop: false, thumbnail: 'apollo.png' },
		{ name: 'Chaillease', isTop: false, thumbnail: 'chaillease.png' },
		{ name: 'Cnvcdp', isTop: false, thumbnail: 'cnvcdp.png' },
		{ name: 'Edupia', isTop: false, thumbnail: 'edupia.png' },
		{ name: 'Fpt', isTop: true, thumbnail: 'fpt.png' },
		{ name: 'Lg', isTop: true, thumbnail: 'Lg.png' },
		{ name: 'Mb', isTop: true, thumbnail: 'mb.png' },
		{ name: 'Sailun', isTop: false, thumbnail: 'sailun.png' },
		{ name: 'Spx', isTop: false, thumbnail: 'spx.png' },
		{ name: 'Teky', isTop: false, thumbnail: 'teky.png' },
		{ name: 'Vib', isTop: false, thumbnail: 'vib.png' },
		{ name: 'Viettel', isTop: true, thumbnail: 'viettel.png' },
		{ name: 'Vpbank', isTop: true, thumbnail: 'vpbank.png' },
	];

	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto py-6 w-full '>
				<h1 className='mb-4'>Nhà tuyển dụng nổi bật</h1>

				<Carousel plugins={[autoplayPlugin.current]} className='w-full h-50'>
					<CarouselContent className=''>
						{employers.map((employer, index) => (
							<CarouselItem key={index} className=' md:basis-1/2 lg:basis-1/5 '>
								<Card className='hover:shadow-md transition-shadow cursor-pointer relative h-full hover:border-primary border p-6'>
									<CardContent className='p-0 flex flex-col items-center h-full'>
										<Badge className='absolute top-2 left-2 z-10 bg-primary px-1.5 py-0.5 rounded-full font-semibold'>
											<Gem />
											TOP
										</Badge>
										<div className='w-40 h-40 relative'>
											<Image src={`/company/${employer.thumbnail}`} alt={employer.name} fill className='object-contain rounded-t-lg' />
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

export default FeaturedEmployers;
