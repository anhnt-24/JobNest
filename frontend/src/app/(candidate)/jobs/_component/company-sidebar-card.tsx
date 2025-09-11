'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Code2, ExternalLink, MapPin, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import Link from 'next/link';

export function CompanyCard() {
	const params = useParams();
	const id = params.id;
	const { data: company } = useSWR(id ? `job/${id}/company}` : null, () => jobService.getCompany(Number(id)).then(res => res.data), { revalidateOnFocus: false });
	return (
		<Card className='p-6'>
			<div className='flex items-start gap-2'>
				<Avatar className='size-20 border rounded-xs '>
					<AvatarImage src={company?.avatarUrl} />
				</Avatar>
				<h3 className=''>{company?.name}</h3>
			</div>

			<div className='flex items-center  gap-2'>
				<div className='flex items-center gap-2 text-base font-medium text-gray-500 min-w-24'>
					<Users className='size-5 text-inherit' />
					Quy mô:
				</div>
				<span className='text-base font-medium'>{company?.employeeCount} nhân viên</span>
			</div>
			<div className='flex items-center gap-2 font-medium text-base'>
				<div className='flex items-center gap-2  text-gray-500 min-w-24'>
					<Code2 className='size-5 text-inherit ' />
					Lĩnh vực:
				</div>
				<span>{company?.industry}</span>
			</div>
			<div className='flex items-start gap-2 font-medium text-base'>
				<div className='flex items-center gap-2   text-gray-500 min-w-25'>
					<MapPin className='size-5 text-inherit' />
					Địa điểm:
				</div>
				<span className='text-base'>
					{company?.addressDetail}, {company?.ward}, {company?.district}, {company?.province}
				</span>
			</div>
			<Link href={`/cong-ty/${company?.id}`} className='text-base font-medium text-primary w-full hover:underline flex items-center justify-center gap-2'>
				Xem trang công ty
				<ExternalLink className='size-5 text-inherit' />
			</Link>
		</Card>
	);
}
