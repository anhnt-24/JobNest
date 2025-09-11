'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LoadingButtonProps {
	onClickAsync: (...props: any) => Promise<void>;
	children: any;
}

export function LoadingButton({ onClickAsync, children, ...props }: LoadingButtonProps) {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			await onClickAsync();
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button {...props} onClick={handleClick} disabled={loading}>
			{loading ? 'Đang xử lý...' : children}
		</Button>
	);
}
