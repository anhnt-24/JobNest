'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { JobRes } from '@/schema/job.schema';
import { cn } from '@/lib/utils';
import { AlertTriangle, Edit } from 'lucide-react';
import { UploadCvModal } from './form-upload-cv';
import useSWR from 'swr';
import { cvService } from '@/service/cvs.service';
import { jobService } from '@/service/job.service';
import { toast } from 'sonner';

type FormValues = {
	cvOption: 'last' | 'library' | 'upload';
	selectedCV?: string;
	uploadCV?: FileList;
	message: string;
};

export function ApplyJobDialog({ job, className }: { job: JobRes; className?: string }) {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data: cvs, isLoading } = useSWR(open ? ['/cvs/me', page, limit] : null, () => cvService.me({ page, limit }).then(res => res.data));
	const [selectedCV, setSelectedCV] = useState<any>();
	const [selectedType, setSelectedType] = useState<string>('last');
	const [selectedCV2, setSelectedCV2] = useState<any>();
	const [isSelectingCV2, setIsSelectingCV2] = useState<boolean>(true);
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState<string>('');
	const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
		defaultValues: {
			cvOption: 'last',
			message: '',
		},
	});
	const [loading, setLoading] = useState<boolean>(false);

	const cvOption = watch('cvOption');

	const onSubmit = async (data: FormValues) => {
		setLoading(true);
		try {
			let cv = selectedCV;

			if (data.cvOption === 'last') {
				cv = cvs.items[0];
				setSelectedCV(cv);
			} else if (data.cvOption === 'library') {
				cv = selectedCV2;
				setSelectedCV(cv);
			} else if (data.cvOption === 'upload' && file) {
				const res = await cvService.create(file, title);
				cv = res.data;
				setSelectedCV(cv);
			}

			if (cv) {
				await jobService.apply(job.id, cv.id, data.message);
				toast.success('Ứng tuyển thành công!');
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className={className}>Ứng tuyển ngay</Button>
			</DialogTrigger>

			<DialogContent className='max-w-3xl  px-0 '>
				<DialogHeader>
					<DialogTitle className='px-4 text-xl'>
						Ứng tuyển công việc <span className='text-primary'>{job?.title}</span>
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-2  p-4 bg-gray-100 max-h-180 h-180 overflow-y-scroll'>
						<Label className='text-lg font-semibold text-gray-800'>Chọn CV để ứng tuyển</Label>
						<RadioGroup
							value={cvOption}
							onValueChange={val => {
								setSelectedType(val);
								setValue('cvOption', val as FormValues['cvOption']);
							}}>
							<div className={`${selectedType == 'last' && 'border-primary text-primary'} flex items-center gap-2 border p-4 rounded-xs hover:border-primary hover:text-primary border-gray-300`}>
								<RadioGroupItem value='last' id='last' className={`${selectedType == 'last' && 'border-primary'}`} />
								<Label htmlFor='last'>
									<span className='font-normal'>CV ứng tuyển gần nhất:</span>
								</Label>
							</div>

							<div className={`${selectedType == 'library' && 'border-primary'} border rounded-xs p-4 border-gray-300 `}>
								<div className='flex gap-2 items-center'>
									<RadioGroupItem value='library' id='library' className={`${selectedType == 'library' && 'border-primary'}`} />
									<Label htmlFor='library' className={`${selectedType == 'library' && 'text-primary'}`}>
										Chọn CV khác trong thư viện CV của tôi
									</Label>
								</div>

								<div className={`overflow-hidden transition-all duration-1000 ${selectedType === 'library' ? 'max-h-[1000px]' : 'max-h-0'}`}>
									{!isSelectingCV2 ? (
										<div key={selectedCV2.id} className={cn('h-12 flex items-center justify-between border rounded-xs px-3  cursor-pointer border-primary bg-primary/5 mt-4')}>
											<span>
												Chọn CV: <strong>{selectedCV2.title}</strong>
											</span>
											<div className='gap-2 flex  transition-all max'>
												<Button
													variant='link'
													size='sm'
													className='text-green-600 '
													onClick={e => {
														e.stopPropagation();
														window.open(selectedCV2.fileUrl, '_blank');
													}}>
													Xem
												</Button>
												<Button
													size='sm'
													onClick={() => {
														setIsSelectingCV2(true);
													}}>
													<Edit></Edit>
													Thay đổi
												</Button>
											</div>
										</div>
									) : (
										<>
											<Label className='text-sm font-semibold my-2'>CV Online</Label>
											<RadioGroup value={selectedCV} onValueChange={val => setSelectedCV(val)}>
												{cvs?.items.map(cv => (
													<div
														key={cv.id}
														onClick={() => setSelectedCV2(cv)}
														className={cn(
															'group h-12 flex items-center justify-between border rounded-xs px-3  cursor-pointer hover:border-primary hover:bg-primary/5 bg-white',
															selectedCV2?.id === cv.id && 'border-primary bg-primary/5'
														)}>
														<span>
															{cv.title}
															<strong className='mx-4 text-sm'>{selectedCV2?.id === cv.id && '(đã chọn)'}</strong>
														</span>
														<div className='gap-2 group-hover:flex hidden transition-all max'>
															<Button
																variant='link'
																size='sm'
																className='text-green-600 '
																onClick={e => {
																	e.stopPropagation();
																	window.open(cv.fileUrl, '_blank');
																}}>
																Xem
															</Button>
															<Button
																size='sm'
																onClick={() => {
																	setSelectedCV2(cv);
																	setIsSelectingCV2(false);
																}}>
																Chọn CV
															</Button>
														</div>
													</div>
												))}
											</RadioGroup>
										</>
									)}
								</div>
							</div>

							<div className={`${selectedType == 'upload' && 'border-primary'} border rounded-xs p-4 border-gray-300`}>
								<div className='flex items-center gap-2 '>
									<RadioGroupItem value='upload' id='upload' />
									<Label htmlFor='upload' className={`${selectedType == 'upload' && 'text-primary'}`}>
										Tải lên CV từ máy tính
									</Label>
								</div>

								<div className={` overflow-hidden transition-max-h duration-1000 ${selectedType === 'upload' ? 'max-h-[1000px]' : 'max-h-0'}`}>
									<div className='mt-4'>
										<UploadCvModal title={title} setTitle={setTitle} file={file} setFile={setFile} />
									</div>
								</div>
							</div>
						</RadioGroup>

						{/* Cover letter */}
						<div>
							<Label htmlFor='coverLetter' className='text-gray-800 text-lg font-semibold'>
								Thư giới thiệu:
							</Label>
							<p className='text-gray-600 mb-2'>Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.</p>
							<Textarea
								id='coverLetter'
								className='min-h-28 hover:border-primary focus:border-primary rounded-xs'
								placeholder='Viết thư giới thiệu (tối đa 100 chữ)...'
								{...register('message', { maxLength: 100 })}
							/>
						</div>
						<div className='border rounded-xs p-4 border-gray-300 space-y-3'>
							<div className='flex items-center gap-2'>
								<AlertTriangle className='text-red-500 w-5 h-5' />
								<span className='font-semibold text-red-600'>Lưu ý:</span>
							</div>

							<div className='text-sm text-gray-700 space-y-2'>
								<p>
									1. TopCV khuyến tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc làm trước khi ứng tuyển. Ứng viên cần có trách
									nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho TopCV qua email{' '}
									<a href='mailto:hotro@topcv.vn' className='text-green-600 font-medium hover:underline'>
										hotro@topcv.vn
									</a>{' '}
									để được hỗ trợ kịp thời.
								</p>

								<p>
									2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo{' '}
									<a href='#' className='text-green-600 font-medium hover:underline'>
										tại đây
									</a>
									.
								</p>
							</div>
						</div>
					</div>

					<DialogFooter className='flex  gap-2 px-4 pt-4'>
						<DialogClose>
							<Button type='button' variant='outline' className='px-8'>
								Hủy
							</Button>
						</DialogClose>
						<Button loading={loading} type='submit' className='flex-1'>
							Nộp hồ sơ ứng tuyển
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
