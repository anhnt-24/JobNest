'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, List, MapPin, Search } from 'lucide-react';

export default function JobSearchBar() {
	const [jobTitle, setJobTitle] = useState('giám đốc điều hành');
	const [location, setLocation] = useState('Hà Nội');

	return (
		<div className=' z-50 fixed gap-2 bg-red-800  right-0 left-0 top-18'>
			<div className='flex items-center gap-2 justify-center mx-auto p-4 max-w-7xl'>
				<Select>
					<SelectTrigger className='w-[200px] bg-white'>
						<div className='flex items-center gap-2'>
							<List className='w-4 h-4 text-gray-600' />
							<SelectValue placeholder='Danh mục Nghề' />
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='it'>IT</SelectItem>
						<SelectItem value='marketing'>Marketing</SelectItem>
						<SelectItem value='finance'>Tài chính</SelectItem>
					</SelectContent>
				</Select>

				{/* Input tìm kiếm job */}
				<div className='flex items-center flex-1 bg-white rounded-md px-3'>
					<Search className='w-4 h-4 text-gray-400 mr-2' />
					<Input className='border-0 focus-visible:ring-0 px-0' placeholder='Nhập vị trí công việc...' value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
					{jobTitle && <X className='w-4 h-4 text-gray-400 cursor-pointer' onClick={() => setJobTitle('')} />}
				</div>

				<Select>
					<SelectTrigger className='w-[200px] bg-white'>
						<div className='flex items-center gap-2'>
							<MapPin className='w-4 h-4 text-gray-600' />
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
				<Button className='px-6'>Tìm kiếm</Button>
			</div>
		</div>
	);
}
