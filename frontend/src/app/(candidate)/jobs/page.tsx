'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { jobService } from '@/service/job.service';

export default function JobsPage() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const userId = 1;

	useEffect(() => {
		(async () => {
			try {
				const res = await jobService.findRandom({});
				setJobs(res.data.items);
			} catch (err) {
				console.error(err);
				toast.error('Không thể tải danh sách việc làm');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleSaveJob = async (jobId: number) => {
		try {
			await jobService.save(userId, jobId);
			toast.success('Đã lưu công việc');
		} catch (err) {
			console.error(err);
			toast.error('Lưu công việc thất bại');
		}
	};

	const handleApplyJob = async (jobId: number) => {
		try {
			await jobService.apply(jobId, 'https://example.com/cv.pdf', 'Tôi muốn ứng tuyển vào vị trí này');
			toast.success('Ứng tuyển thành công');
		} catch (err) {
			console.error(err);
			toast.error('Ứng tuyển thất bại');
		}
	};

	if (loading) return <div className='p-4'>Đang tải...</div>;

	return (
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-2xl font-bold mb-6'>Danh sách việc làm</h1>
			<div className='space-y-4'>
				{jobs.map(job => (
					<div key={job.id} className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
						<div className='flex gap-4'>
							<div className='w-16 h-16 flex-shrink-0'>
								<Image src={job.company?.logoUrl || '/default-logo.png'} alt='Company logo' width={64} height={64} className='rounded-lg object-cover' />
							</div>
							<div className='flex-grow'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='text-lg font-semibold text-blue-600'>{job.title}</h3>
										<p className='text-gray-600 font-medium mt-1'>{job.company?.name}</p>
									</div>
									<Button variant='ghost' size='icon' onClick={() => handleSaveJob(job.id)}>
										<Bookmark className='h-5 w-5' />
									</Button>
								</div>

								<div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-gray-600'>
									<div className='flex items-center gap-2'>
										<DollarSign className='h-4 w-4 text-gray-400' />
										<span>{job.salaryFrom && job.salaryTo ? `${job.salaryFrom} - ${job.salaryTo} triệu` : 'Thỏa thuận'}</span>
									</div>
									<div className='flex items-center gap-2'>
										<MapPin className='h-4 w-4 text-gray-400' />
										<span>{job.location}</span>
									</div>
									<div className='flex items-center gap-2'>
										<Clock className='h-4 w-4 text-gray-400' />
										<span>Còn {job.deadline ? Math.max(0, Math.ceil((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : '?'} ngày</span>
									</div>
								</div>

								<div className='mt-4'>
									<Button onClick={() => handleApplyJob(job.id)} className='bg-blue-600 text-white'>
										Ứng tuyển ngay
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
