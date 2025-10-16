'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyRes } from '@/schema/company.schema';

export default function CompanyIntro({ company }: { company: CompanyRes }) {
	return (
		<Card>
			<CardTitle className='border-b'>Giới thiệu công ty</CardTitle>
			<p>{company?.description}</p>
		</Card>
	);
}
