'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { file, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Calendar as CalendarIcon, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import RichTextEditor from '@/components/ui/custom/editor';
import { CreateJobDto, JobSchema } from '@/schema/job.schema';
import { jobService } from '@/service/job.service';

const optionsCapBac = ['INTERN', 'FRESHER', 'JUNIOR', 'MID', 'SENIOR', 'MANAGER', 'DIRECTOR'];
const optionsHocVan = ['NONE', 'HIGH_SCHOOL', 'COLLEGE', 'BACHELOR', 'MASTER', 'DOCTORATE'];
const optionsHinhThuc = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'];
const optionsDanhMucNghe = ['Phần mềm', 'Kinh doanh', 'Marketing', 'Thiết kế', 'Sản xuất', 'Nhân sự', 'Tài chính', 'Vận hành'];
const optionsDiaDiem = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Huế', 'Khác'];

function MultiSelectCheckbox({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
	const [open, setOpen] = useState(false);
	const arr = value
		? value
				.split(';')
				.map(s => s.trim())
				.filter(Boolean)
		: [];
	const toggle = (opt: string) => {
		let newArr;
		if (arr.includes(opt)) {
			newArr = arr.filter(v => v !== opt);
		} else {
			newArr = [...arr, opt];
		}
		onChange(newArr.join(';'));
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='popover' role='combobox' className='w-full justify-between'>
					<div className='flex flex-wrap gap-2 items-center'>
						{value.length === 0 && <span className='font-normal'>{placeholder ?? 'Chọn'}</span>}
						{arr.map(v => (
							<Badge key={v} variant='secondary' className='text-xs'>
								{v}
								<X
									className='ml-1 h-3 w-3 cursor-pointer'
									onClick={e => {
										e.stopPropagation();
										toggle(v);
									}}
								/>
							</Badge>
						))}
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0 w-[320px]' align='start'>
				<Command>
					<CommandInput placeholder='Tìm kiếm...' />
					<CommandList>
						<CommandEmpty>Không có kết quả</CommandEmpty>
						<CommandGroup>
							{options.map(opt => (
								<CommandItem key={opt} onSelect={() => toggle(opt)} className='flex items-center gap-2'>
									<Checkbox checked={value.includes(opt)} className='pointer-events-none' />
									<span>{opt}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

function TagsInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
	const [draft, setDraft] = useState('');

	const arr = value
		? value
				.split(';')
				.map(s => s.trim())
				.filter(Boolean)
		: [];
	const add = (tag: string) => {
		const t = tag.trim();
		if (!t) return;

		if (!arr.includes(t)) {
			const newValue = [...arr, t].join(';');
			onChange(newValue);
		}

		setDraft('');
	};

	const remove = (tag: string) => {
		const arr = value
			? value
					.split(';')
					.map(s => s.trim())
					.filter(Boolean)
			: [];
		const newValue = arr.filter(v => v !== tag).join(';');
		onChange(newValue);
	};

	return (
		<div className='space-y-2'>
			<div className='flex flex-wrap gap-2'>
				{arr.map(v => (
					<Badge key={v} variant='secondary' className='text-xs'>
						{v}
						<X className='ml-1 size-4 cursor-pointer' onClick={() => remove(v)} />
					</Badge>
				))}
			</div>
			<div className='flex gap-2'>
				<Input
					value={draft}
					onChange={e => setDraft(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault();
							add(draft);
						}
					}}
					placeholder='Nhập và nhấn Enter để thêm'
				/>
				<Button type='button' variant='secondary' onClick={() => add(draft)}>
					<Plus className='h-4 w-4' /> Thêm
				</Button>
			</div>
		</div>
	);
}

export default function JobCreateForm() {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm({
		resolver: zodResolver(JobSchema),
		defaultValues: {
			title: '',
			description: '',
			requirements: '',
			benefits: '',
			workingAddress: '',
			workingTime: '',
			applicationMethod: '',
			salary: '',
			experience: '',
			quantity: 1,
			level: 'JUNIOR',
			education: 'BACHELOR',
			type: 'FULL_TIME',
			categories: '',
			mustSkills: '',
			niceSkills: '',
			areaTags: '',
			deadline: undefined,
		},
	});

	const onSubmit = async (values: CreateJobDto) => {
		setIsLoading(true);
		await jobService.create(values);
		setIsLoading(false);
		form.reset();
	};

	return (
		<Card>
			<h1 className='border-l-6 border-primary px-2'>Tạo tin tuyển dụng</h1>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='grid grid-cols-4 gap-6 items-start'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vị trí</FormLabel>
										<FormControl>
											<Input placeholder='VD: Backend Engineer' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='salary'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Lương từ</FormLabel>
										<FormControl>
											<Input placeholder='VD: Thỏa thuận' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='workingAddress'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Địa điểm</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Chọn địa điểm' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{optionsDiaDiem.map(o => (
													<SelectItem key={o} value={o}>
														{o}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='experience'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kinh nghiệm</FormLabel>
										<Input {...field} placeholder='VD: 6 năm+'></Input>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='deadline'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Hạn nộp hồ sơ</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={'outline'} className={cn('pl-3 border-gray-200 ', !field.value && 'text-muted-foreground')}>
														<CalendarIcon className='mr-2 h-4 w-4' />
														{field.value ? field.value.toLocaleDateString() : <span>Chọn ngày</span>}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='level'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cấp bậc</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Chọn cấp bậc' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{optionsCapBac.map(o => (
													<SelectItem key={o} value={o}>
														{o}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='education'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Học vấn</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Chọn học vấn' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{optionsHocVan.map(o => (
													<SelectItem key={o} value={o}>
														{o}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='quantity'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số lượng</FormLabel>
										<FormControl>
											<Input inputMode='numeric' placeholder='VD: 3' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hình thức làm việc</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Chọn hình thức' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{optionsHinhThuc.map(o => (
												<SelectItem key={o} value={o}>
													{o}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-3 gap-6'>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Mô tả công việc' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='requirements'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Yêu cầu ứng viên' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='benefits'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Quyền lợi' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='workingAddress'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Địa điểm làm việc' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='workingTime'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Thời gian làm việc' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='applicationMethod'
								render={({ field }) => (
									<FormItem>
										<RichTextEditor title='Cách thức làm việc' value={field.value} onChange={field.onChange} />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-4 gap-6'>
							{/* Danh mục nghề liên quan (multi) */}
							<FormField
								control={form.control}
								name='categories'
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Danh mục nghề liên quan</FormLabel>
										<FormControl>
											<MultiSelectCheckbox value={field.value} onChange={field.onChange} options={optionsDanhMucNghe} placeholder='Chọn danh mục' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='mustSkills'
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Kỹ năng cần có</FormLabel>
										<FormControl>
											<TagsInput value={field.value} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='niceSkills'
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Kỹ năng nên có</FormLabel>
										<FormControl>
											<TagsInput value={field.value || ''} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='areaTags'
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Thẻ các khu vực</FormLabel>
										<FormControl>
											<TagsInput value={field.value} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='md:col-span-2 flex items-center justify-end gap-3'>
							<Button type='button' variant='outline' onClick={() => form.reset()} className='px-12'>
								Làm mới
							</Button>
							<Button type='submit' className='px-12'>
								Tạo tin
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
