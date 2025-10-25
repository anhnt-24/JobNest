'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Empty from '@/components/shared/empty';
import { jobService } from '@/service/job.service';
import { conversationService } from '@/service/conversation.service';
interface AppliedJobListProps {
	setActiveConvo: (id: number | null) => void;
	setActiveEmployer: (data: any) => void;
	setActiveApplication: (id: number | null) => void;
	employer?: any;
}

export function AppliedJobList({ setActiveConvo, setActiveEmployer, setActiveApplication, employer }: AppliedJobListProps) {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data, isLoading } = useSWR(['/job/applied', page, limit], () => jobService.getAppliedJobs({ page, limit }).then(res => res.data));
	const handleSelectConvo = (application: any) => {
		conversationService
			.getByApplication(application.id)
			.then(res => {
				setActiveConvo(res.data.id);
			})
			.catch(() => {
				setActiveConvo(null);
			})
			.finally(() => {
				setActiveApplication(application.id);
				setActiveEmployer(application.job.employer.user.id);
			});
	};
	if (isLoading)
		return (
			<div className='flex-1 p-4 border-l'>
				<h3 className='mb-2 font-semibold'>TIN TUYỂN DỤNG ĐÃ ỨNG TUYỂN</h3>
				<div className='space-y-3'>
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className='flex items-center gap-3 w-full p-3 rounded-xl'>
							<Skeleton className='w-12 h-12 rounded-full' />
							<div className='flex-1'>
								<Skeleton className='h-4 w-2/3 mb-1' />
								<Skeleton className='h-3 w-1/2' />
							</div>
							<Skeleton className='h-8 w-20 rounded-full' />
						</div>
					))}
				</div>
			</div>
		);

	if (!data?.items?.length) return <Empty />;
	return (
		<div className='flex-1 border-l'>
			{employer && (
				<div className='p-4 border-b'>
					<h3 className='text-base font-bold'>NHÀ TUYỂN DỤNG</h3>
					<div className='flex items-center gap-4  w-full p-3 rounded-xl hover:bg-gray-50 transition'>
						<div className='flex-shrink-0'>
							<div className='size-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
								<img src={employer.avatarUrl} alt={employer.name} className='w-full h-full object-cover' />
							</div>
						</div>
						<div className='flex-1 min-w-0'>
							<h4 className='font-bold text-base leading-5 text-gray-900 line-clamp-1'>{employer.name}</h4>
							<p className='text-sm text-gray-500 truncate mt-0.5 line-clamp-1'>{employer.employer?.company?.user.name}</p>
						</div>
					</div>
				</div>
			)}
			<div className='p-4'>
				<h3 className='text-base font-bold mb-2'>TIN TUYỂN DỤNG ĐÃ ỨNG TUYỂN</h3>

				{data.items.map(c => (
					<div key={c.id} className='flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gray-50 transition '>
						<div className='flex-shrink-0'>
							<div className='size-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
								{c?.job?.employer?.user?.avatarUrl ? (
									<img src={c.job.employer.user.avatarUrl} alt={c.job.title} className='w-full h-full object-cover' />
								) : (
									<span className='text-xs font-medium text-gray-600 text-center px-1'>{c.job.title.slice(0, 2).toUpperCase()}</span>
								)}
							</div>
						</div>
						<div className='flex-1 min-w-0'>
							<p className='font-bold  leading-5 text-gray-900 line-clamp-1'>{c.job.title}</p>
							<p className='text-sm text-gray-500 truncate mt-0.5 line-clamp-1'>{c.job.employer?.user.name}</p>
						</div>
						<button className='flex-shrink-0 cursor-pointer' onClick={() => handleSelectConvo(c)}>
							<span className='inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-primary/50 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10'>
								Nhắn tin
							</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
