'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Settings, Save, Send, File, Bell } from 'lucide-react';
import { FaBell, FaFile, FaGear, FaHouse, FaPaperPlane, FaUser } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const tabData = [
	{ href: '/', label: 'Trang chủ', icon: <FaHouse className='size-6' /> },
	{ href: '/profile', label: 'Tài khoản', icon: <FaUser className='size-6' /> },
	{ href: '/profile', label: 'Cài đặt', icon: <FaGear className='size-6' /> },
	{ href: '/candidate/save-job', label: 'Việc làm đã lưu', icon: <FaSave className='size-6' /> },
	{ href: '/candidate/applied-jobs', label: 'Việc làm đã ứng tuyển', icon: <FaPaperPlane className='size-6' /> },
	{ href: '/candidate/cv', label: 'Quản lý cv', icon: <FaFile className='size-6' /> },

	{ href: '/jobs', label: 'Thông báo', icon: <FaBell className='size-6' /> },
];

export function HorizontalTabs() {
	const pathname = usePathname();
	const navRef = useRef<HTMLDivElement>(null);
	const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

	useEffect(() => {
		if (!navRef.current) return;
		const activeIndex = tabData.findIndex(tab => tab.href === pathname);
		const tabElements = navRef.current.children;
		if (activeIndex === -1 || !tabElements[activeIndex]) return;

		const activeTab = tabElements[activeIndex] as HTMLElement;
		setSliderStyle({
			left: activeTab.offsetLeft,
			width: activeTab.offsetWidth,
		});
	}, [pathname]);

	return (
		<div className='top-18 right-0 left-0 fixed z-10 flex justify-center items-center p-6 bg-primary shadow-sm'>
			<div className='max-w-7xl w-full relative'>
				<nav ref={navRef} className='flex items-center justify-between relative'>
					{tabData.map(tab => {
						const isActive = pathname === tab.href;
						return (
							<Link
								key={tab.href}
								href={tab.href}
								className={`flex uppercase gap-2 font-semibold items-center space-y-1 text-gray-50 hover:text-yellow-400 transition-colors ${isActive && ' text-yellow-400'}`}>
								{tab.icon}
								<span>{tab.label}</span>
							</Link>
						);
					})}

					<div className='absolute -bottom-6 h-1 bg-yellow-400 rounded transition-all duration-300' style={{ left: sliderStyle.left, width: sliderStyle.width }} />
				</nav>
			</div>
		</div>
	);
}
