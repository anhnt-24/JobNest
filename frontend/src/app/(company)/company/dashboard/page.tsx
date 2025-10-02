'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { LucideIcon, User, MapPin, Briefcase, Calendar } from 'lucide-react';

// Charts
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';

// Dummy data (replace with real data/fetching)
const kpis = {
	totalCandidates: 1284,
	newThisWeek: 42,
	openJobs: 12,
	passRate: 38, // percent
	activeRecruiters: 7,
};

const timeSeries = [
	{ period: 'W1', candidates: 80 },
	{ period: 'W2', candidates: 120 },
	{ period: 'W3', candidates: 95 },
	{ period: 'W4', candidates: 150 },
	{ period: 'W5', candidates: 180 },
	{ period: 'W6', candidates: 130 },
];

const funnelData = [
	{ name: 'Applied', value: 1200 },
	{ name: 'Phone Screen', value: 480 },
	{ name: 'Onsite', value: 220 },
	{ name: 'Offer', value: 90 },
	{ name: 'Hired', value: 48 },
];

const latestCandidates = [
	{ id: 'C-001', name: 'Nguyễn Văn A', industry: 'IT', address: 'Hà Nội', gender: 'Nam', age: 26, cv: '#' },
	{ id: 'C-002', name: 'Trần Thị B', industry: 'Kế toán', address: 'HCM', gender: 'Nữ', age: 29, cv: '#' },
	{ id: 'C-003', name: 'Lê Văn C', industry: 'Marketing', address: 'Đà Nẵng', gender: 'Nam', age: 31, cv: '#' },
	{ id: 'C-004', name: 'Phạm Thị D', industry: 'HR', address: 'HCM', gender: 'Nữ', age: 27, cv: '#' },
	{ id: 'C-005', name: 'Hoàng E', industry: 'Finance', address: 'Hà Nội', gender: 'Nam', age: 34, cv: '#' },
];

const openJobs = [
	{ id: 'J-001', title: 'Backend Developer', needed: 3, hired: 1, due: '2025-10-10' },
	{ id: 'J-002', title: 'Senior Accountant', needed: 1, hired: 0, due: '2025-10-05' },
	{ id: 'J-003', title: 'Product Designer', needed: 2, hired: 1, due: '2025-11-01' },
];

const activities = [
	{ id: 1, text: 'Nguyễn Văn A vừa nộp CV cho Backend Developer', time: '2 giờ trước' },
	{ id: 2, text: 'Trần Thị B được đánh dấu: Đạt', time: '3 giờ trước' },
	{ id: 3, text: 'Phỏng vấn: Lê Văn C - 2025-10-02 10:00', time: '1 ngày' },
];

