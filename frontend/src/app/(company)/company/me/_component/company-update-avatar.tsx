'use client';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useAuth } from '@/hook/useAuth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Cropper, { Point, Area } from 'react-easy-crop';
import { LoadingButton } from '@/components/ui/custom/loading-button';
import { FaCamera, FaCameraRetro } from 'react-icons/fa6';
import { authService } from '@/service/auth.service';
import { mutate } from 'swr';
import { toast } from 'sonner';

export default function UpdateAvatar() {
	const [imageSrc, setImageSrc] = useState<string>('');
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [aspectRatio, setAspectRatio] = useState(1);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);
	const { setUser } = useAuth();
	const [open, setOpen] = useState(false);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				setImageSrc(reader.result as string);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleSave = async () => {
		if (!imageSrc || !croppedAreaPixels) return;

		try {
			const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
			const avatarUrl = (await authService.uploadAvatar(croppedImageBlob as File)).data;
			setUser(prev => (prev ? { ...prev, avatarUrl } : undefined));
			mutate('/company/me');
			toast.success('Tải ảnh thành công.');
		} catch {
		} finally {
			setOpen(false);
		}
	};

	const getInitials = (name?: string) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map(word => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};
	const updatePreview = async () => {
		if (!imageSrc || !croppedAreaPixels) return;
		const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
		const url = URL.createObjectURL(blob);
		setPreviewUrl(url);
	};

	useEffect(() => {
		updatePreview();
	}, [croppedAreaPixels]);

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size='sm' variant={'ghost'} className='  text-gray-300 bggray  w-10 h-10 p-1 rounded-full  !bg-transparent  shadow-md bg flex items-center justify-center'>
						<FaCameraRetro className='size-8' />
					</Button>
				</DialogTrigger>

				<DialogContent className='p-6 max-w-4xl'>
					<div className='flex justify-between items-center mb-4'>
						<DialogTitle className='text-xl font-semibold'>Cập nhật ảnh đại diện</DialogTitle>
					</div>

					<div className='flex flex-col md:flex-row gap-6'>
						<div className='flex-1'>
							<div className='relative h-80 w-120  rounded-md border border-gray-300 bg-checkerboard'>
								{imageSrc ? (
									<Cropper
										image={imageSrc}
										crop={crop}
										zoom={zoom}
										aspect={aspectRatio}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
										cropShape='rect'
										showGrid={true}
										style={{
											cropAreaStyle: {
												border: '2px dashed rgba(255,255,255,0.7)',
												boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
											},
										}}
									/>
								) : (
									<div className='h-full flex flex-col items-center justify-center cursor-pointer bg-checkerboard' onClick={() => fileInputRef.current?.click()}>
										<Camera className='w-12 h-12 text-gray-400 mb-2' />
										<p className='text-gray-500'>Chọn ảnh từ máy tính</p>
									</div>
								)}
							</div>

							<input type='file' ref={fileInputRef} accept='image/*' onChange={handleFileChange} className='hidden' />
						</div>

						<div className='flex-1 flex flex-col items-center justify-center'>
							<h3 className='text-lg font-medium mb-4'>Xem trước</h3>
							<div className='w-40 h-40  border-2 border-gray-300 overflow-hidden flex items-center justify-center mb-6 bg-checkerboard'>
								{previewUrl ? <img src={previewUrl} alt='preview' className='w-full h-full object-cover' /> : <div className='text-gray-400'>Chưa có ảnh</div>}
							</div>

							<p className='text-sm text-gray-500 text-center mb-4'>Ảnh của bạn sẽ hiển thị như thế này trên trang cá nhân</p>
						</div>
					</div>

					{imageSrc && (
						<DialogFooter className='mt-6 flex justify-end space-x-2'>
							<Button onClick={() => fileInputRef.current?.click()} variant={'outline'}>
								{imageSrc && 'Chọn ảnh khác'}
							</Button>
							<LoadingButton onClickAsync={handleSave}>Lưu thay đổi</LoadingButton>
						</DialogFooter>
					)}
				</DialogContent>
			</Dialog>

			<style jsx>{`
				.bg-checkerboard {
					background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
						linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
					background-size: 20px 20px;
					background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
				}
			`}</style>
		</div>
	);
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				reject(new Error('No 2d context'));
				return;
			}

			canvas.width = pixelCrop.width;
			canvas.height = pixelCrop.height;

			ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

			canvas.toBlob(blob => {
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error('Canvas is empty'));
				}
			}, 'image/png');
		};
		image.onerror = () => {
			reject(new Error('Failed to load image'));
		};
	});
}
