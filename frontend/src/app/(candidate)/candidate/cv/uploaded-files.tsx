'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Image, File, Download, Trash2, MoreVertical, Plus, Search, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CustomPagination from '@/components/candidate/custom-pagination';
import { UploadCvModal } from './upload-file-form';
import useSWR from 'swr';
import { cvsService } from '@/service/cvs.service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/ui/custom/pagination';
import { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from 'react-icons/fa';
import LoadingCard from '../profile/skeleton';
import { LoadingTable } from '@/components/ui/custom/loading-table';

export function renderCVIcon(format: string, className?: string) {
	switch (format) {
		case 'PDF':
			return <FaFilePdf className={className + ' text-red-500'} />;
		case 'DOC':
		case 'DOCX':
			return <FaFileWord className={className + ' text-blue-500'} />;
		case 'PNG':
		case 'JPG':
		case 'JPEG':
			return <FaFileImage className={className + ' text-green-500'} />;
		default:
			return <FaFileAlt className={className + ' text-gray-500'} />;
	}
}

export function UploadedFiles() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: cvs, isLoading } = useSWR(['/cvs/me', page, limit], () => cvsService.getCvs({ page, limit }).then(res => res.data));
	if (isLoading) return <>1</>;
	return (
		<Card className='p-6'>
			<CardHeader className='flex justify-between items-center '>
				<CardTitle>File đã tải lên</CardTitle>
				<UploadCvModal></UploadCvModal>
			</CardHeader>
			{isLoading ? (
				<LoadingTable />
			) : (
				<>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[80px]'>Loại</TableHead>
								<TableHead>Tiêu đề</TableHead>
								<TableHead>Kích thước</TableHead>
								<TableHead>Ngày tạo</TableHead>
								<TableHead className='text-right'>Hành động</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{cvs?.items.map(cv => (
								<TableRow key={cv.id}>
									<TableCell>
										<div className='flex items-center justify-center'>
											{renderCVIcon(cv.format, 'size-10')}
											<span className='capitalize'>{cv.format}</span>
										</div>
									</TableCell>
									<TableCell className='font-medium'>{cv.title}</TableCell>
									<TableCell>{cv.fileSize} MB</TableCell>
									<TableCell>{cv.createdAt}</TableCell>
									<TableCell className='text-right'>
										<div className=''>
											<Button variant='ghost' size='icon'>
												<Eye className='size-5' />
											</Button>
											<Button variant='ghost' size='icon'>
												<Download className='size-5' />
											</Button>

											<Button variant='ghost' size='icon'>
												<Trash2 className='size-5 text-red-600' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<div className='float-right'>
						<Pagination totalItems={cvs.meta.totalPages} pageSize={limit} currentPage={page} onPageChange={setPage} onPageSizeChange={setLimit} pageSizeOptions={[5, 10, 20, 50]} />
					</div>
				</>
			)}
		</Card>
	);
}

export default UploadedFiles;
