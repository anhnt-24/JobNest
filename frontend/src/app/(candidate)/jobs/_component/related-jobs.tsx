'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Clock, HeartPlus, MapPin } from 'lucide-react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import Link from 'next/link';
function RelatedJobs() {
	const { data: jobs, isLoading } = useSWR([`/timviec`], () => jobService.getAll({}).then(res => res.data));
	if (isLoading) return <></>;
	return (
		<Card>
			<CardTitle>Việc làm liên quan</CardTitle>
			{jobs.items?.map(job => (
				<Card className='p-6  hover:shadow-md transition-shadow border  hover:border-primary'>
					<Link href={`/jobs/${job.id}`} className='space-y-2'>
						<div className='flex gap-2 items-start'>
							<Avatar className='size-24 border border-gray-200 rounded-sm'>
								<AvatarImage className='size-full' src='/image.png' alt='@user' />
							</Avatar>
							<div className='flex-1 space-y-2'>
								<div className='flex justify-between '>
									<h3 className=' line-clamp-2 max-w-md hover:text-primary'>{job.title}</h3>
									<p className='text-red-600 font-semibold text-lg '>{job.salary}</p>
								</div>
								<p className='text-gray-600'>{job.company.name}</p>
							</div>
						</div>

						<div className='flex flex-wrap items-center gap-2 pt-2 justify-between'>
							<div className='flex gap-2'>
								<Badge className='flex items-center text-sm'>
									<MapPin className='h-4 w-4 mr-1 ' />
									<span>Hà Nội</span>
								</Badge>
								<Badge variant={'secondary'} className='flex items-center text-sm text-gray-500'>
									<Clock className='h-4 w-4 mr-1' />
									<span>Cập nhật 10 phút trước</span>
								</Badge>
							</div>
							<div className='flex gap-2 justify-center items-center'>
								<Link href={`/jobs/${job.id}`}>
									<Button className='rounded-full'>Ứng tuyển</Button>
								</Link>
								<button className='rounded-full border border-primary text-primary size-10 hover:bg-primary/5 cursor-pointer p-2'>
									<HeartPlus size={18}></HeartPlus>
								</button>
							</div>
						</div>
					</Link>
				</Card>
			))}
		</Card>
	);
}
export default RelatedJobs;
