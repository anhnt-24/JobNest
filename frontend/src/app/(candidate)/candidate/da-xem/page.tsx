'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Building2, Users, Briefcase, MapPin, Search, FileText } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const viewedRecords = [
	{
		id: 1,
		company: {
			name: 'Công ty ABC',
			logo: '/image.png',
			location: 'Hà Nội, Việt Nam',
			industry: 'Công nghệ thông tin',
			followers: '12k',
			jobs: 25,
			description: 'Một trong những công ty công nghệ hàng đầu, chuyên phát triển sản phẩm AI và hệ thống web quy mô lớn.',
		},
		cvName: 'CV Frontend Developer',
		viewedAt: '2 ngày trước',
	},
	{
		id: 2,
		company: {
			name: 'Công ty ABC',
			logo: '/image.png',
			location: 'Hà Nội, Việt Nam',
			industry: 'Công nghệ thông tin',
			followers: '12k',
			jobs: 25,
			description: 'Một trong những công ty công nghệ hàng đầu, chuyên phát triển sản phẩm AI và hệ thống web quy mô lớn.',
		},
		cvName: 'CV Backend Developer',
		viewedAt: '1 ngày trước',
	},
	{
		id: 3,
		company: {
			name: 'Công ty XYZ',
			logo: '/image.png',
			location: 'TP. Hồ Chí Minh',
			industry: 'Tài chính',
			followers: '8k',
			jobs: 10,
			description: 'Công ty cung cấp giải pháp tài chính và ngân hàng số cho hàng triệu khách hàng.',
		},
		cvName: 'CV Business Analyst',
		viewedAt: '5 ngày trước',
	},
];

export default function ViewedCompaniesPage() {
	const [search, setSearch] = useState('');

	const filteredRecords = viewedRecords.filter(record => record.company?.user.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<Card>
			{/* Header */}
			<div className='flex justify-between items-start'>
				<div>
					<h2>Công ty đã xem CV của bạn</h2>
					<p className='text-gray-600 mt-1'>Mỗi lần công ty mở CV của bạn sẽ được hiển thị ở đây.</p>
				</div>

				<div className='relative w-72'>
					<Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
					<Input placeholder='Tìm kiếm công ty...' value={search} onChange={e => setSearch(e.target.value)} className='pl-9' />
				</div>
			</div>

			{/* List */}
			{filteredRecords.map(record => (
				<div key={record.id} className='flex gap-4 border-b p-4 hover:bg-gray-100 cursor-pointer bg-white'>
					<Avatar className='size-32 rounded-xs border'>
						<AvatarImage src={record.company.logo} alt={record.company?.user.name} />
						<AvatarFallback>{record.company?.user.name.charAt(0)}</AvatarFallback>
					</Avatar>

					<div className='flex-grow'>
						<div className='flex items-center justify-between'>
							<h3 className='font-semibold'>{record.company?.user.name}</h3>
							<span className='text-sm text-gray-500'>{record.viewedAt}</span>
						</div>

						<p className='text-gray-600 text-sm mt-1'>{record.company.description}</p>

						<div className='flex gap-4 text-sm text-gray-500 mt-3 flex-wrap pb-2'>
							<Badge variant='secondary' className='flex items-center gap-1'>
								<MapPin /> {record.company.location}
							</Badge>
							<Badge variant='secondary' className='flex items-center gap-1'>
								<Briefcase /> {record.company.industry}
							</Badge>
						</div>
						<div className='mt-2 flex gap-2 border-t items-center pt-2'>
							<span>CV đã xem:</span>
							<span className='text-primary font-semibold'>{record.cvName}</span>
						</div>
					</div>
				</div>
			))}

			{filteredRecords.length === 0 && <p className='text-gray-500 text-center mt-6'>Không có công ty nào đã xem CV của bạn.</p>}
		</Card>
	);
}
