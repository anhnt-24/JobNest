'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvService } from '@/service/cvs.service';
import { toast } from 'sonner';

const schema = z.object({
	title: z.string().min(1, 'Tên không được để trống').max(100, 'Tên quá dài'),
});

type FormValues = z.infer<typeof schema>;

type RenameCvButtonProps = {
	id: number;
	title: string;
	mutate: () => void;
};

export function RenameCvButton({ id, title, mutate }: RenameCvButtonProps) {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { title },
	});

	const onSubmit = async (values: FormValues) => {
		try {
			await cvService.update(id, { title: values.title.trim() });
			toast.success(`Đã đổi tên CV thành "${values.title}"`);
			mutate();
			setOpen(false);
		} catch (error) {
			console.error(error);
			toast.error('Đổi tên thất bại!');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={e => e.preventDefault()}
					onClick={() => {
						reset({ title });
						setOpen(true);
					}}>
					<Edit className='mr-2 h-4 w-4 text-inherit' />
					<span>Đổi tên</span>
				</DropdownMenuItem>
			</DialogTrigger>

			<DialogContent className='max-w-2xl'>
				<DialogHeader className='border-b pb-4'>
					<DialogTitle>Chỉnh sửa tên CV</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
					<div>
						<Input {...register('title')} placeholder='Nhập tên mới cho CV...' disabled={isSubmitting} />
						{errors.title && <p className='text-sm text-red-500 mt-1'>{errors.title.message}</p>}
					</div>

					<DialogFooter>
						<Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isSubmitting}>
							Huỷ
						</Button>
						<Button type='submit' loading={isSubmitting}>
							Cập nhật{' '}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
