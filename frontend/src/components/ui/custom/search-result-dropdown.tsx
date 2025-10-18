'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Briefcase, Search, ArrowRight } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import useSWR from 'swr';
import { jobService } from '@/service/job.service';
import { Avatar } from '../avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import Image from 'next/image';
import { JobRes } from '@/schema/job.schema';

export function SearchResultDropdown({ query }: { query: string }) {
	const debouncedQuery = useDebounce(query, 1000);
	const { data: searchJobs, isLoading: isLoading1 } = useSWR(debouncedQuery ? ['search/jobs', debouncedQuery] : null, () =>
		jobService.getAll({ title: debouncedQuery, limit: 5 }).then(res => res.data)
	);
	const [history, setHistory] = useState<string[]>([]);
	const [recenKeyword, setRecentKeyword] = useState<string>('');
	const { data: recommend, isLoading: isLoading2 } = useSWR(recenKeyword !== null ? ['search/jobs', recenKeyword] : null, () =>
		jobService.getAll({ title: recenKeyword, limit: 5 }).then(res => res.data)
	);
	const [results, setResults] = useState<JobRes[]>([]);
	useEffect(() => {
		const data = localStorage.getItem('history');
		if (data) {
			try {
				const parsed: string[] = JSON.parse(data);
				if (Array.isArray(parsed)) {
					setHistory(parsed);
					setRecentKeyword(parsed[0] || '');
				}
			} catch (err) {
				console.error('Failed to parse history', err);
			}
		}
	}, []);

	useEffect(() => {
		if (searchJobs && searchJobs?.items.length > 0) {
			setResults(searchJobs?.items || []);
		} else {
			setResults(recommend?.items || []);
		}
	}, [debouncedQuery, recenKeyword, recommend]);

	const isTyping = debouncedQuery.length > 0;
	if (!isTyping && history.length === 0) return null;

	return (
		<Card className='absolute top-full left-0 w-full mt-2 rounded-xs shadow-lg bg-white z-50 p-0'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='p-6'>
					<p className='font-semibold mb-3 text-xl'>{isTyping ? 'Từ khóa liên quan' : 'Từ khóa gợi ý'}</p>

					{!isTyping && (
						<div className='space-y-2'>
							{history.map((h, i) => (
								<Link href={`/tim-viec?title=${encodeURIComponent(h)}`} key={i} className='flex items-center gap-4 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
									<Clock className='size-5 text-gray-500' />
									<span className='flex-1'>{h}</span>
								</Link>
							))}
						</div>
					)}

					{isTyping && searchJobs && searchJobs?.items?.length > 0 && (
						<div className='space-y-2'>
							{searchJobs?.items?.map((k, i) => (
								<Link href={`/tim-viec?title=${encodeURIComponent(k.title)}`} key={i} className='flex items-center gap-4 p-2  hover:bg-gray-100 rounded-md cursor-pointer'>
									<Search className='size-5 text-gray-500' />
									<span className='flex-1'>{k.title}</span>
								</Link>
							))}
						</div>
					)}
					{!isTyping && searchJobs?.items?.length === 0 && (
						<div className='flex items-center flex-col '>
							<Image alt='404' src={'/illustration/undraw_taken_mshk.svg'} height={1000} width={1000} className='size-48 my-6' />
							<p className='mt-4'>Không có từ khóa gợi ý cho</p>
							<p className='font-semibold'>"{query}"</p>
						</div>
					)}
				</div>

				<div className='border-l p-6'>
					<p className='font-semibold mb-3 text-xl'>Việc làm có thể bạn quan tâm</p>
					<div className='space-y-2'>
						{results?.map(job => (
							<Link href={`/jobs/${job.id}`} key={job.id} className='group flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
								<Avatar className='size-18 border rounded-sm p-2 bg-white'>
									<AvatarImage src={job.company.user.avatarUrl} className='object-contain'></AvatarImage>
								</Avatar>
								<div className='flex-1 space-y-1'>
									<p className='font-semibold line-clamp-1'>{job.title}</p>
									<p className='text-sm text-gray-600 line-clamp-1 font-medium'>{job.company?.user.name}</p>
									<p className='text-primary text-sm font-bold'>{job.salary}</p>
								</div>
								<ArrowRight className=' size-5 text-primary hidden group-hover:block' />
							</Link>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
}
