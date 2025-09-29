'use client';
import React, { useCallback, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';
import { FaPencil, FaUpload } from 'react-icons/fa6';
import { companyService } from '@/service/company.service';

type Props = {
	initialImage?: string;
	maxSizeMB?: number;
	onUploaded?: (url: string) => void; // callback sau khi upload xong
	placeholder?: string;
};

export default function CoverImageUploader({ initialImage, maxSizeMB = 5, onUploaded, placeholder = 'Kéo thả ảnh bìa vào đây hoặc nhấn để chọn' }: Props) {
	const [preview, setPreview] = useState<string | null>(initialImage ?? null);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const validateAndSet = useCallback(
		(f: File | null) => {
			setError(null);
			if (!f) {
				setPreview(null);
				setFile(null);
				return;
			}
			const maxBytes = maxSizeMB * 1024 * 1024;
			if (!f.type.startsWith('image/')) {
				setError('Vui lòng chọn tệp hình ảnh.');
				return;
			}
			if (f.size > maxBytes) {
				setError(`Kích thước ảnh phải <= ${maxSizeMB} MB.`);
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				setPreview(String(reader.result));
				setFile(f);
			};
			reader.readAsDataURL(f);
		},
		[maxSizeMB]
	);

	const handleFiles = useCallback(
		(files: FileList | null) => {
			if (!files || files.length === 0) return;
			validateAndSet(files[0]);
		},
		[validateAndSet]
	);

	const handleDrop: React.DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		e.stopPropagation();
		handleFiles(e.dataTransfer.files);
	};

	const handleDragOver: React.DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
	};

	const openFileDialog = () => inputRef.current?.click();

	const removeImage = () => {
		setPreview(null);
		setError(null);
		setFile(null);
		if (inputRef.current) inputRef.current.value = '';
	};

	const handleUpload = async () => {
		if (!file) {
			setError('Chưa có ảnh để tải lên.');
			return;
		}
		try {
			setLoading(true);
			const res = await companyService.updateCompanyCover(file);
			if (res.data) {
				onUploaded?.(res.data); // Trả về URL ảnh mới
				setOpen(false);
			}
		} catch (err: any) {
			setError('Tải ảnh thất bại, vui lòng thử lại.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className='rounded-full p-3 text-white cursor-pointer hover:opacity-80 transition-all bg-black/70 hover:text-primary group-hover:opacity-100 opacity-0'>
					<FaPencil className='size-5' />
				</button>
			</DialogTrigger>
			<DialogContent className='max-w-3xl'>
				<DialogHeader>
					<DialogTitle>Tải ảnh bìa</DialogTitle>
				</DialogHeader>
				<div className='w-full space-y-4'>
					<div>
						<div
							role='button'
							tabIndex={0}
							onClick={openFileDialog}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') openFileDialog();
							}}
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							className='relative flex items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 h-48 overflow-hidden bg-white'
							aria-label='Khu vực tải ảnh bìa có thể kéo thả hoặc nhấn để chọn'>
							{!preview ? (
								<div className='flex flex-col items-center gap-3 text-center text-gray-700'>
									<ImageIcon className='w-10 h-10' />
									<div className='text-lg'>{placeholder}</div>
									<div className=' text-gray-400'>Tối đa {maxSizeMB} MB • JPG, PNG, WEBP</div>
								</div>
							) : (
								<img src={preview} alt='Preview cover' className='absolute inset-0 w-full h-full object-cover' />
							)}
							<input ref={inputRef} type='file' accept='image/*' className='sr-only' onChange={e => handleFiles(e.target.files)} />
						</div>
						{error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
					</div>

					<div className='justify-end flex gap-2'>
						<Button variant='outline' onClick={removeImage} disabled={loading}>
							Gỡ ảnh
						</Button>
						<Button className='px-8' onClick={handleUpload} disabled={loading || !file}>
							{loading ? (
								'Đang tải...'
							) : (
								<>
									<FaUpload className='mr-2' />
									Tải lên
								</>
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
