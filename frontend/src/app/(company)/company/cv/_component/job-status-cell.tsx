import { useState } from 'react';
import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { jobService } from '@/service/job.service';
import { JobRes } from '@/schema/job.schema';

export default function JobStatusCell({ job }: { job: JobRes }) {
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(job.status);

	async function handleConfirm() {
		await jobService.updateStatus(job.id, selectedStatus);
		setOpen(false);
	}

	return (
		<TableCell>
			<Select
				value={selectedStatus}
				onValueChange={value => {
					setSelectedStatus(value);
					setOpen(true);
				}}>
				<SelectTrigger className='w-[100PX]'>
					<SelectValue placeholder='Chọn status' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='PENDING'>OPEN</SelectItem>
					<SelectItem value='OPEN'>OPEN</SelectItem>
					<SelectItem value='CLOSED'>CLOSED</SelectItem>
					<SelectItem value='PAUSED'>PAUSED</SelectItem>
				</SelectContent>
			</Select>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận thay đổi</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn đổi trạng thái công việc từ <b>{job.status}</b> sang <b>{selectedStatus}</b> không?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => {
								setSelectedStatus(job.status);
							}}>
							Hủy
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</TableCell>
	);
}
