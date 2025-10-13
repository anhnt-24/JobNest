import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bookmark, Check, ChevronDown, ChevronRight, Clock, Clock3, Coins, Eye, HeartPlus, MapPin, Pin, Search, TimerIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { FaBookmark } from 'react-icons/fa';
import { FaClock, FaCoins, FaCreditCard, FaLocationDot, FaUserClock } from 'react-icons/fa6';
import { ApplyJobDialog } from '@/components/candidate/apply-job-diaglog';
import { SaveJobButton } from '../../../../../components/ui/custom/save-job-btn';
import { JobRes } from '@/schema/job.schema';

export default async function JobPosting({ job }: { job: JobRes }) {
	return (
		<>
			<Card>
				<h2>{job.title}</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='flex items-center gap-4'>
						<div className='size-12 flex items-center justify-center rounded-full bg-primary '>
							<FaCoins className='size-6 text-primary-foreground'></FaCoins>
						</div>
						<div>
							<p className='text-muted-foreground'>Mức lương</p>
							<p className='font-medium'>{job.salary}</p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<div className='size-12 flex items-center justify-center rounded-full bg-primary '>
							<FaLocationDot className='size-6 text-primary-foreground '></FaLocationDot>
						</div>
						<div>
							<p className='text-muted-foreground'>Địa điểm </p>
							<p className='font-medium'>{job.workingAddress} </p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<div className='size-12 min-w-12 flex items-center justify-center rounded-full bg-primary '>
							<FaUserClock className='text-primary-foreground size-6' />
						</div>
						<div>
							<p className='text-muted-foreground'>Kinh nghiệm</p>
							<p className='font-medium'>{job.experience}</p>
						</div>
					</div>
				</div>
				<div className=' flex items-center space-x-2'>
					<Button variant='outline' size={'sm'} className=' text-primary'>
						<Eye></Eye>
						Xem số người đã ứng tuyển
					</Button>
					<Badge variant={'secondary'} className=' text-sm '>
						<Clock3 className='size-4 '></Clock3>
						Hạn nộp hồ sơ: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}
					</Badge>
				</div>

				<div className='flex gap-2 w-full '>
					<ApplyJobDialog job={job} className='flex-1'></ApplyJobDialog>
					<SaveJobButton jobId={job.id}></SaveJobButton>
				</div>
			</Card>
			<Card>
				<div className='space-y-2'>
					<h2 className='border-l-4 border-primary px-2 py-0'>Ứng viên cũng tìm kiếm</h2>
					<p className='text-base text-muted-foreground '>Ứng viên xem việc làm này cũng tìm kiếm các từ khóa sau:</p>
				</div>
				<button className='flex border hover:border-primary hover:bg-primary/5 cursor-pointer bg-gray-100 w-fit rounded-4xl px-4 py-1 items-center gap-2 hover:text-primary'>
					<Search className='size-5 text-gray-600' />
					<div className=' text-start'>
						<p className='font-medium'>Giám Đốc Điều Hành</p>
						<p className='text-sm text-gray-500'>154 việc làm</p>
					</div>
					<ArrowRight className='size-5 text-gray-600'></ArrowRight>
				</button>
			</Card>
			<Card>
				<div className='space-y-2'>
					<h2 className='border-l-4 border-primary px-2 py-0'>Chi tiết tin tuyển dụng</h2>
					<Badge variant={'secondary'}>Chuyên môn {job.title}</Badge>
				</div>
				<CardContent className='space-y-6'>
					<div>
						<h3 className='text-lg font-semibold mb-3'>Mô tả công việc</h3>
						<p>{job.description}</p>
					</div>
					<Separator />
					<div>
						<h3 className='text-lg font-semibold mb-3'>Yêu cầu ứng viên</h3>
						<p>{job.requirements}</p>
					</div>
					<Separator />
					<div>
						<h3 className='text-lg font-semibold mb-3'>Quyền lợi</h3>
						<p>{job.benefits}</p>
					</div>
					<Separator />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<h3 className='text-lg font-semibold mb-3'>Địa điểm làm việc</h3>
							<p>{job.workingAddress}</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold mb-3'>Thời gian làm việc</h3>
							<p>{job.workingTime}</p>
						</div>
					</div>

					<Separator />
					<div>
						<h3 className='text-lg font-semibold mb-3'>Cách thức ứng tuyển</h3>
						<p>{job.applicationMethod}</p>
					</div>
				</CardContent>

				<CardFooter className='flex flex-col gap-4'>
					<div className='flex justify-between items-center w-full'>
						<p className=''>Hạn nộp hồ sơ: 30/09/2025</p>
						<div className='flex gap-2'>
							<SaveJobButton jobId={job.id}></SaveJobButton>
							<Button>Ứng tuyển ngay</Button>
						</div>
					</div>

					<Button variant='outline' size={'sm'} className='self-start'>
						Xem số người đã ứng tuyển <ChevronDown className='h-4 w-4 ml-1' />
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
