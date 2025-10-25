'use client';
import { Suspense, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import MapPicker from '@/components/ui/map-picker';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { companyService } from '@/service/company.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyReq, CompanySchema } from '@/schema/company.schema';
import { toast } from 'sonner';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

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
	} = useForm({
		resolver: zodResolver(CompanySchema),
	});

	const { data: profile, mutate } = useSWR('/company/me', () => companyService.me().then(res => res.data));
	const [coords, setCoords] = useState<[number, number]>([21.0278, 105.8342]);
	useEffect(() => {
		if (profile) {
			reset({
				...profile,
				name: profile.user.name,
				phone: profile.user.phone,
			});
			setCoords([profile.latitude, profile.longitude]);
		}
	}, [profile]);
	console.log(errors);
	const onSubmit = async (data: CompanyReq) => {
		try {
			const payload: CompanyReq = {
				...data,
				latitude: coords[0],
				longitude: coords[1],
			};
			const res = await companyService.update(payload);
			mutate(res.data);
			toast.success('Cập nhật thành công');
		} catch {
			toast.error('Cập nhật thất bại.');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<Card>
				<CardTitle>Thông tin cơ bản </CardTitle>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Tên công ty:'>
						<div className='w-full'>
							<Input {...register('name')} placeholder='Nhập tên công ty' />
							{errors.name && <p className='text-red-500 '>{errors.name.message}</p>}
						</div>
					</FormRow>

					<FormRow label='Website:'>
						<div className='w-full'>
							<Input {...register('website')} placeholder='https://example.com' />
							{errors.website && <p className='text-red-500 '>{errors.website.message}</p>}
						</div>
					</FormRow>
				</div>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Email:'>
						<div className='w-full'>
							<Input type='email' value={profile?.user?.email} disabled />
						</div>
					</FormRow>

					<FormRow label='Số điện thoại:'>
						<div className='w-full'>
							<Input {...register('phone')} placeholder='090xxxxxxx' />
							{errors.phone && <p className='text-red-500 '>{errors.phone.message}</p>}
						</div>
					</FormRow>
				</div>

				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Số nhân viên:'>
						<div className='w-full'>
							<Input type='number' {...register('employeeCount', { valueAsNumber: true })} placeholder='Ví dụ: 50' />
							{errors.employeeCount && <p className='text-red-500 '>{errors.employeeCount.message}</p>}
						</div>
					</FormRow>

					<FormRow label='Lĩnh vực:'>
						<div className='w-full'>
							<Input {...register('industry')} placeholder='Ví dụ: Công nghệ, Thời trang...' />
							{errors.industry && <p className='text-red-500 '>{errors.industry.message}</p>}
						</div>
					</FormRow>
				</div>
				<div className='grid gap-8 grid-cols-2'>
					<FormRow label='Mã số thuế:'>
						<div className='w-full'>
							<Input {...register('taxCode')} placeholder='Ví dụ: 0311936031-002' />
							{errors.taxCode && <p className='text-red-500 '>{errors.taxCode.message}</p>}
						</div>
					</FormRow>
				</div>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<div>
							<Label className='my-4'>Giới thiệu: </Label>
							<SimpleEditor content={field.value} setContent={field.onChange} />
							{errors.description && <p className='text-red-500 '>{errors.description.message}</p>}
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
								<Textarea {...register('address')} placeholder='Ví dụ: Số 10, Ngõ 5, Đường ABC' />
								{errors.address && <p className='text-red-500 '>{errors.address.message}</p>}
							</div>
						</FormRow>
						<MapPicker coords={coords} setCoords={setCoords} />
					</div>

					<div className='flex justify-end'>
						<Button type='submit'>Lưu thông tin</Button>
					</div>
				</div>
			</Card>
		</form>
	);
}
