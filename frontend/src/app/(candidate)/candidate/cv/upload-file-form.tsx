'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FaUpload } from 'react-icons/fa6';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { cvService } from '@/service/cvs.service';

const formSchema = z.object({
	title: z.string().min(1, 'Vui lòng nhập tiêu đề CV'),
	file: z
		.instanceof(File)
		.nullable()
		.refine(file => file !== null, 'Vui lòng chọn file')
		.refine(f => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f!.type), 'File không hợp lệ')
		.refine(f => f!.size <= 5 * 1024 * 1024, 'Kích thước file tối đa 5MB'),
});

type FormData = z.infer<typeof formSchema>;

export function UploadCvModal() {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			file: null,
		},
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		watch,
	} = form;

	const file = watch('file');

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				setValue('file', acceptedFiles[0], { shouldValidate: true });
			}
		},
		[setValue]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			'application/pdf': ['.pdf'],
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
		},
		maxSize: 5 * 1024 * 1024,
	});

	const onSubmit = async (data: FormData) => {
		try {
			if (!data.file) return;
			await cvService.create(data.file, data.title);
			toast.success('Tải lên CV thành công!');
			window.location.reload();
		} catch (error) {
			toast.error('Tải lên thất bại!');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='rounded-full'>
					<FaUpload className='size-4' /> Tải lên
				</Button>
			</DialogTrigger>

			<DialogContent className='max-w-3xl'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='title' required>
							Tiêu đề
						</Label>
						<Input id='title' {...register('title')} placeholder='Nhập tiêu đề CV' />
						{errors.title && <p className='text-red-500 '>{errors.title.message}</p>}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='file' required>
							Chọn file CV
						</Label>

						<Card {...getRootProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-2xl transition border-primary hover:bg-primary/5`}>
							<input {...getInputProps()} />
							<CardContent>
								{isDragActive ? <p>Kéo thả file vào đây...</p> : <p>Kéo & thả file hoặc bấm để chọn</p>}
								<p className='text-sm text-muted-foreground mt-1'>Hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)</p>
							</CardContent>
						</Card>

						{file && (
							<div className='flex items-center justify-between rounded-lg border p-3'>
								<div>
									<p className='font-medium'>{file.name}</p>
									<p className='text-muted-foreground'>
										{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'unknown'}
									</p>
								</div>
								<Button variant='ghost' size='sm' onClick={() => setValue('file', null)}>
									Xóa
								</Button>
							</div>
						)}
						{errors.file && <p className=' text-red-500'>{errors.file.message}</p>}
					</div>

					<Button type='submit' className='w-full' loading={isSubmitting}>
						Tải lên
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
