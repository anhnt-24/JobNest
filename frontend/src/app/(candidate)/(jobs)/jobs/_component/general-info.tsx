'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { jobService } from '@/service/job.service';
import { Badge, Briefcase, GraduationCap, Users, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { FaBriefcase, FaClock, FaGraduationCap, FaUsers } from 'react-icons/fa6';
import { Loading } from '@/components/shared/loading';
function GeneralInfo() {
	const params = useParams();
	const id = params.id;
	const { data: job, error } = useSWR(id ? `/jobs/${id}` : null, () => jobService.getById(Number(id)).then(res => res.data), { suspense: true });
	const infoItems = [
		{
			icon: <FaBriefcase className='size-5' />,
			label: 'Cấp bậc',
			value: job.level,
		},
		{
			icon: <FaGraduationCap className='size-5' />,
			label: 'Học vấn',
			value: job.education,
		},
		{
			icon: <FaUsers className='size-5' />,
			label: 'Số lượng tuyển',
			value: job.quantity,
		},
		{
			icon: <FaClock className='size-5' />,
			label: 'Hình thức làm việc',
			value: job.type,
		},
	];

	return (
		<>
			{infoItems.map((item, index) => (
				<div key={index} className='flex items-center gap-4'>
					<div className='rounded-full bg-primary text-primary-foreground p-3'>{item.icon}</div>
					<div className='flex-1'>
						<p className='text-muted-foreground'>{item.label}</p>
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
			<Suspense fallback={<Loading />}>
				<GeneralInfo></GeneralInfo>
			</Suspense>
		</Card>
	);
}

export default Component;
