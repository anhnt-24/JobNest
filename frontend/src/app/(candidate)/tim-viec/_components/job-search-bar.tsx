'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, List, MapPin, Search } from 'lucide-react';
import { FaLocationDot } from 'react-icons/fa6';
import { SearchResultDropdown } from '@/components/ui/custom/search-result-dropdown';

export default function JobSearchBar({ title }: { title: string }) {
	const [location, setLocation] = useState('Hà Nội');
	const [query, setQuery] = useState('');
	const [focused, setFocused] = useState(false);
	useEffect(() => {
		setQuery(title);
	}, []);
	return (
		<div className=' z-50 fixed gap-2 bg-green-900  right-0 left-0 top-18'>
			<div className='flex items-center gap-2 justify-center mx-auto p-4 max-w-7xl relative'>
				{/* Input tìm kiếm job */}
				<div className='flex items-center flex-1 bg-white rounded-xs px-3 relative'>
					{focused && <SearchResultDropdown query={query} />}
					<Search className='size-5 text-gray-600 mr-2' />
					<Input
						className='border-0 focus-visible:ring-0 px-0'
						placeholder='Nhập vị trí công việc...'
						value={query}
						onChange={e => setQuery(e.target.value)}
						onFocus={() => setFocused(true)}
						onBlur={() => setTimeout(() => setFocused(false), 200)}
					/>
					{query && <X className='w-4 h-4 text-gray-400 cursor-pointer' onClick={() => setQuery('')} />}
				</div>

				<Select>
					<SelectTrigger className='w-[200px] bg-white rounded-xs'>
						<div className='flex items-center gap-2'>
							<FaLocationDot className='w-4 h-4 text-gray-600' />
							<SelectValue placeholder='Địa điểm' />
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='it'>IT</SelectItem>
						<SelectItem value='marketing'>Hà Nội</SelectItem>
						<SelectItem value='finance'>TP Hồ Chí Minh</SelectItem>
					</SelectContent>
				</Select>

				{/* Nút tìm kiếm */}
				<Button className='px-6 rounded-xs'>Tìm kiếm</Button>
			</div>
		</div>
	);
}
