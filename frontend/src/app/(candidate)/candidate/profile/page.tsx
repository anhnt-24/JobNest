'use client';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Suspense, useEffect, useState } from 'react';
import { CandidateProfileResponse, CandidateSchema, UpdateCandidateDto } from '@/schema/candidate.schema';
import { candidateService } from '@/service/candidate.service';
import LoadingCard from './skeleton';
const fallbackProfile: CandidateProfileResponse = {
	name: '',
	phone: '',
	birthday: new Date('2000-01-01'),
	gender: 'male',
	id: 0,
	userId: 0,
	createdAt: new Date('2000-01-01'),
	updatedAt: new Date('2000-01-01'),
};

export function Profile() {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<UpdateCandidateDto>({
		resolver: zodResolver(CandidateSchema),
		defaultValues: {
			name: '',
			phone: '',
			birthday: new Date(),
			gender: 'male',
		},
	});

	const [date, setDate] = useState<Date>();
	const { data: profile } = useSWR('/candidate/profile', () => candidateService.getProfile().then(res => res.data), {
		suspense: true,
		fallbackData: fallbackProfile,
	});
	const onSubmit = async (data: UpdateCandidateDto) => {
		const payload = {
			...data,
			birthday: data.birthday,
		};
		await candidateService.updateProfile(payload);
	};

	useEffect(() => {
		if (profile) {
			reset({
				name: profile?.name || '',
				phone: profile?.phone || '',
				birthday: new Date(profile?.birthday),
				gender: profile?.gender,
			});
			setDate(new Date(profile?.birthday));
		}
	}, [profile]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='name'>
					Họ và tên<span className='text-red-600'>*</span>
				</Label>
				<Input id='name' {...register('name')} />
				{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='phone'>Số điện thoại</Label>
				<Input id='phone' placeholder='Nhập số điện thoại' {...register('phone')} />
				{errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='dob'>Ngày sinh</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='w-full justify-start text-left font-normal border-gray-200  text-black'>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{date ? date.toLocaleDateString() : 'Chọn ngày sinh'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={d => {
								setDate(d);
								setValue('birthday', d!);
							}}
							captionLayout='dropdown'
						/>
					</PopoverContent>
				</Popover>
				{errors.birthday && <p className='text-red-500'>{errors.birthday.message as string}</p>}
			</div>

			<div className='space-y-4'>
				<Label>Giới tính</Label>
				<Controller
					name='gender'
					control={control}
					render={({ field }) => (
						<RadioGroup value={field.value} onValueChange={field.onChange} className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='male' id='gender-male' />
								<Label htmlFor='gender-male'>Nam</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='female' id='gender-female' />
								<Label htmlFor='gender-female'>Nữ</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='other' id='gender-other' />
								<Label htmlFor='gender-other'>Khác</Label>
							</div>
						</RadioGroup>
					)}
				/>
				{errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
			</div>

			<Button type='submit' className='w-full' disabled={isSubmitting}>
				{isSubmitting ? 'Đang lưu...' : 'Lưu'}
			</Button>
		</form>
	);
}

export default function Page() {
	return (
		<Card>
			<CardTitle>Cài đặt thông tin cá nhân</CardTitle>
			<Suspense fallback={<LoadingCard></LoadingCard>}>
				<Profile></Profile>
			</Suspense>
		</Card>
	);
}
