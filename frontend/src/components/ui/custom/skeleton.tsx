import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCard() {
	return (
		<div className='space-y-4'>
			<Skeleton className='h-6 w-3/4' />
			<Skeleton className='h-4 w-full' />
			<Skeleton className='h-64 w-full rounded' />
		</div>
	);
}
