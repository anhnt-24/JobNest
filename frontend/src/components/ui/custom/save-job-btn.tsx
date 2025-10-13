'use client';

import { Button } from '@/components/ui/button';
import { Bookmark, Heart } from 'lucide-react';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';

interface SaveJobButtonProps {
	jobId: number;
	iconOnly?: boolean;
	rounded?: boolean;
	iconType?: 'bookmark' | 'heart';
	size?: 'default' | 'md';
}

export function SaveJobButton({ jobId, iconOnly = false, rounded = false, iconType = 'bookmark', size = 'default' }: SaveJobButtonProps) {
	const { data: savedJobs, mutate } = useSWR(jobId ? `/jobs/${jobId}/toggle-save` : null, () => jobService.isJobSaved(Number(jobId)).then(res => res.data));

	const handleSaveJob = async () => {
		await jobService.toggleSave(jobId);
		mutate(!savedJobs);
	};

	const Icon = iconType === 'bookmark' ? Bookmark : Heart;

	return (
		<Button onClick={handleSaveJob} variant='outline' size={size} className={`${rounded ? 'rounded-full size-9' : ''}`}>
			<Icon className={`${savedJobs ? 'fill-primary' : ''} w-5 h-5`} />
			{!iconOnly && 'Lưu tin'}
		</Button>
	);
}
