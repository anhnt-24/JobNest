'use client';

import { Pagination as ShadCnPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomPaginationProps {
	totalItems?: number;
	pageSize: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	pageSizeOptions?: number[];
}

export default function Pagination({ totalItems, pageSize, currentPage, onPageChange, onPageSizeChange, pageSizeOptions = [5, 10, 20, 50] }: CustomPaginationProps) {
	if (!totalItems) return <></>;
	const totalPages = Math.ceil(totalItems / pageSize);
	if (totalPages <= 1) return null;

	const siblingCount = 1;
	const pages: (number | 'ellipsis')[] = [];

	pages.push(1);
	if (currentPage - siblingCount > 2) {
		pages.push('ellipsis');
	}
	for (let i = Math.max(2, currentPage - siblingCount); i <= Math.min(totalPages - 1, currentPage + siblingCount); i++) {
		pages.push(i);
	}
	if (currentPage + siblingCount < totalPages - 1) {
		pages.push('ellipsis');
	}
	if (totalPages > 1) {
		pages.push(totalPages);
	}
	return (
		<div className='flex gap-4 mt-6 justify-end'>
			<ShadCnPagination>
				<PaginationContent className='gap-5 items-center'>
					<PaginationItem>
						<PaginationPrevious
							href='#'
							className='bg-transparent'
							onClick={e => {
								e.preventDefault();
								if (currentPage > 1) onPageChange(currentPage - 1);
							}}
						/>
					</PaginationItem>

					{pages.map((p, idx) =>
						p === 'ellipsis' ? (
							<PaginationItem key={`ellipsis-${idx}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={p}>
								<PaginationLink
									href='#'
									isActive={p === currentPage}
									onClick={e => {
										e.preventDefault();
										onPageChange(p);
									}}>
									{p}
								</PaginationLink>
							</PaginationItem>
						)
					)}

					<PaginationItem>
						<PaginationNext
							href='#'
							className='bg-transparent'
							onClick={e => {
								e.preventDefault();
								if (currentPage < totalPages) onPageChange(currentPage + 1);
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</ShadCnPagination>
			<div className='flex  items-center px-2 float-left relative border rounded-xs bg-white'>
				<p className='text-primary w-20 font-semibold '>Hiển thị: </p>
				<Select value={pageSize.toString()} onValueChange={value => onPageSizeChange(Number(value))}>
					<SelectTrigger className='w-20 !h-10  border-0 shadow-none'>
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent align='end'>
						{pageSizeOptions.map(opt => (
							<SelectItem key={opt} value={opt.toString()}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
