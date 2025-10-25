'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Users, Briefcase, MapPin, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SimpleTooltip } from '@/components/shared/simple-tooltip';
const companies = [
	{
		id: 1,
		name: 'Công ty ABC',
		logo: '/image.png',
		location: 'Hà Nội, Việt Nam',
		industry: 'Công nghệ thông tin',
		followers: '12k',
		jobs: 25,
		badges: ['Hot', 'Đang tuyển'],
		description: 'Một trong những công ty công nghệ hàng đầu, chuyên phát triển sản phẩm AI và hệ thống web quy mô lớn.',
	},
	{
		id: 2,
		name: 'Công ty XYZ',
		logo: '/image.png',
		location: 'TP. Hồ Chí Minh',
		industry: 'Tài chính',
		followers: '8k',
		jobs: 10,
		badges: ['Top Company'],
		description: 'Công ty cung cấp giải pháp tài chính và ngân hàng số cho hàng triệu khách hàng.',
	},
	{
		id: 3,
		name: 'Công ty DEF',
		logo: '/image.png',
		location: 'Đà Nẵng',
		industry: 'Thương mại điện tử',
		followers: '5k',
		jobs: 12,
		badges: ['Đang tuyển'],
		description: 'Sàn thương mại điện tử phát triển nhanh nhất tại miền Trung, với đội ngũ trẻ trung và sáng tạo.',
	},
];

export default function FollowedCompaniesPage() {
	const [search, setSearch] = useState('');

	const filteredCompanies = companies.filter(company => company?.user.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<Card>
			<div className='flex justify-between items-start'>
				<div>
					<h2>Công ty bạn đã theo dõi</h2>
					<p className='text-gray-600 mt-1'>Theo dõi để không bỏ lỡ tin tuyển dụng mới.</p>
				</div>

				<div className='relative w-72'>
					<Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
					<Input placeholder='Tìm kiếm công ty...' value={search} onChange={e => setSearch(e.target.value)} className='pl-9' />
				</div>
			</div>
			{filteredCompanies.map(company => (
				<div key={company.id} className='flex gap-4 border-b  p-4 hover hover:bg-gray-100 cursor-pointer bg-white'>
					<div className='flex gap-4'>
						<Avatar className='size-32 rounded-xs border'>
							<AvatarImage src={company.logo} alt={company?.user.name} />
							<AvatarFallback>{company?.user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div className='flex-grow'>
							<div className='flex items-center justify-between'>
								<h3>{company?.user.name}</h3>
							</div>

							<p className='text-gray-600 text-sm mt-1'>{company.description}</p>

							<div className='flex gap-6 text-sm text-gray-500 mt-3'>
								<Badge className='flex items-center gap-1'>
									<MapPin /> {company.location}
								</Badge>
								<Badge variant={'secondary'} className='flex items-center gap-1'>
									<Briefcase /> {company.industry}
								</Badge>
								<Badge variant={'secondary'} className='flex items-center gap-1'>
									<Users /> {company.followers} followers
								</Badge>
								<Badge variant={'secondary'} className='flex items-center gap-1'>
									<Briefcase /> {company.jobs} jobs
								</Badge>
							</div>
						</div>
					</div>

					<SimpleTooltip label='Bỏ theo dõi'>
						<Button className='ml-auto' variant='ghost' size='icon'>
							<X className='h-4 w-4' />
						</Button>
					</SimpleTooltip>
				</div>
			))}

			{filteredCompanies.length === 0 && <p className='text-gray-500 text-center mt-6'>Không tìm thấy công ty nào phù hợp.</p>}
		</Card>
	);
}
