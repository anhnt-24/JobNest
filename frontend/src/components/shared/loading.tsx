'use client';

import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';
import { Card } from '../ui/card';

type LoadingType = 'page' | 'card' | 'list' | 'table' | 'job';

type Props = {
	type?: LoadingType;
	rows?: number;
	className?: string;
};

export function Loading({ type = 'page', rows = 6, className }: Props) {
	if (type === 'page') {
		return (
			<div className='flex flex-col items-center justify-center h-[60vh]'>
				<Loader2 className='w-16 h-16 animate-spin text-primary' />
				<p className='mt-3 text-sm text-muted-foreground'>Đang tải dữ liệu...</p>
			</div>
		);
	}

	if (type === 'card') {
		return (
			<div className={cn('rounded-xl border p-4 space-y-3', className)}>
				<Skeleton className='h-24 w-full rounded-lg' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
			</div>
		);
	}

	if (type === 'job') {
		return (
			<div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ', className)}>
				{Array.from({ length: 9 }).map((_, i) => (
					<Card key={i} className=' space-y-3  animate-pulse h-40'>
						<div className='flex flex-1 gap-4'>
							<Skeleton className='size-20' />
							<div className='space-y-2 flex-1'>
								<Skeleton className='h-4 ' />
								<Skeleton className='h-4 ' />
								<Skeleton className='h-3 w-1/2' /> {/* dòng mô tả ngắn */}
								<div className='flex items-center gap-2 mt-2'>
									<Skeleton className='h-3 w-1/3' />
									<Skeleton className='h-3 w-1/3' />
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		);
	}

	if (type === 'table') {
		return (
			<div className={cn('rounded-lg border overflow-hidden', className)}>
				<div className='divide-y'>
					{Array.from({ length: rows }).map((_, i) => (
						<div key={i} className='grid grid-cols-4 py-3 px-3 gap-2'>
							{[...Array(4)].map((_, j) => (
								<Skeleton key={j} className='h-4 w-3/4 rounded-md' />
							))}
						</div>
					))}
				</div>
			</div>
		);
	}

	return null;
}
