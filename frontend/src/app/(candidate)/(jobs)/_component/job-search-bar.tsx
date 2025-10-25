'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, List, MapPin, Search } from 'lucide-react';
import { FaLocationDot } from 'react-icons/fa6';
import { SearchResultDropdown } from '@/components/shared/search-result-dropdown';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
export default function JobSearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const title = searchParams.get('title');
	const [location, setLocation] = useState('Hà Nội');
	const [query, setQuery] = useState('');

	const [focused, setFocused] = useState(false);
	useEffect(() => {
		if (title) setQuery(title);
	}, [title]);
	const handleSearch = () => {
		router.push(`/tim-viec?title=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
		inputRef.current?.blur();
	};

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className=' z-50 fixed gap-2 bg-green-900  right-0 left-0 top-18'>
			<div className='flex items-center gap-2 justify-center mx-auto py-4 max-w-7xl relative'>
				<div className=' flex-1 flex relative gap-2'>
					{focused && <SearchResultDropdown query={query} />}

					<div className='flex items-center flex-1 bg-white rounded-xs px-3 relative h-12'>
						<Search className='size-5 text-gray-600 mr-2' />
						<Input
							ref={inputRef}
							className='border-0 focus-visible:ring-0 px-0'
							placeholder='Nhập vị trí công việc...'
							value={query}
							onChange={e => setQuery(e.target.value)}
							onFocus={() => setFocused(true)}
							onBlur={() => setTimeout(() => setFocused(false), 200)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleSearch();
								}
							}}
						/>
						{query && <X className='w-4 h-4 text-gray-400 cursor-pointer' onClick={() => setQuery('')} />}
					</div>

					<Select>
						<SelectTrigger className='w-[200px] bg-white rounded-xs !h-12'>
							<div className='flex items-center gap-2'>
								<FaLocationDot className='text-primary' />
								<SelectValue placeholder='Địa điểm' />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='it'>IT</SelectItem>
							<SelectItem value='marketing'>Hà Nội</SelectItem>
							<SelectItem value='finance'>TP Hồ Chí Minh</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className='px-6 rounded-xs h-12 text-lg' onClick={handleSearch}>
					Tìm kiếm
				</Button>
			</div>
		</div>
	);
}
