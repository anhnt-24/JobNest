'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyResponse } from '@/schema/company.schema';

export default function CompanyIntro({ company }: { company: CompanyResponse }) {
	return (
		<Card className='p-0 overflow-hidden'>
			<h2 className='text-white bg-gradient-to-r from-red-950 to-primary p-4  font-semibold'>Giới thiệu công ty</h2>

			<CardContent className='pb-4 space-y-4 '>
				<p>{company?.description}</p>
			</CardContent>
		</Card>
	);
}
