import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CandidateFilters() {
	return (
		<aside className='col-span-12 md:col-span-3'>
			<Card>
				<CardHeader>
					<CardTitle>Bộ lọc ứng viên</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{/* Ngành nghề */}
					<div>
						<Label className='block mb-2'>Ngành nghề</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn ngành nghề' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả</SelectItem>
								<SelectItem value='it'>Công nghệ thông tin</SelectItem>
								<SelectItem value='marketing'>Marketing</SelectItem>
								<SelectItem value='finance'>Tài chính - Kế toán</SelectItem>
								<SelectItem value='education'>Giáo dục</SelectItem>
								<SelectItem value='health'>Y tế</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Địa chỉ */}
					<div>
						<Label className='block mb-2'>Địa chỉ</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn địa chỉ' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả</SelectItem>
								<SelectItem value='hanoi'>Hà Nội</SelectItem>
								<SelectItem value='hcm'>Hồ Chí Minh</SelectItem>
								<SelectItem value='danang'>Đà Nẵng</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Giới tính */}
					<div>
						<Label className='mb-4'>Giới tính</Label>
						<RadioGroup defaultValue='all'>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='all' id='all' />
								<Label htmlFor='all'>Tất cả</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='male' id='male' />
								<Label htmlFor='male'>Nam</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='female' id='female' />
								<Label htmlFor='female'>Nữ</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='other' id='other' />
								<Label htmlFor='other'>Khác</Label>
							</div>
						</RadioGroup>
					</div>

					{/* Độ tuổi */}
					<div>
						<Label className='block mb-2'>Độ tuổi</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn độ tuổi' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả</SelectItem>
								<SelectItem value='18-25'>18 - 25</SelectItem>
								<SelectItem value='26-35'>26 - 35</SelectItem>
								<SelectItem value='36-45'>36 - 45</SelectItem>
								<SelectItem value='46+'>Trên 45</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Kinh nghiệm */}
					<div>
						<Label className='block mb-2 '>Kinh nghiệm</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn kinh nghiệm' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả</SelectItem>
								<SelectItem value='0'>Chưa có kinh nghiệm</SelectItem>
								<SelectItem value='1-2'>1 - 2 năm</SelectItem>
								<SelectItem value='3-5'>3 - 5 năm</SelectItem>
								<SelectItem value='5+'>Trên 5 năm</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Học vấn */}
					<div>
						<Label className='block mb-2'>Trình độ học vấn</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn học vấn' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả</SelectItem>
								<SelectItem value='highschool'>Trung học</SelectItem>
								<SelectItem value='college'>Cao đẳng</SelectItem>
								<SelectItem value='bachelor'>Đại học</SelectItem>
								<SelectItem value='master'>Thạc sĩ</SelectItem>
								<SelectItem value='phd'>Tiến sĩ</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button variant='secondary' size='sm'>
						Xóa bộ lọc
					</Button>
				</CardContent>
			</Card>
		</aside>
	);
}
