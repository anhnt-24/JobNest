'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Bookmark, Heart, Info } from 'lucide-react';
export default function JobList({ jobs }: { jobs: any }) {
	return (
		<div className='flex-2 space-y-6'>
			<div className='space-y-4'>
				{jobs?.items?.map(item => (
					<Card className='bg-primary/5 border-primary/80 p-4 hover:bg-primary/3'>
						<Link href={`/jobs/${item.id}`}>
							<div className='flex gap-4 items-start '>
								<Avatar className='size-28 border overflow-hidden rounded-xs border-gray-200'>
									<AvatarImage className='size-full ' src={item.company.avatarUrl} alt='@user' />
								</Avatar>
								<div className='flex-1 space-y-2'>
									<div className='flex justify-between items-start '>
										<h3 className='line-clamp-2 max-w-md text-xl font-semibold hover:text-primary cursor-pointer'>{item.title}</h3>
										<p className='text-primary text-lg font-semibold border-primary'>{item.salary}</p>
									</div>
									<p className='text-gray-600'>{item.company.name}</p>
									<div className='flex  gap-2'>
										<Badge variant={'secondary'}>{item.areaTags.split(';')[0]}</Badge>
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
											<Link href={`/jobs`}>
												<Button size={'md'}>Ứng tuyển ngay</Button>
											</Link>
											<Button size={'md'} variant={'outline'}>
												<Bookmark></Bookmark>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
}
