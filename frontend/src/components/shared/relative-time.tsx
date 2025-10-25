'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import formatDate from '@/utitls/format-date';
import { BoundsLiteral } from 'leaflet';
import { Clock } from 'lucide-react';
import React from 'react';

type Props = {
	date: string | Date;
	icon?: boolean; // có thể truyền hoặc không
	iconClassName?: string;
	prefix?: string;
	suffix?: string;
	className?: string;
};

export function RelativeTime({ date, icon, iconClassName, prefix, suffix, className }: Props) {
	const dateObj = date instanceof Date ? date : new Date(date);
	const relative = formatDate(dateObj);
	const absolute = dateObj.toLocaleString('vi-VN', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className={cn('inline-flex items-center gap-1 text-foreground cursor-help ', className)}>
						{icon ? <Clock className={cn('w-3.5 h-3.5 text-muted-foreground', iconClassName)} /> : null}
						{prefix && <>{prefix} </>}
						{relative}
						{suffix && <> {suffix}</>}
					</span>
				</TooltipTrigger>
				<TooltipContent side='top'>
					<p>{absolute}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
