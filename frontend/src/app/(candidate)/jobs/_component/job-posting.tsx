'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bookmark, Check, ChevronDown, ChevronRight, Clock, Clock3, Coins, Eye, HeartPlus, MapPin, Pin, Search, TimerIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { JobResponse } from '@/schema/job.schema';
import { FaBookmark } from 'react-icons/fa';

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

export default function JobPosting({ id }: { id: number }) {
	const { data: job } = useSWR(id ? `/jobs/${id}` : null, () => jobService.getById(Number(id)).then(res => res.data), { suspense: true, fallbackData: fallbackJob });
	const { data: savedJobs, mutate } = useSWR(id ? `/jobs/${id}/toggle-save` : null, () => jobService.isJobSaved(Number(id)).then(res => res.data), { suspense: true, fallbackData: false });

	const handleApplyJob = () => {};

	const handleSaveJob = async () => {
		await jobService.toggleSave(id);
		mutate(!!savedJobs);
	};
	return (
		<>
			<Card>
				<h1 className='text-2xl'>{job.title}</h1>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='flex items-center gap-4'>
						<div className='size-12 flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary/40 '>
							<Coins className='text-primary-foreground'></Coins>
						</div>
						<div>
							<p className='text-muted-foreground'>Mức lương</p>
							<p className='font-medium'>{job.salary}</p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<div className='size-12 flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary/40 '>
							<MapPin className='text-primary-foreground '></MapPin>
						</div>
						<div>
							<p className='text-muted-foreground'>Địa điểm </p>
							<p className='font-medium'>{job.workingAddress} </p>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<div className='size-12 flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary/40 '>
							<TimerIcon className='text-primary-foreground '></TimerIcon>
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
					<Button className='flex-1 '>
						<Check className='h-4 w-4 mr-2' /> Ứng tuyển ngay
					</Button>
					<Button onClick={handleSaveJob} variant='outline' className='px-3'>
						<Bookmark className={`size-5 ${savedJobs && 'fill-primary'} `} />
						Lưu tin
					</Button>
				</div>
			</Card>
			<Card>
				<div className='space-y-2'>
					<h1 className='border-l-6 border-primary px-2'>Ứng viên cũng tìm kiếm</h1>
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
					<h1 className='border-l-6 border-primary px-2'>Chi tiết tin tuyển dụng</h1>
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
							<Button onClick={handleSaveJob} variant='outline' className='px-3'>
								<Bookmark className={`size-5 ${savedJobs && 'fill-primary'} `} />
								Lưu tin
							</Button>
							<Button onClick={handleApplyJob}>Ứng tuyển ngay</Button>
						</div>
					</div>

					<Button variant='outline' size={'sm'} className='self-start'>
						Xem số người đã ứng tuyển <ChevronDown className='h-4 w-4 ml-1' />
					</Button>
				</CardFooter>
			</Card>
			<Card>
				<h1>Việc làm liên quan</h1>
				<Card className='p-6 hover:shadow-md transition-shadow border  hover:border-primary '>
					<div className='space-y-2'>
						<div className='flex gap-2 items-start'>
							<Avatar className='size-24 border border-gray-200'>
								<AvatarImage className='size-full' src='/image.png' alt='@user' />
							</Avatar>
							<div className='flex-1 space-y-2'>
								<div className='flex justify-between '>
									<h3 className=' line-clamp-2 max-w-md'>Nhân Viên Vận Hành Sàn Thương Mại Điện Tử (Thu Nhập Lên Đến 60+++)</h3>
									<p className='text-red-500 font-semibold border-red-500 mt-2'>30 - 60 triệu</p>
								</div>
								<p className='text-gray-600'>Công ty Cổ phần Anna Lee Group</p>
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
							<div className='flex gap-4 justify-center'>
								<Button>Ứng tuyển ngay</Button>
								<button className='rounded-full border border-red-600 text-red-600 size-10 p-2'>
									<HeartPlus size={18}></HeartPlus>
								</button>
							</div>
						</div>
					</div>
				</Card>
			</Card>
		</>
	);
}
