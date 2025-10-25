'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Globe, PlusIcon } from 'lucide-react';
import { CompanyRes } from '@/schema/company.schema';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export default function CompanyBanner({ company }: { company: CompanyRes }) {
	return (
		<div className='mb-4 p-0 rounded-2xl overflow-hidden relative'>
			<div className='relative h-100 w-full bg-white'>
				<Image src={company?.coverUrl} alt='Apollo Cover' fill className='object-contain h-full' />
			</div>
			<div className='z-20 absolute inset-0 bg-gradient-to-t from-black/50  to-transparent' />
			<div className='absolute  flex items-end px-6 p-8 top-48 z-50 w-full'>
				<Avatar className='size-40 rounded-full border-10 border-white shadow-lg'>
					<AvatarImage src={company?.user.avatarUrl} alt='Apollo Logo'></AvatarImage>
				</Avatar>
				<div className='flex-1 ml-4 text-shadow-gray-600 text-shadow-xs text-primary-foreground '>
					<h2 className=' text-2xl text-primary-foreground'>{company?.user.name}</h2>

					<div className='mt-2 flex flex-wrap items-center gap-4'>
						<div className='flex items-center gap-1'>
							<Globe className='h-4 w-4' />
							<a href={company?.website} target='_blank' rel='noopener noreferrer' className='hover:underline'>
								{company?.website}
							</a>
						</div>

						<div className='flex items-center gap-1'>
							<Users className='h-4 w-4' />
							<span>{company?.employeeCount} nhân viên</span>
						</div>

						<div className='flex items-center gap-1'>
							<Users className='h-4 w-4' />
							<span>468 người theo dõi</span>
						</div>
					</div>
				</div>
				<Button variant={'secondary'} className=' rounded-full'>
					<PlusIcon></PlusIcon> Theo dõi
				</Button>
			</div>
		</div>
	);
}
