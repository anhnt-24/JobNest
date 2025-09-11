'use client';

import Navbar from '@/components/admin/navbar';
import Sidebar from '@/components/admin/sidebar';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='flex h-screen bg-gray-50'>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<div className='flex flex-col flex-1 overflow-hidden'>
				<Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className='flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50'>{children}</main>
			</div>
		</div>
	);
}
