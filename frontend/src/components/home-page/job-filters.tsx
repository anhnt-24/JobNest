// components/advanced-job-filters.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Filter } from 'lucide-react';
export function JobFilters() {
	return (
		<div className='my-4 flex items-center justify-between gap-4'>
			<div className='relative flex items-center bg-white border rounded-lg py-1 px-2 w-fit'>
				<h6 className='inline font-bold text-primary'>
					<Filter className='inline' size={18}></Filter> Lọc theo:{' '}
				</h6>
				<Select>
					<SelectTrigger className='w-[150px] border-0 text-base !text-black font-medium shadow-none'>
						<SelectValue placeholder='Địa điểm' />
					</SelectTrigger>
					<SelectContent className='text-black w-72 right-27 text-base '>
						<SelectItem value='light'>Địa điểm</SelectItem>
						<SelectItem value='dark'>Mức lương</SelectItem>
						<SelectItem value='system'>Kinh nghiệm</SelectItem>
						<SelectItem value='cc'>Ngành nghề</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='flex items-center gap-2 flex-1 pl-40 pr-12'>
				<Carousel className='w-full'>
					<CarouselContent className='px-4 gap-3 max-w-150'>
						<CarouselItem className=' flex-none bg-primary px-4 py-2 text-center text-primary-foreground rounded-3xl'>Hải Phòng</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
						<CarouselItem className=' flex-none bg-white  hover:border-primary hover:text-primary hover:border border border-gray-300 cursor-pointer px-4 py-2 text-center text-black rounded-3xl'>
							Hải Phòng
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious variant={'outline'} className='border-primary text-primary hover:bg-primary hover:text-primary-foreground border ' />
					<CarouselNext variant={'outline'} className='border-primary text-primary hover:bg-primary hover:text-primary-foreground border ' />
				</Carousel>
			</div>
		</div>
	);
}
