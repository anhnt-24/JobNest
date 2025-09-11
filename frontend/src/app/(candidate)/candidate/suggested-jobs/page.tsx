import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2, HeartPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import CustomPagination from '@/components/candidate/custom-pagination';
export function SavedJobs() {
	return (
		<Card className=' p-6'>
			<div className='space-y-2 border-b pb-4'>
				<h1>Việc làm phù hợp</h1>
				<p className='text-gray-600'>Những công việc phù hợp nhất với bạn dựa trên mong muốn, kỹ năng và kinh nghiệm.</p>
			</div>

			<div className='space-y-4'>
				<p className='text-gray-500'>
					Danh sách <span className='font-semibold text-primary'>2</span> việc làm đã lưu
				</p>

				<Card className='p-6 hover:shadow-md transition-shadow border bg-primary/5 hover:border-primary '>
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
			</div>
			<CustomPagination />
		</Card>
	);
}

export default SavedJobs;
