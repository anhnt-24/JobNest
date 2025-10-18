'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Globe, PlusIcon } from 'lucide-react';
import { CompanyRes } from '@/schema/company.schema';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import useSWR from 'swr';
import { companyService } from '@/service/company.service';
import UpdateAvatar from './company-update-avatar';
import CoverImageUploader from './company-update-cover';
import { FaGlobe, FaUserPlus, FaUsers } from 'react-icons/fa6';

export default function CompanyBanner() {
	const { data: company, mutate } = useSWR('/company/me', () => companyService.me().then(res => res.data));

	return (
		<div className='p-0 rounded-2xl overflow-hidden relative'>
			<div className='relative h-100 w-full group'>
				<Image src={company?.coverUrl} alt='Apollo Cover' fill className='object-cover h-full brightness-90' />
				<div className='absolute z-1 right-4 top-4'>
					<CoverImageUploader></CoverImageUploader>
				</div>
			</div>
			<div className='absolute  flex items-end px-6 p-8 top-48 w-full'>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
				<Avatar className='size-40 rounded-full border-10 border-white shadow-lg relative group '>
					<AvatarImage src={company?.user.avatarUrl} alt='Apollo Logo' className='group-hover:brightness-80 transition-all'></AvatarImage>
					<div className='opacity-0 group-hover:opacity-100 absolute flex inset-0 items-center justify-center transition-all'>
						<div></div>
						<UpdateAvatar></UpdateAvatar>
					</div>
				</Avatar>
				<div className='flex-1 ml-4 z-10 text-shadow-black/90 text-shadow-xs text-primary-foreground '>
					<h2 className=' text-3xl text-white'>{company?.user.name}</h2>

					<div className='mt-2 flex flex-wrap items-center gap-6  text-lg'>
						<div className='flex items-center gap-2'>
							<FaGlobe className='size-5' />
							<a href={company?.website} target='_blank' rel='noopener noreferrer' className='hover:underline'>
								{company?.website}
							</a>
						</div>

						<div className='flex items-center gap-2'>
							<FaUsers className='size-5' />
							<span>{company?.employeeCount} nhân viên</span>
						</div>

						<div className='flex items-center gap-2'>
							<FaUserPlus className='size-5' />
							<span>468 người theo dõi</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
