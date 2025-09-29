'use client';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const companies = [
	{
		name: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ - VIỄN THÔNG ELCOM',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'CÔNG TY CỔ PHẦN TRUYỀN THÔNG IRIS',
		industry: 'IT - Phần mềm',
		logo: null,
	},
	{
		name: 'CÔNG TY CỔ PHẦN VIỄN THÔNG FPT',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'TRUNG TÂM NGHIÊN CỨU VÀ PHÁT TRIỂN MOBIFONE',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'TỔNG CÔNG TY CÔNG NGHIỆP CÔNG NGHỆ CAO VIETTEL',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'CÔNG TY CỔ PHẦN DỊCH VỤ KỸ THUẬT MOBIFONE',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'VIETTEL IDC',
		industry: 'Viễn thông',
		logo: null,
	},
	{
		name: 'CÔNG TY TNHH PHÂN PHỐI SYNNEX FPT',
		industry: 'IT - Phần mềm',
		logo: null,
	},
	{
		name: 'TẬP ĐOÀN FPT',
		industry: 'IT - Phần mềm',
		logo: null,
	},
	{
		name: 'HỆ THỐNG BÁN LẺ VIETTEL STORE - CÔNG TY TM & XNK VIETTEL',
		industry: 'Viễn thông',
		logo: null,
	},
];

export default function CompanyGrid() {
	return (
		<Card>
			<div className='border-b  pb-2'>
				<CardTitle>Thương hiệu lớn tiêu biểu cùng lĩnh vực</CardTitle>
				<p>Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				{companies.map((c, idx) => (
					<div key={idx} className='flex items-center gap-3 p-4 hover:shadow-md transition rounded-xl border border-primary'>
						<Image src={c.logo ?? '/image.png'} alt={c.name} width={54} height={54} className='rounded-md border bg-white object-contain' />
						<div>
							<p className='font-medium leading-snug line-clamp-2 hover:text-primary'>{c.name}</p>
							<p className='text-sm text-gray-500'>{c.industry}</p>
						</div>
					</div>
				))}
			</div>
			<div className='flex items-center  mt-8 justify-center text-primary'>
				<p className='font-semibold  hover:underline cursor-pointer'>Xem thêm</p>
				<ArrowRight className='inline  size-5' />
			</div>
		</Card>
	);
}
