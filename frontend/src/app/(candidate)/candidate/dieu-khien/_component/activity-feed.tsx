import { FaUserCheck, FaRegEdit, FaRegCommentDots } from 'react-icons/fa';

interface ActivityItem {
	activity: string;
	date: string;
	type?: 'applied' | 'saved' | 'comment'; // ví dụ phân loại icon
}

interface ActivityFeedProps {
	activityData: ActivityItem[];
}

export default function ActivityFeed({ activityData }: ActivityFeedProps) {
	const getIcon = (type?: string) => {
		switch (type) {
			case 'applied':
				return <FaUserCheck className='text-green-500 w-5 h-5' />;
			case 'saved':
				return <FaRegEdit className='text-blue-500 w-5 h-5' />;
			case 'comment':
				return <FaRegCommentDots className='text-yellow-500 w-5 h-5' />;
			default:
				return <FaRegEdit className='text-gray-400 w-5 h-5' />;
		}
	};

	return (
		<div>
			<h3 className='text-lg font-semibold mb-4 text-gray-800'>Lịch sử hoạt động</h3>
			<ul className='space-y-2'>
				{activityData.map((item, idx) => (
					<li key={idx} className='flex justify-between items-center border-b border-gray-200 pb-2 hover:bg-gray-50 transition-colors rounded-md px-2'>
						<div className='flex items-center gap-2'>
							{getIcon(item.type)}
							<span className='text-gray-700'>{item.activity}</span>
						</div>
						<span className='text-gray-400 text-sm'>{item.date}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
