'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Undo, Redo } from 'lucide-react';

export default function FormatToolbar() {
	const [bold, setBold] = useState(false);
	const [italic, setItalic] = useState(false);
	const [underline, setUnderline] = useState(false);
	const [strike, setStrike] = useState(false);

	const groups = [
		// Nhóm Undo/Redo
		[
			{ icon: <Undo />, label: 'Undo', onClick: () => {} },
			{ icon: <Redo />, label: 'Redo', onClick: () => {} },
		],
		// Nhóm định dạng text
		[
			{ icon: <Bold />, label: 'Bold', onClick: () => setBold(!bold), active: bold },
			{ icon: <Italic />, label: 'Italic', onClick: () => setItalic(!italic), active: italic },
			{ icon: <Underline />, label: 'Underline', onClick: () => setUnderline(!underline), active: underline },
			{ icon: <Strikethrough />, label: 'Strikethrough', onClick: () => setStrike(!strike), active: strike },
		],
		// Nhóm căn lề
		[
			{ icon: <AlignLeft />, label: 'Align Left', onClick: () => {} },
			{ icon: <AlignCenter />, label: 'Align Center', onClick: () => {} },
			{ icon: <AlignRight />, label: 'Align Right', onClick: () => {} },
		],
		// Nhóm danh sách
		[
			{ icon: <List />, label: 'Bullet List', onClick: () => {} },
			{ icon: <ListOrdered />, label: 'Numbered List', onClick: () => {} },
		],
		// Nhóm màu
		[
			{ icon: <Italic />, label: 'Text Color', onClick: () => {} },
			{ icon: <Italic />, label: 'Highlight', onClick: () => {} },
		],
	];

	return (
		<div className='flex flex-col items-center gap-2 p-2 bg-white border h-fit sticky top-44'>
			{groups.map((group, gIdx) => (
				<React.Fragment key={gIdx}>
					{group.map((btn, idx) => (
						<Tooltip key={idx}>
							<TooltipTrigger asChild>
								<Button variant='ghost' size='sm' onClick={btn.onClick} className={btn.active ? 'bg-gray-200' : ''}>
									{btn.icon}
								</Button>
							</TooltipTrigger>
							<TooltipContent side='left'>{btn.label}</TooltipContent>
						</Tooltip>
					))}
					{gIdx < groups.length - 1 && <div className='border-t border-gray-200 my-1 w-full' />}
				</React.Fragment>
			))}
		</div>
	);
}
