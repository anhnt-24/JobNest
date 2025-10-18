'use client';

import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';
import { JobListQuery } from '@/schema/job.schema';

interface AdvancedFilterProps {
	filter: JobListQuery;
	setFilter: React.Dispatch<React.SetStateAction<JobListQuery>>;
}

export default function AdvancedFilter({ filter, setFilter }: AdvancedFilterProps) {
	const [salaryRange, setSalaryRange] = useState<[number, number]>([filter.salaryFrom ?? 0, filter.salaryTo ?? 50]);

	const handleChange = <K extends keyof JobListQuery>(key: K, value: JobListQuery[K]) => {
		setFilter(prev => ({ ...prev, [key]: value, page: 1 })); // reset page khi lọc
	};

	const handleClear = () => {
		setFilter(prev => ({
			...prev,
			level: undefined,
			type: undefined,
			education: undefined,
			experience: undefined,
			status: undefined,
			salaryFrom: undefined,
			salaryTo: undefined,
			category: undefined,
			workingAddress: undefined,
			page: 1,
		}));
		setSalaryRange([0, 50]);
	};
	useEffect(() => {
		const timeout = setTimeout(() => {
			setFilter(prev => ({
				...prev,
				salaryFrom: salaryRange[0],
				salaryTo: salaryRange[1],
				page: 1,
			}));
		}, 400);

		return () => clearTimeout(timeout);
	}, [salaryRange, setFilter]);

	return (
		<div className='  sticky top-46'>
			<div className='flex items-center gap-2 font-bold text-xl border-b  p-4 '>
				<Filter className='size-5 text-primary' />
				Lọc nâng cao
			</div>

			<div className='p-4 max-h-200 overflow-y-auto space-y-4 '>
				<div>
					<h3 className='mb-2 font-semibold'>Danh mục nghề</h3>
					<Select value={filter.category ?? 'all'} onValueChange={val => handleChange('category', val === 'all' ? undefined : val)}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Tất cả danh mục' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Tất cả</SelectItem>
							<SelectItem value='Sales'>Kinh doanh / Bán hàng</SelectItem>
							<SelectItem value='HR'>Nhân sự</SelectItem>
							<SelectItem value='IT'>Công nghệ thông tin</SelectItem>
							<SelectItem value='Marketing'>Marketing</SelectItem>
							<SelectItem value='Finance'>Tài chính / Kế toán</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Cấp bậc */}
				<div className='space-y-4'>
					<h3 className=' font-semibold'>Cấp bậc</h3>
					<RadioGroup value={filter.level ?? 'none'} onValueChange={val => handleChange('level', val === 'none' ? undefined : (val as any))} className='grid grid-cols-2 gap-4'>
						{[
							{ value: 'none', label: 'Tất cả' },
							{ value: 'INTERN', label: 'Thực tập sinh' },
							{ value: 'FRESHER', label: 'Mới tốt nghiệp' },
							{ value: 'JUNIOR', label: 'Nhân viên' },
							{ value: 'MID', label: 'Chuyên viên' },
							{ value: 'SENIOR', label: 'Cao cấp' },
							{ value: 'MANAGER', label: 'Quản lý' },
							{ value: 'DIRECTOR', label: 'Giám đốc' },
						].map((lvl, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={lvl.value} id={`level-${i}`} />
								<Label htmlFor={`level-${i}`}>{lvl.label}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				{/* Hình thức làm việc */}
				<div>
					<h3 className='mb-4 font-semibold'>Hình thức làm việc</h3>
					<RadioGroup value={filter.type ?? 'none'} onValueChange={val => handleChange('type', val === 'none' ? undefined : (val as any))} className='grid grid-cols-2 gap-4'>
						{[
							{ value: 'none', label: 'Tất cả' },
							{ value: 'FULL_TIME', label: 'Toàn thời gian' },
							{ value: 'PART_TIME', label: 'Bán thời gian' },
							{ value: 'CONTRACT', label: 'Hợp đồng' },
							{ value: 'FREELANCE', label: 'Tự do' },
							{ value: 'INTERNSHIP', label: 'Thực tập' },
						].map((type, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={type.value} id={`type-${i}`} />
								<Label htmlFor={`type-${i}`}>{type.label}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				{/* Kinh nghiệm */}
				<div>
					<h3 className='mb-4 font-semibold'>Kinh nghiệm</h3>
					<RadioGroup value={filter.experience ?? 'none'} onValueChange={val => handleChange('experience', val === 'none' ? undefined : (val as any))} className='grid grid-cols-2 gap-4'>
						{[
							{ value: 'none', label: 'Tất cả' },
							{ value: 'NONE', label: 'Chưa có kinh nghiệm' },
							{ value: 'SIX_MONTH', label: 'Dưới 6 tháng' },
							{ value: 'ONE_TWO_YEARS', label: '1 - 2 năm' },
							{ value: 'TWO_THREE_YEARS', label: '2 - 3 năm' },
							{ value: 'THREE_FIVE_YEARS', label: '3 - 5 năm' },
							{ value: 'FIVE_PLUS', label: 'Trên 5 năm' },
						].map((exp, i) => (
							<div key={i} className='flex items-center space-x-2'>
								<RadioGroupItem value={exp.value} id={`exp-${i}`} />
								<Label htmlFor={`exp-${i}`}>{exp.label}</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				{/* Mức lương */}
				<div>
					<h3 className='mb-4 font-semibold'>Mức lương (triệu đồng)</h3>
					<Slider value={salaryRange} onValueChange={(val: [number, number]) => setSalaryRange(val)} min={0} max={100} step={5} />
					<p className='text-sm mt-2 text-gray-500'>
						Từ {salaryRange[0]} - {salaryRange[1]} triệu
					</p>
				</div>

				{/* Địa điểm làm việc */}
				<div>
					<h3 className='mb-2 font-semibold'>Địa điểm làm việc</h3>
					<Select value={filter.workingAddress ?? 'all'} onValueChange={val => handleChange('workingAddress', val === 'all' ? undefined : val)}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Tất cả địa điểm' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Tất cả</SelectItem>
							<SelectItem value='Hà Nội'>Hà Nội</SelectItem>
							<SelectItem value='Hồ Chí Minh'>Hồ Chí Minh</SelectItem>
							<SelectItem value='Đà Nẵng'>Đà Nẵng</SelectItem>
							<SelectItem value='Cần Thơ'>Cần Thơ</SelectItem>
							<SelectItem value='Bắc Giang'>Bắc Giang</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className='w-full font-semibold  ' onClick={handleClear}>
					Xóa bộ lọc
				</Button>
			</div>
		</div>
	);
}
