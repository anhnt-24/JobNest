import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Briefcase, Building2, Users } from 'lucide-react';

export default function DashboardPage() {
	const stats = [
		{
			title: 'Tổng việc làm',
			value: '1,234',
			icon: Briefcase,
			change: '+12%',
			changeType: 'positive',
		},
		{
			title: 'Ứng viên',
			value: '5,678',
			icon: Users,
			change: '+8%',
			changeType: 'positive',
		},
		{
			title: 'Công ty',
			value: '456',
			icon: Building2,
			change: '+3%',
			changeType: 'positive',
		},
		{
			title: 'Hoạt động',
			value: '2,345',
			icon: Activity,
			change: '-2%',
			changeType: 'negative',
		},
	];

	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Dashboard</h1>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{stats.map(stat => (
					<Card key={stat.title}>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
							<stat.icon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{stat.value}</div>
							<p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>{stat.change} so với tháng trước</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className='grid gap-4 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Việc làm mới nhất</CardTitle>
					</CardHeader>
					<CardContent>{/* Thêm bảng hoặc danh sách việc làm mới nhất */}</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Ứng viên mới nhất</CardTitle>
					</CardHeader>
					<CardContent>{/* Thêm bảng hoặc danh sách ứng viên mới nhất */}</CardContent>
				</Card>
			</div>
		</div>
	);
}
