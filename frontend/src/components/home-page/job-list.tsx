// components/job-listings.tsx
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { JobFilters } from './job-filters';
import { JobCard } from './job-card';

export function JobListings() {
	return (
		<div>
			<div className='max-w-6xl mx-auto px-4 py-6 font-sans w-full '>
				{/* Header */}
				<div className='flex justify-between'>
					<h1 className='text-2xl font-bold mb-3'>Việc làm tốt nhất</h1>
					<div className='flex items-center gap-2'>
						<p className='underline text-sm'>Xem tất cả</p>
						<div className='h-6'>
							<Separator orientation='vertical'></Separator>
						</div>
						<button className='rounded-full text-primary border border-primary p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'>
							<ChevronLeft size={20} className='!text-lg' />
						</button>
						<button className='rounded-full text-primary border border-primary p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'>
							<ChevronRight size={20} />
						</button>
					</div>
				</div>
				<JobFilters />

				<p className='text-sm  p-2 rounded-lg border-blue-600 bg-blue-50 border '>
					<span className='font-bold'>
						<Lightbulb className='inline text-blue-600 ' size={18}></Lightbulb> Gợi ý:{' '}
					</span>
					Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
				</p>

				<Separator className='my-4' />

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					<JobCard />
					<JobCard />
					<JobCard />
					<JobCard />
				</div>
				<div className='flex items-center justify-center gap-x-4'>
					<button className='rounded-full text-primary border border-primary p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'>
						<ChevronLeft size={20} className='!text-lg' />
					</button>
					<p className='font-semibold'>
						<span className='text-primary'>8</span>
						<span className='text-gray-400'>/ 20 Trang</span>
					</p>

					<button className='rounded-full text-primary border border-primary p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
