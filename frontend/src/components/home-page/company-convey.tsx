// components/infinite-employer-carousel.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const InfiniteEmployerCarousel = () => {
	const employers = [
		{ id: 1, name: 'Shinhan Bank' },
		{ id: 2, name: 'MB' },
		{ id: 3, name: 'Sun Life' },
		{ id: 4, name: 'SALLIN TIRE' },
		{ id: 5, name: 'SeABank' },
		{ id: 6, name: 'Techcombank' },
		{ id: 7, name: 'Vietcombank' },
		{ id: 8, name: 'VinGroup' },
	];

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const scroller = scrollerRef.current;

		if (!container || !scroller) return;

		// Nhân đôi items để tạo hiệu ứng vô hạn
		const scrollerContent = Array.from(scroller.children);
		scrollerContent.forEach(item => {
			const duplicatedItem = item.cloneNode(true);
			scroller.appendChild(duplicatedItem);
		});

		let animationFrameId: number;
		let speed = 1; // Tốc độ chạy

		const animate = () => {
			if (scroller) {
				scroller.style.transform = `translateX(-${speed}px)`;
				speed += 0.5;

				// Reset vị trí khi scroll hết
				if (speed >= scroller.scrollWidth / 2) {
					speed = 0;
				}
			}
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className='w-full py-8'>
			<div ref={containerRef} className='w-full overflow-hidden'>
				<div ref={scrollerRef} className='flex w-max gap-4 py-2'>
					{employers.map(employer => (
						<div key={employer.id} className='flex flex-col items-center min-w-[150px] '>
							<div className='w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-200 bg-white'>
								<Image src={`/image.png`} alt={employer.name} fill className='object-contain p-2' />
							</div>
							<span className='mt-2 text-sm font-semibold text-primary-foreground'>{employer.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default InfiniteEmployerCarousel;
