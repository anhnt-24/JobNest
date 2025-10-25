'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cvService } from '@/service/cv.service';
import { toast } from 'sonner';

type DeleteCvButtonProps = {
	id: number;
	title?: string;
	onDeleted?: () => void;
};

export function DeleteCvButton({ id, title, onDeleted }: DeleteCvButtonProps) {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		try {
			setLoading(true);
			await cvService.delete(id);
			toast.success(`Xóa thành công!`);
			onDeleted?.();
		} catch (error) {
			console.error(error);
			toast.error('Thất bại!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					className='text-red-500 focus:text-red-600'
					onSelect={e => e.preventDefault()} // 🧠 thêm dòng này!
				>
					<Trash className='mr-2 h-4 w-4 text-inherit' />
					<span>Xoá</span>
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xác nhận xoá</AlertDialogTitle>
					<AlertDialogDescription>Bạn có chắc muốn xoá CV{title ? ` "${title}"` : ''} không? Hành động này không thể hoàn tác.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Huỷ</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} disabled={loading} className='bg-red-600 hover:bg-red-700'>
						{loading ? 'Đang xoá...' : 'Xoá'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
