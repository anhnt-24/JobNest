'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
	return (
		<div className='w-full'>
			<Table>
				<TableHeader>
					<TableRow>
						{Array.from({ length: cols }).map((_, i) => (
							<TableHead key={i}>
								<Skeleton className='h-4 w-24' />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: rows }).map((_, r) => (
						<TableRow key={r}>
							{Array.from({ length: cols }).map((_, c) => (
								<TableCell key={c}>
									<Skeleton className='h-4 w-full' />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
