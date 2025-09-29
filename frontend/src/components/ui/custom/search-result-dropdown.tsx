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

type Job = {
	id: number;
	title: string;
	company: string;
	location: string;
};

const fakeJobs: Job[] = [
	{ id: 1, title: 'Frontend Developer', company: 'Google', location: 'Hà Nội' },
	{ id: 2, title: 'Backend Developer', company: 'Meta', location: 'Hồ Chí Minh' },
	{ id: 3, title: 'Fullstack Intern', company: 'Shopee', location: 'Đà Nẵng' },
	{ id: 4, title: 'NodeJS Developer', company: 'Tiki', location: 'Hà Nội' },
	{ id: 5, title: 'React Developer', company: 'FPT Software', location: 'HCM' },
];
const relatedKeywords = ['Frontend developer', 'Backend developer', 'NodeJS intern', 'ReactJS engineer', 'Fullstack fresher'];

export function SearchResultDropdown({ query }: { query: string }) {
	const debouncedQuery = useDebounce(query, 1000);
	const { data: searchJobs, isLoading } = useSWR(debouncedQuery ? ['search/jobs', debouncedQuery] : null, () => jobService.getAll({ title: debouncedQuery }).then(res => res.data));
	const [results, setResults] = useState<Job[]>([]);
	const [keywordResults, setKeywordResults] = useState<string[]>([]);

	const [history] = useState<string[]>(['NodeJS intern', 'React Developer']);
	const [recommend] = useState<Job[]>([fakeJobs[0], fakeJobs[1]]);

	useEffect(() => {
		if (!debouncedQuery.trim()) {
			setResults([]);
			setKeywordResults([]);
			return;
		}
		const filteredJobs = fakeJobs.filter(job => job.title.toLowerCase().includes(debouncedQuery.toLowerCase()));
		setResults(filteredJobs);
		const filteredKeywords = relatedKeywords.filter(k => k.toLowerCase().includes(debouncedQuery.toLowerCase()));
		setKeywordResults(filteredKeywords);
	}, [debouncedQuery]);

	const isTyping = debouncedQuery.length > 0;
	if (!isTyping && history.length === 0 && recommend.length === 0) return null;

	return (
		<Card className='absolute top-full left-0 w-full mt-2 rounded-xl shadow-lg bg-white z-50 p-0'>
			<div className='grid grid-cols-2 gap-8'>
				{/* Cột trái: keywords */}
				<div className='p-6'>
					<p className='font-semibold mb-3 text-xl'>{isTyping ? 'Từ khóa liên quan' : 'Từ khóa gợi ý'}</p>

					{!isTyping && (
						<div className='space-y-2'>
							{history.map((h, i) => (
								<Link href={`/tim-viec?title=${encodeURIComponent(h)}`} key={i} className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
									<Clock className='w-4 h-4 text-gray-400' />
									<span>{h}</span>
								</Link>
							))}
						</div>
					)}

					{isTyping && searchJobs?.items?.length > 0 && (
						<div className='space-y-2'>
							{searchJobs?.items?.map((k, i) => (
								<Link href={`/tim-viec?title=${encodeURIComponent(k.title)}`} key={i} className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
									<Search className='w-4 h-4 text-gray-400' />
									<span>{k.title}</span>
								</Link>
							))}
						</div>
					)}
				</div>

				{/* Cột phải: jobs */}
				<div className='border-l p-6'>
					<p className='font-semibold mb-3 text-xl'>{isTyping ? 'Việc làm liên quan' : 'Có thể bạn quan tâm'}</p>

					{!isTyping && (
						<div className='space-y-3'>
							{recommend.map(job => (
								<div key={job.id} className='px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
									<p className='font-semibold text-gray-800'>{job.title}</p>
									<p className='text-sm text-gray-600'>
										{job.company} - {job.location}
									</p>
								</div>
							))}
						</div>
					)}

					{isTyping && searchJobs?.items?.length > 0 && (
						<div className='space-y-3'>
							{searchJobs?.items?.map(job => (
								<Link href={`/jobs/${job.id}`} key={job.id} className='group flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
									<Avatar className='size-18 border rounded-sm'>
										<AvatarImage src={job.company.avatarUrl}></AvatarImage>
									</Avatar>
									<div className='space-y-1'>
										<p className='font-semibold text-gray-800 line-clamp-1'>{job.title}</p>
										<p className='text-sm text-gray-600 line-clamp-1 font-medium'>{job.company.name}</p>
										<p className='text-primary text-sm font-bold'>{job.salary}</p>
									</div>
									<ArrowRight className='ml-auto size-5 text-primary hidden group-hover:block' />
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}
