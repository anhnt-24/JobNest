'use client';

import Image from 'next/image';
import { Users, Globe } from 'lucide-react';
import UpdateAvatar from './company-update-avatar';
import { useAuth } from '@/hook/useAuth';

export default function CompanyBanner() {
	const { user } = useAuth();
	return (
		<div className='p-0 rounded-2xl overflow-hidden'>
			<div className='relative h-64 w-full'>
				<Image src={user?.avatarUrl} alt='Apollo Cover' fill className='object-cover h-full' />
			</div>
			<div className='relative  flex items-center px-6 p-8 bg-gradient-to-r  from-red-950 to-primary'>
				<div className='h-48 w-48 absolute -top-32 rounded-xl   flex items-center justify-center'>
					<Image src={user?.avatarUrl} alt='Apollo Logo' width={180} height={180} />
					<UpdateAvatar></UpdateAvatar>
				</div>

				<div className='flex-1 ml-54 text-primary-foreground '>
					<h2 className=' text-2xl text-primary-foreground'>{user?.name}</h2>

					<div className='mt-2 flex flex-wrap items-center gap-4 text-sm'>
						<div className='flex items-center gap-1'>
							<Globe className='h-4 w-4' />
							<a href='http://apollo.edu.vn/' target='_blank' rel='noopener noreferrer' className='hover:underline'>
								http://apollo.edu.vn/
							</a>
						</div>

						<div className='flex items-center gap-1'>
							<Users className='h-4 w-4' />
							<span>1000+ nhân viên</span>
						</div>

						<div className='flex items-center gap-1'>
							<Users className='h-4 w-4' />
							<span>468 người theo dõi</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
