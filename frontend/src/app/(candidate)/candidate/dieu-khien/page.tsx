'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart, Line, ResponsiveContainer } from 'recharts';
import { FaBookmark, FaFileAlt, FaClipboardCheck, FaRegNewspaper } from 'react-icons/fa';
import ActivityFeed from './_component/activity-feed';

// ==== Dữ liệu mẫu ====
const stats = {
	savedJobs: 12,
	yourCV: 3,
	appliedJobs: 8,
};

const pieDataJobs = [
	{ name: 'Đã lưu', value: stats.savedJobs },
	{ name: 'Đã ứng tuyển', value: stats.appliedJobs },
];

const pieDataAppliedStatus = [
	{ name: 'Chờ phản hồi', value: 3 },
	{ name: 'Phỏng vấn', value: 4 },
	{ name: 'Trúng tuyển', value: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const barData = [
	{ month: 'Th1', applied: 2 },
	{ month: 'Th2', applied: 3 },
	{ month: 'Th3', applied: 1 },
	{ month: 'Th4', applied: 2 },
];

const newsData = [
	{ title: 'Công ty A tuyển Frontend', date: '29/09/2025' },
	{ title: 'Công ty B tuyển Backend', date: '28/09/2025' },
	{ title: 'Công ty C tuyển Fullstack', date: '27/09/2025' },
];

const activityData = [
	{ activity: 'Ứng tuyển vị trí Frontend Developer', date: '29/09/2025', type: 'applied' },
	{ activity: 'Lưu việc làm Backend Developer', date: '28/09/2025', type: 'saved' },
	{ activity: 'Bình luận trên tin tuyển dụng', date: '27/09/2025', type: 'comment' },
];

const comboData = [
	{ month: 'Th1', applied: 2, saved: 5 },
	{ month: 'Th2', applied: 3, saved: 6 },
	{ month: 'Th3', applied: 1, saved: 4 },
	{ month: 'Th4', applied: 2, saved: 7 },
];

// ==== Component ====
export default function CandidateDashboard() {
	const [search, setSearch] = useState('');

	const handleSearch = () => {
		alert(`Tìm kiếm: ${search}`);
	};

	return (
		<div className='p-6 space-y-4 bg-white'>
			{/* Header + Tìm kiếm */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h2 className='text-2xl font-bold'>Dashboard Ứng viên</h2>
					<p className='text-gray-500'>Tổng quan hoạt động của bạn</p>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='p-4 bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-md text-center flex flex-col items-center gap-2 hover:scale-105 transition-transform'>
					<FaBookmark className='w-8 h-8 text-blue-600' />
					<p className='text-gray-700 font-medium'>Tổng số việc đã lưu</p>
					<p className='text-2xl font-bold text-blue-800'>{stats.savedJobs}</p>
				</div>

				<div className='p-4 bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-md text-center flex flex-col items-center gap-2 hover:scale-105 transition-transform'>
					<FaFileAlt className='w-8 h-8 text-green-600' />
					<p className='text-gray-700 font-medium'>Số CV của bạn</p>
					<p className='text-2xl font-bold text-green-800'>{stats.yourCV}</p>
				</div>

				<div className='p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-lg rounded-md text-center flex flex-col items-center gap-2 hover:scale-105 transition-transform'>
					<FaClipboardCheck className='w-8 h-8 text-yellow-600' />
					<p className='text-gray-700 font-medium'>Tổng số việc đã ứng tuyển</p>
					<p className='text-2xl font-bold text-yellow-800'>{stats.appliedJobs}</p>
				</div>
			</div>

			<div className='bg-white mt-8'>
				<h3 className='text-lg font-semibold mb-2'>Số việc đã ứng tuyển và đã lưu theo tháng</h3>
				<ResponsiveContainer width='100%' height={300}>
					<ComposedChart data={comboData}>
						<defs>
							<linearGradient id='colorApplied' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor='#0088FE' stopOpacity={0.8} />
								<stop offset='100%' stopColor='#0088FE' stopOpacity={0.3} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='month' />
						<YAxis />
						<Tooltip formatter={(value: number) => [`${value}`, 'Số lượng']} />
						<Legend verticalAlign='top' height={36} />
						<Bar dataKey='applied' fill='url(#colorApplied)' name='Đã ứng tuyển' animationDuration={1500} />
						<Line type='monotone' dataKey='saved' stroke='#FFBB28' strokeWidth={3} dot={{ r: 5, fill: '#FFBB28' }} activeDot={{ r: 7 }} name='Đã lưu' animationDuration={1500} />
					</ComposedChart>
				</ResponsiveContainer>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h3 className='text-lg font-semibold mb-2'>Tỷ lệ trạng thái việc làm</h3>
					<ResponsiveContainer width='100%' height={250}>
						<PieChart>
							<Pie data={pieDataJobs} cx='50%' cy='50%' outerRadius={80} dataKey='value' label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
								{pieDataJobs.map((entry, index) => (
									<Cell key={index} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip formatter={(value, name) => [`${value}`, name]} />
							<Legend layout='horizontal' verticalAlign='bottom' align='center' iconType='circle' />
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div>
					<h3 className='text-lg font-semibold mb-2'>Tỷ lệ trạng thái việc đã ứng tuyển</h3>
					<ResponsiveContainer width='100%' height={250}>
						<PieChart>
							<Pie data={pieDataAppliedStatus} cx='50%' cy='50%' outerRadius={80} dataKey='value' label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
								{pieDataAppliedStatus.map((entry, index) => (
									<Cell key={index} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip formatter={(value, name) => [`${value}`, name]} />
							<Legend layout='horizontal' verticalAlign='bottom' align='center' iconType='circle' />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<ActivityFeed activityData={activityData} />
		</div>
	);
}
