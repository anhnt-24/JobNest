'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Eye, FileText, X } from 'lucide-react';
import CandidateFilters from './_component/candiate-filter';
import { SearchBar } from './_component/search-candidate';
import CandidateList from './_component/candidate-list';

// Trang tìm kiếm ứng viên
// - Thanh tìm kiếm (top)
// - Thanh lọc địa chỉ (left)
// - Danh sách ứng viên (giữa) với avatar, tên, địa chỉ, giới tính, ngày sinh
// - Nút: Xem chi tiết (mở dialog) và Xem CV (mở link CV)

type Candidate = {
	id: string;
	name: string;
	avatar?: string;
	address: string;
	gender: 'Nam' | 'Nữ' | 'Khác';
	dob: string; // YYYY-MM-DD
	cvUrl?: string;
	bio?: string;
};

const SAMPLE_CANDIDATES: Candidate[] = [
	{
		id: 'c1',
		name: 'Nguyễn Văn A',
		avatar: '',
		address: 'Hà Nội',
		gender: 'Nam',
		dob: '1994-05-12',
		cvUrl: '#',
		bio: 'Backend developer, 3 năm kinh nghiệm với Node.js và NestJS.',
	},
	{
		id: 'c2',
		name: 'Trần Thị B',
		avatar: '',
		address: 'Hồ Chí Minh',
		gender: 'Nữ',
		dob: '1997-11-03',
		cvUrl: '#',
		bio: 'Front-end developer, React & TypeScript.',
	},
	{
		id: 'c3',
		name: 'Lê Văn C',
		avatar: '',
		address: 'Đà Nẵng',
		gender: 'Nam',
		dob: '1990-02-20',
		cvUrl: '#',
		bio: 'DevOps engineer, AWS & Docker.',
	},
	{
		id: 'c4',
		name: 'Phạm Thị D',
		avatar: '',
		address: 'Hà Nội',
		gender: 'Nữ',
		dob: '1992-08-15',
		cvUrl: '#',
		bio: 'Fullstack, MERN stack.',
	},
	{
		id: 'c5',
		name: 'Hoàng Minh E',
		avatar: '',
		address: 'Cần Thơ',
		gender: 'Nam',
		dob: '1998-01-09',
		cvUrl: '#',
		bio: 'Mobile dev - Flutter.',
	},
];

function formatDate(d: string) {
	try {
		const dt = new Date(d);
		return dt.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
	} catch (e) {
		return d;
	}
}

export default function CandidateSearchPage() {
	const [query, setQuery] = useState('');
	const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
	const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

	const addresses = useMemo(() => {
		return Array.from(new Set(SAMPLE_CANDIDATES.map(c => c.address)));
	}, []);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return SAMPLE_CANDIDATES.filter(c => {
			const matchesQuery = q === '' || [c.name, c.address, c.bio].join(' ').toLowerCase().includes(q);
			const matchesAddress = selectedAddresses.length === 0 || selectedAddresses.includes(c.address);
			return matchesQuery && matchesAddress;
		});
	}, [query, selectedAddresses]);

	const toggleAddress = (addr: string) => {
		setSelectedAddresses(prev => (prev.includes(addr) ? prev.filter(a => a !== addr) : [...prev, addr]));
	};

	return (
		<Card className='p-6'>
			<CardTitle>Tìm kiếm ứng viên</CardTitle>
			<div>
				<SearchBar
					addresses={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']}
					onSearch={(query, address) => {
						console.log('Search:', query, 'Address:', address);
					}}
				/>

				<div className='grid grid-cols-12 gap-6'>
					<CandidateFilters></CandidateFilters>

					<CandidateList></CandidateList>
				</div>
			</div>
		</Card>
	);
}
