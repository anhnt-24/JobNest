'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyRes } from '@/schema/company.schema';
import { MapPin, Map } from 'lucide-react';

export default function CompanyContact({ company }: { company: CompanyRes }) {
	return (
		<Card>
			<CardTitle className='border-b'>Thông tin liên hệ</CardTitle>
			<div>
				<p className='font-medium text-base mb-2'>
					<MapPin className='size-6 text-primary inline mr-2' />
					Địa chỉ công ty
				</p>
				<p className=' text-gray-600'>{company?.address}</p>
			</div>
			<hr />
			<div className='space-y-2'>
				<div className='flex items-center gap-2 font-medium'>
					<Map className='size-6 text-primary' />
					<span>Xem bản đồ</span>
				</div>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5289436!2d105.7742804!3d21.0100232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453541814eb05%3A0x1b9cf0fc69751c7b!2sIStay+Hotel+Apartment+5!5e0!3m2!1svi!2s!4v1708232812345'
					width='100%'
					height='250'
					style={{ border: 0 }}
					allowFullScreen
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				/>
			</div>
		</Card>
	);
}
