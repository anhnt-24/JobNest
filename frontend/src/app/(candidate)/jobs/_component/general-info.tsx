'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { JobResponse } from '@/schema/job.schema';
import { jobService } from '@/service/job.service';
import { Badge, Briefcase, GraduationCap, Users, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import LoadingCard from '../../candidate/profile/skeleton';
const fallbackJob: JobResponse = {
	id: 0,
	title: '',
	description: '',
	requirements: '',
	benefits: '',
	areaTags: '',
	categories: '',
	companyId: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
	deadline: new Date(),
	education: 'NONE',
	experience: '',
	level: 'INTERN',
	mustSkills: '',
	niceSkills: '',
	quantity: 0,
	salary: '',
	status: '',
	type: 'FULL_TIME',
	workingAddress: '',
	applicationMethod: '',
	workingTime: '',
	thumbnailUrl: '',
};
function GeneralInfo() {
	const params = useParams();
	const id = params.id;
	const { data: job, error } = useSWR(id ? `/jobs/${id}` : null, () => jobService.getById(Number(id)).then(res => res.data), { suspense: true, fallbackData: fallbackJob });
	const infoItems = [
		{
			icon: <Briefcase className='h-5 w-5' />,
			label: 'Cấp bậc',
			value: job.level,
		},
		{
			icon: <GraduationCap className='h-5 w-5' />,
			label: 'Học vấn',
			value: job.education,
		},
		{
			icon: <Users className='h-5 w-5' />,
			label: 'Số lượng tuyển',
			value: job.quantity,
		},
		{
			icon: <Clock className='h-5 w-5' />,
			label: 'Hình thức làm việc',
			value: job.type,
		},
	];

	return (
		<>
			{infoItems.map((item, index) => (
				<div key={index} className='flex items-start gap-4'>
					<div className='rounded-full bg-primary text-primary-foreground p-2'>{item.icon}</div>
					<div className='flex-1'>
						<p className='text-sm text-muted-foreground'>{item.label}</p>
						<p className='font-medium'>{item.value as string}</p>
					</div>
				</div>
			))}
		</>
	);
}
function Component() {
	return (
		<Card>
			<CardTitle>Thông tin chung</CardTitle>
			<Suspense fallback={<LoadingCard />}>
				<GeneralInfo></GeneralInfo>
			</Suspense>
		</Card>
	);
}

export default Component;
