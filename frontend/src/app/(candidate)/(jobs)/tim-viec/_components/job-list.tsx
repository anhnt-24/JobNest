'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Bookmark, Heart, Info } from 'lucide-react';
import { SaveJobButton } from '@/components/ui/custom/save-job-btn';
import { JobRes } from '@/schema/job.schema';
export default function JobList({ jobs }: { jobs: JobRes[] }) {
	return (
		<div className='flex-2 space-y-6'>
			<div className='space-y-4'>
				{jobs?.map(item => (
					<Card className='border p-4 hover:bg-primary/5  hover:border-primary'>
						<div className='flex gap-4 items-start '>
							<Avatar className='size-32 p-2 bg-white border overflow-hidden rounded-xs border-gray-200'>
								<Link href={`/jobs/${item.id}`}>
									<AvatarImage className='object-contain size-full' src={item.company.user.avatarUrl} alt='@user' />
								</Link>
							</Avatar>
							<div className='flex-1 space-y-1'>
								<div className='flex gap-4 justify-between items-start '>
									<Link href={`/jobs/${item.id}`} className='flex-1'>
										<h3 className='line-clamp-2 text-lg font-semibold hover:text-primary cursor-pointer'>{item.title}</h3>
									</Link>
									<p className='text-primary text-lg font-semibold border-primary'>{item.salary}</p>
								</div>
								<Link href={`/cong-ty/${item.company.id}`}>
									<p className='text-gray-600'>{item.company?.user.name}</p>
								</Link>
								<div className='flex  gap-2 mt-2'>
									<Badge variant={'secondary'} className='shadow-2xl'>
										{item.areaTags[0]}
									</Badge>
									<Badge variant={'secondary'}>
										<span>Cập nhật 10 phút trước</span>
									</Badge>
								</div>
								<Separator className='my-4'></Separator>
								<div className='flex gap-2 justify-between'>
									<p className='flex gap-2 text-primary items-center font-semibold'>
										<Info className='size-5' />
										Vì sao việc làm này phù hợp với bạn ?
									</p>
									<div className=' gap-2 flex'>
										<Link href={`/jobs/${item.id}`}>
											<Button size={'md'}>Ứng tuyển ngay</Button>
										</Link>
										<SaveJobButton size='md' iconOnly jobId={item.id} />
									</div>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
