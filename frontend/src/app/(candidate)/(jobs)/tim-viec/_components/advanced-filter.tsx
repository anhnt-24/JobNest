'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, Filter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdvancedFilter() {
	const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50]);

	return (
		<div className='  flex-1 bg-white border rounded-lg  overflow-hidden'>
			<div className='flex items-center gap-2 font-bold text-xl  border-b sticky top-0 bg-white p-4'>
				<Filter className='size-5 text-primary ' />
				Lọc nâng cao
			</div>
			<div className='p-4 max-h-250 overflow-y-auto space-y-4'>
				<div>
					<h3 className='mb-4'>Theo danh mục nghề</h3>
					<div className='space-y-4'>
						{['Sales Bán lẻ/Dịch vụ tiêu dùng', 'Kinh doanh/Bán hàng khác', 'Sales Giáo dục/Khoá học', 'Nhân sự', 'Quản lý kinh doanh'].map((item, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<Checkbox id={`cate-${idx}`} />
								<Label htmlFor={`cate-${idx}`}>{item}</Label>
							</div>
						))}
					</div>
				</div>

				<div>
					<h3 className='mb-4'>Kinh nghiệm</h3>
					<RadioGroup defaultValue='all' className='grid grid-cols-2 gap-2'>
						{['Tất cả', 'Không yêu cầu', 'Dưới 1 năm', '1 năm', '2 năm', '3 năm', '4 năm', '5 năm', 'Trên 5 năm'].map((exp, i) => (
							<div key={i} className='flex items-center space-x-2 space-y-2'>
								<RadioGroupItem value={exp} id={`exp-${i}`} />
								<Label htmlFor={`exp-${i}`}>{exp}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				<div>
					<h3 className='mb-4'>Cấp bậc</h3>
					<RadioGroup defaultValue='all' className='space-y-2'>
						{['Tất cả', 'Nhân viên', 'Trưởng nhóm', 'Trưởng/Phó phòng', 'Quản lý / Giám sát', 'Trưởng chi nhánh', 'Phó giám đốc', 'Giám đốc', 'Thực tập sinh'].map((level, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={level} id={`level-${i}`} />
								<Label htmlFor={`level-${i}`}>{level}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				{/* Mức lương */}
				<div>
					<h3 className='mb-4'>Mức lương (triệu)</h3>
					<RadioGroup defaultValue='all' className='grid grid-cols-2 gap-4'>
						{['Tất cả', 'Dưới 10', '10-15', '15-20', '20-25', '25-30', '30-50', 'Trên 50', 'Thỏa thuận'].map((sal, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={sal} id={`sal-${i}`} />
								<Label htmlFor={`sal-${i}`}>{sal}</Label>
							</div>
						))}
					</RadioGroup>

					{/* Slider chọn khoảng lương */}
					<div className='mt-4'>
						<Slider value={salaryRange} onValueChange={(val: [number, number]) => setSalaryRange(val)} min={0} max={100} step={5} />
						<p className='text-sm mt-2 text-gray-500'>
							Từ {salaryRange[0]} - {salaryRange[1]} triệu
						</p>
					</div>
				</div>

				{/* Lĩnh vực công ty */}
				<div>
					<h3 className='mb-2'>Lĩnh vực công ty</h3>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Tất cả lĩnh vực' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Tất cả lĩnh vực</SelectItem>
							<SelectItem value='it'>Công nghệ</SelectItem>
							<SelectItem value='finance'>Tài chính</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Lĩnh vực công việc */}
				<div>
					<h3 className='mb-2'>Lĩnh vực công việc</h3>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Tất cả lĩnh vực' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Tất cả lĩnh vực</SelectItem>
							<SelectItem value='sales'>Kinh doanh</SelectItem>
							<SelectItem value='marketing'>Marketing</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Hình thức làm việc */}
				<div>
					<h3 className='mb-4'>Hình thức làm việc</h3>
					<RadioGroup defaultValue='all' className='space-y-2'>
						{['Tất cả', 'Toàn thời gian', 'Bán thời gian', 'Thực tập', 'Khác'].map((type, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={type} id={`type-${i}`} />
								<Label htmlFor={`type-${i}`}>{type}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				<Button variant='outline' className='w-full'>
					Xóa lọc
				</Button>
			</div>
		</div>
	);
}
