import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, MapPin, ExternalLink, Trash2, HeartPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/components/ui/avatar';
import CustomPagination from '@/components/candidate/custom-pagination';
import { Input } from '@/components/ui/input';
export function SuggestedJobs() {
	return (
		<div className='space-y-2 px-4'>
			<div className=' pb-2'>
				<h2>Việc làm phù hợp</h2>
				<p className='text-gray-600'>Những công việc phù hợp nhất với bạn dựa trên mong muốn, kỹ năng và kinh nghiệm.</p>
			</div>

			<div className='space-y-4'>
				<div className='p-4 hover:shadow-md transition-shadow border hover:bg-primary/10  bg-primary/5  '>
					<div className='space-y-2'>
						<div className='flex gap-2 items-start'>
							<Avatar className='size-24 rounded-xs border border-gray-200 overflow-hidden'>
								<AvatarImage className='size-full' src='/image.png' alt='@user' />
							</Avatar>
							<div className='flex-1 space-y-1'>
								<div className='flex justify-between '>
									<h3 className='line-clamp-2 max-w-md'>Nhân Viên Vận Hành Sàn Thương Mại Điện Tử (Thu Nhập Lên Đến 60+++)</h3>
									<p className='text-primary text-lg font-semibold border-primary mt-2'>30 - 60 triệu</p>
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
							<div className='flex gap-2 justify-center'>
								<Button size={'md'} className='rounded-xs'>
									Ứng tuyển ngay
								</Button>
								<Button size={'md'} variant={'outline'} className='rounded-xs'>
									<Bookmark></Bookmark>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuggestedJobs;
