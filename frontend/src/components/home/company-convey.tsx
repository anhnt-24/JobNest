'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const InfiniteEmployerCarousel = () => {
	const employers = [
		{ name: 'Apollo', isTop: false, thumbnail: 'apollo.png' },
		{ name: 'Chaillease', isTop: false, thumbnail: 'chaillease.png' },
		{ name: 'Cnvcdp', isTop: false, thumbnail: 'cnvcdp.png' },
		{ name: 'Edupia', isTop: false, thumbnail: 'edupia.png' },
		{ name: 'Fpt', isTop: true, thumbnail: 'fpt.png' },
		{ name: 'Lg', isTop: true, thumbnail: 'Lg.png' },
		{ name: 'Mb', isTop: true, thumbnail: 'mb.png' },
		{ name: 'Sailun', isTop: false, thumbnail: 'sailun.png' },
		{ name: 'Spx', isTop: false, thumbnail: 'spx.png' },
		{ name: 'Teky', isTop: false, thumbnail: 'teky.png' },
		{ name: 'Vib', isTop: false, thumbnail: 'vib.png' },
		{ name: 'Viettel', isTop: true, thumbnail: 'viettel.png' },
		{ name: 'Vpbank', isTop: true, thumbnail: 'vpbank.png' },
	];

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const scroller = scrollerRef.current;

		if (!container || !scroller) return;
		const scrollerContent = Array.from(scroller.children);
		scrollerContent.forEach(item => {
			const duplicatedItem = item.cloneNode(true);
			scroller.appendChild(duplicatedItem);
		});

		let animationFrameId: number;
		let speed = 1;

		const animate = () => {
			if (scroller) {
				scroller.style.transform = `translateX(-${speed}px)`;
				speed += 0.5;
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
		<div className='w-full p-24 bg-white'>
			<div ref={containerRef} className='w-full overflow-hidden'>
				<div ref={scrollerRef} className='flex w-max gap-4 py-2'>
					{employers.map(employer => (
						<div className='flex flex-col items-center min-w-[150px] '>
							<div className='size-32 relative'>
								<Image src={`/company/${employer.thumbnail}`} alt={employer.name} fill className='object-contain' />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default InfiniteEmployerCarousel;
