// components/job-categories.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Megaphone, Headset, Users, Code, Landmark, Home, Calculator } from 'lucide-react';

const JobCategories = () => {
	const categories = [
		{
			name: 'Kinh doanh - Bán hàng',
			jobs: 11536,
			icon: ShoppingCart,
		},
		{
			name: 'Marketing - PR - Quảng cáo',
			jobs: 7601,
			icon: Megaphone,
		},
		{
			name: 'Chăm sóc khách hàng (CSKH)',
			jobs: 2664,
			icon: Headset,
		},
		{
			name: 'Nhân sự - Hành chính - Pháp lý',
			jobs: 3000,
			icon: Users,
		},
		{
			name: 'Công nghệ Thông tin',
			jobs: 2419,
			icon: Code,
		},
		{
			name: 'Tài chính - Ngân hàng - Bảo hiểm',
			jobs: 1198,
			icon: Landmark,
		},
		{
			name: 'Bất động sản',
			jobs: 416,
			icon: Home,
		},
		{
			name: 'Kế toán - Kiểm toán - Thuế',
			jobs: 6020,
			icon: Calculator,
		},
	];

	return (
		<div className=''>
			<div className='max-w-6xl mx-auto px-4 py-6 w-full'>
				<h1 className='text-2xl font-bold mb-6'>Top ngành nghề nổi bật</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
					{categories.map((category, index) => {
						const Icon = category.icon;
						return (
							<Card key={index} className=' hover:border-primary  hover:-translate-y-2 transition border cursor-pointer '>
								<div className='flex flex-col items-center justify-between gap-4'>
									<Icon className={`text-primary font-bold size-16 `} />
									<span className=' font-semibold text-center  '>{category.name}</span>

									<p>
										<Badge className='px-2 py-1 '>{category.jobs.toLocaleString()}</Badge>
										<span className='text-sm ml-2 font-medium'>việc làm</span>
									</p>
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
