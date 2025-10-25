'use client';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import { companyService } from '@/service/company.service';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Loading } from '@/components/shared/loading';

export default function CompanyGrid() {
	const { data: companies, isLoading } = useSWR('company', () => companyService.getAll({}).then(res => res.data));
	return (
		<Card>
			<div className='border-b  pb-2'>
				<CardTitle>Thương hiệu lớn tiêu biểu cùng lĩnh vực</CardTitle>
				<p>Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.</p>
			</div>
			{isLoading && <Loading />}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				{companies?.items?.map((c, idx) => (
					<Link href={`/cong-ty/${c.id}`} key={idx} className='flex items-center gap-3 p-4 hover:shadow-md transition rounded-xl border border-yellow-500 hover:bg-primary/5 hover:border-primary '>
						<Avatar className='size-18 border rounded-sm'>
							<AvatarImage src={c.user.avatarUrl} alt={c.name} width={54} height={54} className=' object-contain' />
						</Avatar>
						<div>
							<p className='font-semibold  leading-snug line-clamp-2 hover:text-primary'>{c.user.name}</p>
							<p className=' text-gray-500'>{c.industry}</p>
						</div>
					</Link>
				))}
			</div>
		</Card>
	);
}
