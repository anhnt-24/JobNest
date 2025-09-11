'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowUp, FileUp } from 'lucide-react';
import { cvsService } from '@/service/cvs.service';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';

export function UploadCvModal() {
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		cvsService.createCv(file as File, title);
		setFile(null);
		setTitle('');
		alert('CV đã được tải lên thành công!');
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			'application/pdf': ['.pdf'],
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
		},
		maxSize: 5 * 1024 * 1024, // 5MB
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='px-6'>
					<ArrowUp></ArrowUp> Tải CV lên
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-3xl '>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<Label className='mb-2' required>
							{' '}
							Tiêu đề
						</Label>
						<Input id='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Nhập tiêu đề CV' required />
					</div>
					<div className='space-y-2'>
						<Label htmlFor='file' required>
							Chọn file CV
						</Label>

						<Card {...getRootProps()} className={`border-2  border-dashed p-6 text-center cursor-pointer rounded-2xl transition border-primary hover:bg-primary/5`}>
							<input {...getInputProps()} />
							<CardContent>
								{isDragActive ? <p>Kéo thả file vào đây...</p> : <p>Kéo & thả file hoặc bấm để chọn</p>}
								<p className='text-sm text-muted-foreground mt-1'>Hỗ trợ định dạng: PDF, DOC, DOCX (tối đa 5MB)</p>
							</CardContent>
						</Card>

						{file && (
							<div className='flex items-center justify-between rounded-lg border p-3'>
								<div>
									<p className=' font-medium'>{file.name}</p>
									<p className='text-muted-foreground'>
										{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'unknown'}
									</p>
								</div>
								<Button variant='ghost' size='sm' onClick={() => setFile(null)}>
									Xóa
								</Button>
							</div>
						)}
					</div>
					<Button type='submit' className='w-full'>
						Tải lên
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
