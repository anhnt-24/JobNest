'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
	showSpinner: false,
	trickleSpeed: 300,
	minimum: 0.15,
});

export default function ProgressBar() {
	const pathname = usePathname();

	useEffect(() => {
		NProgress.start();

		const timer = setTimeout(() => {
			NProgress.done();
		}, 700);

		return () => clearTimeout(timer);
	}, [pathname]);

	return null;
}
