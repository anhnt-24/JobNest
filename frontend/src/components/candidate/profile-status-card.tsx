'use client';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Check, Camera } from 'lucide-react';
import { useAuth } from '@/hook/useAuth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Cropper, { Point, Area } from 'react-easy-crop';
import { candidateService } from '@/service/candidate.service';
import { LoadingButton } from '../ui/custom/loading-button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
export function ProfileStatusCard() {
	const { user, setUser } = useAuth();
	const handleUpload = async (file: File) => {
		const res = await candidateService.uploadAvatar(file);
		setUser(user => ({
			...user,
			avatarUrl: res.data,
		}));
	};

	const [jobStatus, setJobStatus] = useState(true);
	const [allowSearch, setAllowSearch] = useState(true);
	return (
		<Card className='max-w-md p-6 gap-4'>
			<div className='flex '>
				<AvatarWithUpload user={user} onSave={handleUpload}></AvatarWithUpload>
				<div className='space-y-0.5'>
					<p className='text-sm text-gray-600'>Chào bạn trở lại,</p>
					<h6 className='font-semibold text-lg mb-1 '>{user?.name}</h6>
					<Badge className=' flex items-center '>
						<Check className='size-5' /> Đã xác thực
					</Badge>
					<p className='text-sm text-gray-500'>Thành viên từ 08/2023</p>
				</div>
			</div>
			<Separator></Separator>
			<div className='flex flex-col space-y-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 font-semibold text-primary text-lg'>
						<Switch checked={jobStatus} onCheckedChange={setJobStatus} />
						<span>Trạng thái tìm việc đang bật</span>
					</div>
				</div>
				<p className='text-sm text-gray-600'>
					Trạng thái <span className='font-semibold text-primary'>Bật tìm việc</span> sẽ tự động tắt sau <span className='font-semibold text-primary'>14 ngày</span>. Nếu bạn vẫn còn nhu cầu tìm việc,
					hãy{' '}
					<a href='#' className='text-blue-600 hover:underline text-sm'>
						Bật tìm việc trở lại
					</a>
					.
				</p>
				<div className='flex items-center justify-between rounded-lg border p-2'>
					<span className='font-medium'>1 CV đang được chọn</span>
					<Button variant='secondary' size='sm'>
						Thay đổi
					</Button>
				</div>
			</div>

			{/* Cho phép NTD tìm kiếm hồ sơ */}
			<div className='flex flex-col space-y-2'>
				<div className='flex items-center gap-2 font-semibold text-primary text-lg'>
					<Switch checked={allowSearch} onCheckedChange={setAllowSearch} />
					<span>Cho phép NTD tìm kiếm hồ sơ</span>
				</div>
				<p className='text-sm text-gray-600'>Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn qua:</p>
				<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
					<li>
						Nhắn tin qua <span className='font-semibold'>JobNest' Connect</span>
					</li>
					<li>Email và Số điện thoại của bạn</li>
				</ul>
			</div>
		</Card>
	);
}

interface AvatarWithUploadProps {
	user?: {
		avatarUrl?: string;
		name?: string;
	};
	onSave?: (file: File) => void;
}

export default function AvatarWithUpload({ user, onSave }: AvatarWithUploadProps) {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [aspectRatio, setAspectRatio] = useState(1);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);
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
			if (onSave) {
				await onSave(croppedImageBlob as File);
			}
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
		<div className='relative w-32 h-32'>
			<Avatar className='w-28 h-28 border border-gray-200 '>
				<AvatarFallback className='text-2xl text-white'>{getInitials(user?.name)}</AvatarFallback>
				<AvatarImage src={user?.avatarUrl} />
			</Avatar>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size='sm' className='absolute bottom-3 right-3 w-10 h-10 p-1 rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100 flex items-center justify-center'>
						<Camera className='w-5 h-5 text-gray-700' />
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
							<div className='w-40 h-40 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center mb-6 bg-checkerboard'>
								{previewUrl ? <img src={previewUrl} alt='preview' className='w-full h-full object-cover rounded-full' /> : <div className='text-gray-400'>Chưa có ảnh</div>}
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