export default function CompanyDashboard() {
	const [search, setSearch] = useState('');
	const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

	return (
		<div className='space-y-6'>
			{/* Header / KPI */}
			<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
				<Card className='col-span-1 md:col-span-1'>
					<CardContent>
						<div className='text-sm text-slate-500'>Tổng số ứng viên</div>
						<div className='text-2xl font-semibold'>{kpis.totalCandidates}</div>
						<div className='text-xs text-slate-400 mt-1'>Ứng viên đã nộp hồ sơ</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className='text-sm text-slate-500'>CV mới trong tuần</div>
						<div className='text-2xl font-semibold'>{kpis.newThisWeek}</div>
						<div className='text-xs text-slate-400 mt-1'>So với tuần trước</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className='text-sm text-slate-500'>Vị trí đang mở</div>
						<div className='text-2xl font-semibold'>{kpis.openJobs}</div>
						<div className='text-xs text-slate-400 mt-1'>Vị trí cần tuyển</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className='text-sm text-slate-500'>Tỷ lệ đạt yêu cầu</div>
						<div className='text-2xl font-semibold'>{kpis.passRate}%</div>
						<div className='text-xs text-slate-400 mt-1'>Ứng viên đạt tiêu chí tuyển dụng</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className='text-sm text-slate-500'>Người tuyển dụng đang hoạt động</div>
						<div className='text-2xl font-semibold'>{kpis.activeRecruiters}</div>
						<div className='text-xs text-slate-400 mt-1'>Đang online</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<Card className='lg:col-span-2'>
					<CardHeader>
						<CardTitle>Số ứng viên theo thời gian</CardTitle>
					</CardHeader>
					<CardContent className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={timeSeries}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='period' />
								<YAxis />
								<Tooltip />
								<Line type='monotone' dataKey='candidates' stroke='#2563eb' strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Funnel tuyển dụng</CardTitle>
					</CardHeader>
					<CardContent className='h-64 flex items-center justify-center'>
						<ResponsiveContainer width='100%' height={220}>
							<FunnelChart>
								<Funnel dataKey='value' data={funnelData} isAnimationActive>
									<LabelList position='right' />
								</Funnel>
							</FunnelChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Phân bổ theo trạng thái</CardTitle>
					</CardHeader>
					<CardContent className='h-64 flex items-center justify-center'>
						<ResponsiveContainer width='100%' height={220}>
							<PieChart>
								<Pie
									data={[
										{ name: 'Applied', value: 1200 },
										{ name: 'Interview', value: 480 },
										{ name: 'Hired', value: 48 },
									]}
									dataKey='value'
									outerRadius={80}
									label>
									<Cell fill='#60a5fa' />
									<Cell fill='#34d399' />
									<Cell fill='#f97316' />
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Quick Tables */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				{/* Latest candidates */}
				<Card className='lg:col-span-1'>
					<CardHeader>
						<CardTitle>Ứng viên mới nhất</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className='h-60'>
							<div className='space-y-3'>
								{latestCandidates.map(c => (
									<div key={c.id} className='flex items-center justify-between'>
										<div className='flex items-center gap-3'>
											<Avatar className='w-10 h-10'>
												<AvatarFallback>
													{c.name
														.split(' ')
														.map(n => n[0])
														.slice(0, 2)
														.join('')}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className='font-medium'>{c.name}</div>
												<div className='text-xs text-slate-500'>
													{c.industry} • {c.address}
												</div>
											</div>
										</div>
										<div className='flex gap-2'>
											<Dialog>
												<DialogTrigger asChild>
													<Button size='sm' variant='outline' onClick={() => setSelectedCandidate(c)}>
														Xem
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Chi tiết — {selectedCandidate?.name}</DialogTitle>
													</DialogHeader>
													<div className='space-y-3 mt-4'>
														<div className='flex items-center gap-3'>
															<Avatar className='w-12 h-12'>
																<AvatarFallback>
																	{selectedCandidate?.name
																		?.split(' ')
																		.map(n => n[0])
																		.slice(0, 2)
																		.join('')}
																</AvatarFallback>
															</Avatar>
															<div>
																<div className='font-medium'>{selectedCandidate?.name}</div>
																<div className='text-sm text-slate-500'>
																	{selectedCandidate?.industry} • {selectedCandidate?.address}
																</div>
															</div>
														</div>
														<div>
															<div className='text-sm text-slate-500'>Giới tính</div>
															<div className='font-medium'>{selectedCandidate?.gender}</div>
														</div>
														<div>
															<div className='text-sm text-slate-500'>Tuổi</div>
															<div className='font-medium'>{selectedCandidate?.age}</div>
														</div>
													</div>
													<DialogFooter>
														<Button variant='outline'>Đóng</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>

											<Button size='sm' onClick={() => window.open(c.cv, '_blank')}>
												CV
											</Button>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Open jobs */}
				<Card>
					<CardHeader>
						<CardTitle>Việc làm đang mở</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Job</TableHead>
									<TableHead>Needed</TableHead>
									<TableHead>Due</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{openJobs.map(j => (
									<TableRow key={j.id}>
										<TableCell className='font-medium'>{j.title}</TableCell>
										<TableCell>{j.needed - j.hired}</TableCell>
										<TableCell>{j.due}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Recent activities */}
				<Card>
					<CardHeader>
						<CardTitle>Hoạt động gần đây</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{activities.map(a => (
								<div key={a.id} className='text-sm text-slate-600'>
									{a.text} <div className='text-xs text-slate-400'>{a.time}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Notifications / Reminders */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>Nhắc việc - Phỏng vấn sắp tới</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							<div className='flex items-start justify-between'>
								<div>
									<div className='font-medium'>Lê Văn C</div>
									<div className='text-xs text-slate-500'>Phỏng vấn: 2025-10-02 10:00</div>
								</div>
								<div>
									<Badge>08:00</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Cảnh báo - Job sắp hết hạn</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{openJobs.map(j => (
								<div key={j.id} className='flex items-center justify-between'>
									<div>
										<div className='font-medium'>{j.title}</div>
										<div className='text-xs text-slate-500'>Hạn: {j.due}</div>
									</div>
									<div>{new Date(j.due) < new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) ? <Badge variant='destructive'>Sắp hết hạn</Badge> : <Badge>OK</Badge>}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
