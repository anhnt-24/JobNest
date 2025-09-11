'use client';

import {
	Check,
	Briefcase,
	ChevronDown,
	Search,
	Bookmark,
	Send,
	Star,
	Building,
	Users,
	ShoppingCart,
	Calculator,
	Contact,
	Megaphone,
	HardHat,
	Paintbrush,
	Home,
	GraduationCap,
	Phone,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconMap = {
	'Tìm việc làm': Search,
	'Việc làm đã lưu': Bookmark,
	'Việc làm đã ứng tuyển': Send,
	'Việc làm phù hợp': Star,
	'Danh sách công ty': Building,
	'Top công ty': Users,
	'Nhân viên kinh doanh': ShoppingCart,
	'Kế toán': Calculator,
	Marketing: Megaphone,
	'Hành chính nhân sự': Contact,
	'Chăm sóc khách hàng': Users,
	'Ngân hàng': Building,
	IT: HardHat,
	'Lao động phổ thông': HardHat,
	Senior: Users,
	'Kỹ sư xây dựng': HardHat,
	'Thiết kế đồ hoạ': Paintbrush,
	'Bất động sản': Home,
	'Giáo dục': GraduationCap,
	Telesales: Phone,
};

export function JobsDropdown() {
	const dropdownItems = {
		'Việc làm': [
			{ text: 'Tìm việc làm', checked: false },
			{ text: 'Việc làm đã lưu', checked: true },
			{ text: 'Việc làm đã ứng tuyển', checked: false },
			{ text: 'Việc làm phù hợp', checked: false },
		],
		'Công ty': [
			{ text: 'Danh sách công ty', checked: false },
			{ text: 'Top công ty', checked: false },
		],
		'Việc làm theo vị trí': [
			{ text: 'Nhân viên kinh doanh', checked: false },
			{ text: 'Kế toán', checked: false },
			{ text: 'Marketing', checked: false },
			{ text: 'Hành chính nhân sự', checked: false },
			{ text: 'Chăm sóc khách hàng', checked: false },
			{ text: 'Ngân hàng', checked: false },
			{ text: 'IT', checked: false },
		],
		Khác: [
			{ text: 'Lao động phổ thông', checked: false },
			{ text: 'Senior', checked: false },
			{ text: 'Kỹ sư xây dựng', checked: false },
			{ text: 'Thiết kế đồ hoạ', checked: false },
			{ text: 'Bất động sản', checked: false },
			{ text: 'Giáo dục', checked: false },
			{ text: 'Telesales', checked: false },
		],
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<p className='group flex items-center gap-1 text-gray-800 font-medium hover:text-primary px-3  rounded-lg transition-colors '>
					<span className='group-data-[state=open]:text-primary'>Việc làm</span>
					<ChevronDown className={'h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-y-0.5 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary'} />
				</p>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-[600px] p-0 ml-24  mt-1 shadow-xl border border-gray-200' align='end'>
				<ScrollArea className='h-[350px] rounded-md'>
					<div className='grid grid-cols-3'>
						<div className='p-4 col-span-1'>
							<DropdownMenuLabel className='flex items-center text-xs font-semibold uppercase text-gray-500 px-2 py-1'>VIỆC LÀM</DropdownMenuLabel>
							{dropdownItems['Việc làm'].map((item, index) => {
								const IconComponent = iconMap[item.text];
								return (
									<DropdownMenuItem key={index} className='flex items-center px-3 py-2 text-sm hover:bg-blue-50 rounded-md'>
										{item.checked ? <Check className='h-4 w-4 mr-2 text-green-500' /> : IconComponent && <IconComponent className='h-4 w-4 mr-2 text-gray-500' />}
										<span>{item.text}</span>
									</DropdownMenuItem>
								);
							})}

							<DropdownMenuSeparator className='my-2' />

							<DropdownMenuLabel className='flex items-center text-xs font-semibold uppercase text-gray-500 px-2 py-1'>CÔNG TY</DropdownMenuLabel>
							{dropdownItems['Công ty'].map((item, index) => {
								const IconComponent = iconMap[item.text];
								return (
									<DropdownMenuItem key={index} className='flex items-center px-3 py-2 text-sm hover:bg-blue-50 rounded-md'>
										{item.checked ? <Check className='h-4 w-4 mr-2 text-green-500' /> : IconComponent && <IconComponent className='h-4 w-4 mr-2 text-gray-500' />}
										<span>{item.text}</span>
									</DropdownMenuItem>
								);
							})}
						</div>

						<div className='p-4 border-l border-gray-100 col-span-2'>
							<DropdownMenuLabel className='flex items-center text-xs font-semibold uppercase text-gray-500 px-2 py-1'>VIỆC LÀM THEO VỊ TRÍ</DropdownMenuLabel>
							<div className='grid grid-cols-2 gap-1'>
								{dropdownItems['Việc làm theo vị trí'].map((item, index) => {
									const IconComponent = iconMap[item.text];
									return (
										<DropdownMenuItem key={index} className='flex items-center px-2 py-1.5 text-sm hover:bg-blue-50 rounded-md'>
											{item.checked ? <Check className='h-3 w-3 mr-1.5 text-green-500' /> : IconComponent && <IconComponent className='h-3 w-3 mr-1.5 text-gray-500' />}
											<span>{item.text}</span>
										</DropdownMenuItem>
									);
								})}
							</div>

							<DropdownMenuSeparator className='my-2' />

							<DropdownMenuLabel className='flex items-center text-xs font-semibold uppercase text-gray-500 px-2 py-1'>KHÁC</DropdownMenuLabel>
							<div className='grid grid-cols-2 gap-1'>
								{dropdownItems['Khác'].map((item, index) => {
									const IconComponent = iconMap[item.text];
									return (
										<DropdownMenuItem key={index} className='flex items-center px-2 py-1.5 text-sm hover:bg-blue-50 rounded-md'>
											{item.checked ? <Check className='h-3 w-3 mr-1.5 text-green-500' /> : IconComponent && <IconComponent className='h-3 w-3 mr-1.5 text-gray-500' />}
											<span>{item.text}</span>
										</DropdownMenuItem>
									);
								})}
							</div>
						</div>
					</div>
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
