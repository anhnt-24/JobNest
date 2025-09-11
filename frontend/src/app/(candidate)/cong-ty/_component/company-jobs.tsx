'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Clock, HeartPlus } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomPagination from '@/components/candidate/custom-pagination';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
export default function CompanyJobs() {
	return (
		<Card className='p-0 pb-6 overflow-hidden'>
			{/* Header */}
			<h2 className='text-white bg-gradient-to-r from-red-950 to-primary p-4  font-semibold'>Tuyển dụng</h2>

			{/* Search form */}
			<CardContent className='space-y-4'>
				<div className='flex flex-col sm:flex-row gap-3  items-center'>
					{/* Input */}
					<div className='flex items-center w-full sm:w-1/2 border rounded-lg px-2'>
						<Search className='size-5 text-gray-400 ' />
						<Input type='text' placeholder='Tên công việc, vị trí ứng tuyển...' className='flex-1 border-none shadow-none ' />
					</div>

					{/* Select */}
					<div className='flex items-center w-full sm:w-1/3 border rounded-lg px-3 '>
						<MapPin className='size-5 text-gray-400 ' />
						<Select defaultValue='all'>
							<SelectTrigger className='flex-1 border-none shadow-none'>
								<SelectValue placeholder='Tất cả tỉnh/thành phố' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả tỉnh/thành phố</SelectItem>
								<SelectItem value='hanoi'>Hà Nội</SelectItem>
								<SelectItem value='hcm'>Hồ Chí Minh</SelectItem>
								<SelectItem value='danang'>Đà Nẵng</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Button */}
					<Button>
						<Search className='size-4' />
						Tìm kiếm
					</Button>
				</div>

				{/* Empty state */}
				<div className='hidden flex-col items-center justify-center py-12 text-gray-400'>
					<Image src='/empty.png' alt='No jobs' width={200} height={200} className='mb-4' />
					<p className='text-sm'>Chưa tìm thấy việc làm phù hợp yêu cầu tìm kiếm của bạn</p>
				</div>

				<Card className='p-6 hover:shadow-md transition-shadow border hover:border-primary '>
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
			</CardContent>
			<CustomPagination></CustomPagination>
		</Card>
	);
}
