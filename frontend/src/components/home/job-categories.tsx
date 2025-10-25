// components/job-categories.tsx
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Megaphone, Headset, Users, Code, Landmark, Home, Calculator } from 'lucide-react';
import Image from 'next/image';

const JobCategories = () => {
	const categories = [
		{
			name: 'Kinh doanh - Bán hàng',
			jobs: 11536,
			icon: '/illustration/Money.png',
		},
		{
			name: 'Marketing - PR - Quảng cáo',
			jobs: 7601,
			icon: '/illustration/Marketing.png',
		},
		{
			name: 'Chăm sóc khách hàng (CSKH)',
			jobs: 2664,
			icon: '/illustration/Headphones.png',
		},
		{
			name: 'Nhân sự - Hành chính - Pháp lý',
			jobs: 3000,
			icon: '/illustration/Briefcase.png',
		},
		{
			name: 'Công nghệ Thông tin',
			jobs: 2419,
			icon: '/illustration/Computer Graphic.png',
		},
		{
			name: 'Tài chính - Ngân hàng',
			jobs: 1198,
			icon: '/illustration/Credit Card.png',
		},
		{
			name: 'Bất động sản',
			jobs: 416,
			icon: '/illustration/Office 1.png',
		},
		{
			name: 'Kế toán - Kiểm toán - Thuế',
			jobs: 6020,
			icon: '/illustration/Calculator 1.png',
		},
	];

	return (
		<div className='bg-white py-4'>
			<div className='max-w-7xl mx-auto py-6 w-full'>
				<h1 className='mb-4'>Top ngành nghề nổi bật</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 '>
					{categories.map((category, index) => {
						const Icon = category.icon;
						return (
							<Card key={index} className=' bg-gray-100 hover:bg-white hover:border-primary  border-transparent hover:-translate-y-2 transition  cursor-pointer p-6'>
								<div className='flex flex-col items-center gap-2 size-full'>
									<Image src={category.icon} height={500} width={500} className='size-28 object-cover mb-2 rounded-sm' alt='icon'></Image>
									<span className=' font-semibold text-lg text-center line-clamp-1  '>{category.name}</span>
									<div className='mt-auto'>
										<span className='text-primary font-bold '>{category.jobs.toLocaleString()}</span>
										<span className='ml-2 font-medium'>việc làm</span>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default JobCategories;
