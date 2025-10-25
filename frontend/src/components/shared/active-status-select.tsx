'use client';

import { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface ActiveStatusSelectProps {
	value: boolean;
	onChange: (value: boolean) => void;
	mutate?: () => void;
}

export function ActiveStatusSelect({ value, onChange, mutate }: ActiveStatusSelectProps) {
	const [pendingValue, setPendingValue] = useState<boolean | null>(null);
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleSelect = (val: string) => {
		const newValue = val === 'true';
		if (newValue !== value) {
			setPendingValue(newValue);
			setOpenConfirm(true);
		}
	};

	const handleConfirm = () => {
		if (pendingValue !== null) {
			onChange(pendingValue);
			setOpenConfirm(false);
			setPendingValue(null);
		}
	};

	return (
		<>
			<Select value={value ? 'true' : 'false'} onValueChange={handleSelect}>
				<SelectTrigger className='w-[120px]'>
					<SelectValue>
						<Badge className={`border rounded-sm font-medium ${value ? 'bg-green-50 text-green-700 border-green-600' : 'bg-red-50 text-red-600 border-red-600'}`}>
							{value ? 'Active' : 'Inactive'}
						</Badge>
					</SelectValue>
				</SelectTrigger>

				<SelectContent>
					<SelectItem value='true'>
						<Badge className='bg-green-50 text-green-700 border-green-600 border rounded-sm'>Active</Badge>
					</SelectItem>
					<SelectItem value='false'>
						<Badge className='bg-red-50 text-red-600 border-red-600 border rounded-sm'>Inactive</Badge>
					</SelectItem>
				</SelectContent>
			</Select>

			<AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận thay đổi</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc muốn chuyển trạng thái người dùng sang <span className='font-semibold'>{pendingValue ? 'Active' : 'Inactive'}</span>?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Hủy</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
