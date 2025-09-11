// components/featured-employers.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import Image from 'next/image';
import { Gem } from 'lucide-react';

const FeaturedEmployers = () => {
	const employers = [
		{ name: 'Shinhan Bank', isTop: true },
		{ name: 'MB', isTop: true },
		{ name: 'Sun Life', isTop: true },
		{ name: 'SALLIN TIRE', isTop: true },
		{ name: 'SeABank', isTop: true },
		{ name: 'Techcombank', isTop: false },
		{ name: 'Vietcombank', isTop: true },
		{ name: 'VinGroup', isTop: false },
	];

	return (
		<div className='max-w-6xl mx-auto px-4 py-6 w-full'>
			<h2 className='text-2xl font-bold mb-6'>Nhà tuyển dụng nổi bật</h2>

			<Carousel className='w-full h-50'>
				<CarouselContent className=' gap-1 '>
					{employers.map((employer, index) => (
						<CarouselItem key={index} className=' md:basis-1/2 lg:basis-1/5 '>
							<Card className='hover:shadow-md transition-shadow cursor-pointer relative h-full hover:border-primary border'>
								<CardContent className='p-0 flex flex-col items-center h-full'>
									{/* TOP Badge positioned at top-left corner */}
									{employer.isTop && (
										<Badge className='absolute top-2 left-2 z-10'>
											<Gem />
											TOP
										</Badge>
									)}

									{/* Company image */}
									<div className='w-20 h-20 relative'>
										<Image src='/image.png' alt={employer.name} fill className='object-cover rounded-t-lg' />
									</div>

									{/* Company name */}
									<div className=' w-full text-center'>
										<span className='font-medium'>{employer.name}</span>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default FeaturedEmployers;
