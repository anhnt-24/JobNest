'use client';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Suspense, useEffect, useState } from 'react';
import { candidateService } from '@/service/candidate.service';
import { candidateSchema, UpdateCandidateReq } from '@/schema/candidate.schema';
import { toast } from 'sonner';
import LoadingCard from './skeleton';
export function Profile() {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<UpdateCandidateReq>({
		resolver: zodResolver(candidateSchema),
		defaultValues: {
			name: '',
			phone: '',
			dob: new Date(),
			gender: 'MALE',
		},
	});

	const [date, setDate] = useState<Date>();
	const { data: profile } = useSWR('/candidate/profile', () => candidateService.getProfile().then(res => res.data), { suspense: true });
	const onSubmit = async (data: UpdateCandidateReq) => {
		try {
			const payload = {
				...data,
				dob: data.dob,
			};
			await candidateService.updateProfile(payload);
			toast.success('Cập nhật hồ sơ thành công!');
		} catch (err: any) {
			console.log(err);
			toast.error('Có lỗi xảy ra!');
		}
	};

	useEffect(() => {
		if (profile) {
			reset({
				name: profile?.name || '',
				phone: profile?.phone || '',
				dob: new Date(profile?.dob),
				gender: profile?.gender,
			});
			setDate(new Date(profile?.dob));
		}
	}, [profile]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='name' required>
					Họ và tên
				</Label>
				<Input id='name' {...register('name')} placeholder='VD: Nguyễn Văn A' />
				{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='phone' required>
					Số điện thoại
				</Label>
				<Input id='phone' placeholder='Nhập số điện thoại' {...register('phone')} />
				{errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
			</div>
			<div className='space-y-2'>
				<Label htmlFor='dob'>Ngày sinh</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='w-full justify-start  border-gray-200  text-black'>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{date ? date.toLocaleDateString() : 'Chọn ngày sinh'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={d => {
								setDate(d);
								setValue('dob', d!);
							}}
							captionLayout='dropdown'
						/>
					</PopoverContent>
				</Popover>
				{errors.dob && <p className='text-red-500'>{errors.dob.message as string}</p>}
			</div>

			<div className='space-y-4'>
				<Label>Giới tính</Label>
				<Controller
					name='gender'
					control={control}
					render={({ field }) => (
						<RadioGroup value={field.value} onValueChange={field.onChange} className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='MALE' id='gender-male' />
								<Label htmlFor='gender-male'>Nam</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='FEMALE' id='gender-FEMALE' />
								<Label htmlFor='gender-FEMALE'>Nữ</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='OTHER' id='gender-OTHER' />
								<Label htmlFor='gender-OTHER'>Khác</Label>
							</div>
						</RadioGroup>
					)}
				/>
				{errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
			</div>

			<Button type='submit' className='w-full' loading={isSubmitting}>
				Lưu
			</Button>
		</form>
	);
}

function Page() {
	return (
		<Card>
			<CardTitle>Cài đặt thông tin cá nhân</CardTitle>
			<Suspense fallback={<LoadingCard></LoadingCard>}>
				<Profile></Profile>
			</Suspense>
		</Card>
	);
}

export default Page;
