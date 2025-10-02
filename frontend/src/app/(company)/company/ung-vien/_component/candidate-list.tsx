import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Briefcase } from 'lucide-react';

export default function CandidateList() {
	const candidates = [
		{
			id: 1,
			name: 'Nguyễn Văn A',
			avatar: '',
			industry: 'Công nghệ thông tin',
			address: 'Hà Nội',
			gender: 'Nam',
			age: 26,
		},
		{
			id: 2,
			name: 'Trần Thị B',
			avatar: '',
			industry: 'Kế toán',
			address: 'TP.HCM',
			gender: 'Nữ',
			age: 29,
		},
	];

	return (
		<div className='space-y-3 col-span-9'>
			<CardTitle>Danh sách ứng viên </CardTitle>
			{candidates.map(c => (
				<Card key={c.id} className='hover:shadow-sm transition'>
					<CardContent className='flex items-center justify-between py-3'>
						{/* Left: Avatar + Info */}
						<div className='flex items-center gap-4'>
							<Avatar className='h-12 w-12'>
								{c.avatar ? (
									<AvatarImage src={c.avatar} alt={c.name} />
								) : (
									<AvatarFallback>
										{c.name
											.split(' ')
											.map(n => n[0])
											.slice(0, 2)
											.join('')}
									</AvatarFallback>
								)}
							</Avatar>
							<div>
								<div className='font-medium text-lg'>{c.name}</div>
								<div className='flex flex-wrap items-center gap-3 text-sm text-slate-600 mt-1'>
									<span className='flex items-center gap-1'>
										<Briefcase size={14} /> {c.industry}
									</span>
									<span className='flex items-center gap-1'>
										<MapPin size={14} /> {c.address}
									</span>
									<span className='flex items-center gap-1'>
										<User size={14} /> {c.gender} • {c.age} tuổi
									</span>
								</div>
							</div>
						</div>

						{/* Right: Actions */}
						<div className='flex gap-2'>
							<Button size='sm' variant='outline'>
								Xem chi tiết
							</Button>
							<Button size='sm'>Xem CV</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
