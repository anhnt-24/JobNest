'use client';

import { Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getRelativeExpiry } from '@/utitls/get-relative-expiry';
type Props = {
	date: string | Date;
	icon?: boolean;
	iconClassName?: string;
	className?: string;
	prefix?: string;
	suffix?: string;
};

export function Countdown({ date, icon, iconClassName, className, prefix, suffix }: Props) {
	const text = getRelativeExpiry(date);
	const expired = text === 'Đã hết hạn';
	const absolute = new Date(date).toLocaleString('vi-VN');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className={cn('inline-flex items-center gap-1 text-foreground cursor-help', expired && 'text-red-500', className)}>
						{icon && <Clock className={cn('w-4 h-4 text-muted-foreground', iconClassName)} />}
						{!expired && prefix && <>{prefix} </>}
						{text}
						{!expired && suffix && <> {suffix}</>}
					</span>
				</TooltipTrigger>
				<TooltipContent side='top'>
					<p>{absolute}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
