'use client';
import { Suspense, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import RichTextEditor from '@/components/ui/custom/editor';
import MapPicker from '@/components/ui/map-picker';
import { CompanyRes, companySchema } from '@/schema/company.schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR from 'swr';
import { companyService } from '@/service/company.service';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingCard from '@/components/ui/custom/skeleton';
import { rest } from 'lodash';
import { candidateService } from '@/service/candidate.service';
import { json } from 'zod';

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className='flex items-center'>
			<Label className='w-32'>{label}</Label>
			<div className='flex-1'>{children}</div>
		</div>
	);
}

export default function CompanyForm() {
	const {
		control,
		reset,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(companySchema),
	});

	const { data: profile, mutate } = useSWR('/company/me', () => companyService.me().then(res => res.data));

	useEffect(() => {
		if (profile) {
			reset({
				name: profile.name,
				website: profile.website,
				phone: profile.phone || '',
				employeeCount: profile.employeeCount,
				industry: profile.industry,
				description: profile.description,
				addressDetail: profile.addressDetail,
				latitude: profile.latitude,
				longitude: profile.longitude,
			});
		}
	}, [profile]);

	const onSubmit = async (data: any) => {
		const res = await companyService.update(data);
		mutate(res.data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<Card>
				<CardTitle>Thông tin cơ bản </CardTitle>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Tên công ty:'>
						<div className='w-full'>
							<Input {...register('name')} placeholder='Nhập tên công ty' />
							{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
						</div>
					</FormRow>

					<FormRow label='Website:'>
						<div className='w-full'>
							<Input {...register('website')} placeholder='https://example.com' />
							{errors.website && <p className='text-red-500 text-sm'>{errors.website.message}</p>}
						</div>
					</FormRow>
				</div>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Email:'>
						<div className='w-full'>
							<Input type='email' value={profile?.user?.email || ''} disabled />
						</div>
					</FormRow>

					<FormRow label='Số điện thoại:'>
						<div className='w-full'>
							<Input {...register('phone')} placeholder='090xxxxxxx' />
							{errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
						</div>
					</FormRow>
				</div>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Số nhân viên:'>
						<div className='w-full'>
							<Input type='number' {...register('employeeCount', { valueAsNumber: true })} placeholder='Ví dụ: 50' />
							{errors.employeeCount && <p className='text-red-500 text-sm'>{errors.employeeCount.message}</p>}
						</div>
					</FormRow>

					<FormRow label='Lĩnh vực:'>
						<div className='w-full'>
							<Input {...register('industry')} placeholder='Ví dụ: Công nghệ, Thời trang...' />
							{errors.industry && <p className='text-red-500 text-sm'>{errors.industry.message}</p>}
						</div>
					</FormRow>
				</div>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<div>
							<RichTextEditor title='Giới thiệu' value={field.value} onChange={field.onChange} />
							{errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
						</div>
					)}
				/>
			</Card>
			<Card>
				<CardTitle>Địa điểm</CardTitle>
				<div className='  space-y-6'>
					<div className='space-y-6'>
						<FormRow label='Địa chỉ cụ thể:'>
							<div className='w-full'>
								<Textarea {...register('addressDetail')} placeholder='Ví dụ: Số 10, Ngõ 5, Đường ABC' />
								{errors.addressDetail && <p className='text-red-500 text-sm'>{errors.addressDetail.message}</p>}
							</div>
						</FormRow>
						<MapPicker />
					</div>

					<div className='flex justify-end'>
						<Button type='submit'>Lưu thông tin</Button>
					</div>
				</div>
			</Card>
		</form>
	);
}
