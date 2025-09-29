'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa6';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface EmployerFormProps {
	open: boolean;
	employer: any | null;
	onClose: () => void;
	onSave: (employer: any) => void;
}

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email'),
	phone: z.string().min(8, 'Phone is too short'),
	employeeId: z.string().min(1, 'Employee ID is required'),
	dob: z.string().min(1, 'Date of birth is required'),
	address: z.string().min(1, 'Address is required'),
	position: z.string().min(1, 'Position is required'),
	gender: z.enum(['male', 'female', 'other']),
	avatar: z.any().optional(),
});

export function EmployerForm({ employer, onClose, onSave, open }: EmployerFormProps) {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: employer?.name || '',
			email: employer?.email || '',
			phone: employer?.phone || '',
			employeeId: employer?.employeeId || '',
			dob: employer?.dob || '',
			address: employer?.address || '',
			position: employer?.position || '',
			avatar: null,
			gender: employer?.gender || 'male',
		},
	});

	useEffect(() => {
		if (employer) {
			form.reset({
				name: employer.name,
				email: employer.user.email,
				phone: employer.phone,
				employeeId: employer.employeeId,
				dob: employer.dob,
				address: employer.address,
				position: employer.position,
				avatar: null,
				gender: employer.gender,
			});
			setPreview(employer?.avatarUrl || null);
		} else {
			form.reset({
				name: '',
				email: '',
				phone: '',
				employeeId: '',
				dob: '',
				address: '',
				position: '',
				avatar: null,
				gender: 'male',
			});
		}
	}, [employer, form]);

	const [preview, setPreview] = useState<string | null>(employer?.avatarUrl || null);

	const handleSubmit = (values: z.infer<typeof schema>) => {
		onSave({
			...values,
			id: employer?.id,
		});
		onClose();
	};

	const handleFile = useCallback(
		(file: File) => {
			const url = URL.createObjectURL(file);
			setPreview(url);
			form.setValue('avatar', file);
		},
		[form]
	);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent side='right' className='w-250'>
				<SheetHeader>
					<SheetTitle className='font-bold'>{employer ? 'Sửa Employer' : 'Thêm Employer'}</SheetTitle>
					<SheetDescription>Nhập thông tin chi tiết của employer</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className=' space-y-6 px-6'>
						<FormField
							control={form.control}
							name='avatar'
							render={() => (
								<FormItem onClick={() => fileInputRef.current?.click()}>
									<FormLabel>Ảnh đại diện</FormLabel>
									<div
										onDragOver={e => e.preventDefault()}
										onDrop={handleDrop}
										className='flex flex-col items-center justify-center border-2  border-dashed rounded-lg p-6 cursor-pointer hover:bg-accent/50 transition bg-gray-50'>
										{preview ? (
											<img src={preview} alt='Preview' className='size-32 rounded-full object-cover mb-2 border' />
										) : (
											<div className='flex flex-col items-center text-center'>
												<FaUpload className='size-8 mb-2'></FaUpload>
												<p className='text-base font-semibold '>Kéo thả ảnh vào đây hoặc bấm để chọn </p>
												<p className='text-sm text-gray-400 '>Yêu cầu: file JPG, PNG, ≤ 2MB</p>
											</div>
										)}
										<Input
											ref={fileInputRef}
											type='file'
											accept='image/*'
											className='hidden'
											onChange={e => {
												const file = e.target.files?.[0];
												if (file) handleFile(file);
											}}
										/>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ và tên</FormLabel>
										<FormControl>
											<Input placeholder='Full name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Email address' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input placeholder='Phone number' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='employeeId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mã nhân viên</FormLabel>
										<FormControl>
											<Input placeholder='EMP-001' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='dob'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ngày sinh</FormLabel>
										<FormControl>
											<Input type='date' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='position'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vị trí</FormLabel>
										<FormControl>
											<Input placeholder='Position' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giới tính</FormLabel>
									<FormControl>
										<RadioGroup onValueChange={field.onChange} value={field.value} className='flex gap-4'>
											<FormItem className='flex items-center space-x-2'>
												<FormControl>
													<RadioGroupItem value='male' />
												</FormControl>
												<FormLabel className='font-normal'>Nam</FormLabel>
											</FormItem>

											<FormItem className='flex items-center space-x-2'>
												<FormControl>
													<RadioGroupItem value='female' />
												</FormControl>
												<FormLabel className='font-normal'>Nữ</FormLabel>
											</FormItem>

											<FormItem className='flex items-center space-x-2'>
												<FormControl>
													<RadioGroupItem value='other' />
												</FormControl>
												<FormLabel className='font-normal'>Khác</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa chỉ</FormLabel>
									<FormControl>
										<Input placeholder='Address' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className='flex justify-end gap-4'>
							<Button variant='outline' type='button' className='px-8'>
								Hủy
							</Button>
							<Button type='submit' className='flex-1'>
								Thêm
							</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
