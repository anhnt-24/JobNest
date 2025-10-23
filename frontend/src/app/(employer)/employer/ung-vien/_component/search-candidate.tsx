'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchBarProps {
	addresses: string[];
	onSearch: (query: string, address: string) => void;
}

export function SearchBar({ addresses, onSearch }: SearchBarProps) {
	const [query, setQuery] = useState('');
	const [selectedAddress, setSelectedAddress] = useState('all');

	const handleReset = () => {
		setQuery('');
		setSelectedAddress('all');
		onSearch('', 'all');
	};

	return (
		<div className='flex items-center gap-4 mb-6'>
			{/* Input search */}
			<Input
				placeholder='Tìm theo tên, kỹ năng...'
				value={query}
				onChange={e => {
					setQuery(e.target.value);
					onSearch(e.target.value, selectedAddress);
				}}
				className='flex-1'
			/>

			{/* Select địa chỉ */}
			<Select
				value={selectedAddress}
				onValueChange={value => {
					setSelectedAddress(value);
					onSearch(query, value);
				}}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Chọn địa chỉ' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>Tất cả</SelectItem>
					{addresses.map(addr => (
						<SelectItem key={addr} value={addr}>
							{addr}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{/* Nút xóa */}
			<Button>
				<Search></Search>
				Tìm kiếm
			</Button>
		</div>
	);
}
