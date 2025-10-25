'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
	{
		title: 'Tìm việc làm theo ngành nghề',
		items: [
			'Việc làm An toàn lao động',
			'Việc làm Bán hàng kỹ thuật',
			'Việc làm Bán lẻ / bán sỉ',
			'Việc làm Báo chí / Truyền hình',
			'Việc làm Bảo hiểm',
			'Việc làm Bảo trì / Sửa chữa',
			'Việc làm Bất động sản',
			'Việc làm Biên / Phiên dịch',
			'Việc làm Bưu chính - Viễn thông',
		],
	},
	{
		title: 'Tìm việc làm tại nhà',
		items: [
			'Việc làm tại Hà Nội',
			'Việc làm tại Hồ Chí Minh',
			'Việc làm tại Bình Dương',
			'Việc làm tại Bắc Ninh',
			'Việc làm tại Đồng Nai',
			'Việc làm tại Hưng Yên',
			'Việc làm tại Hải Dương',
			'Việc làm tại Đà Nẵng',
			'Việc làm tại Hải Phòng',
		],
	},
	{
		title: 'Việc làm phổ biến',
		items: [
			'Tìm việc làm Content',
			'Tìm việc làm Copywriter/Copywriting',
			'Tìm việc làm Content Writer',
			'Tìm việc làm Content Creator',
			'Tìm việc làm Content Marketing',
			'Tìm việc làm Social Content',
			'Tìm việc làm Biên tập viên',
			'Tìm việc làm Biên phiên dịch tiếng Anh',
			'Tìm việc làm Giảng viên tiếng Anh',
		],
	},
];

export default function JobKeywords() {
	return (
		<div className='w-full py-10  bg-white'>
			<div className=' max-w-7xl mx-auto'>
				<h1 className='mb-6'>Từ khoá tìm việc làm phổ biến</h1>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{categories.map((category, idx) => (
						<Card key={idx} className='bg-gray-100'>
							<CardTitle className='text-xl'>{category.title}</CardTitle>
							<ul className='space-y-4'>
								{category.items.map((item, i) => (
									<li key={i} className='border-b pb-2 font-medium text-gray-700 hover:text-primary cursor-pointer'>
										{item}
									</li>
								))}
							</ul>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
