import Image from 'next/image';

type EmptyType = 'noData' | 'error' | 'notFound' | 'notification';

interface EmptyProps {
	type?: EmptyType;
	title?: string;
	imageSrc?: string;
	alt?: string;
	height?: number;
	width?: number;
}

const emptyConfigs: Record<EmptyType, { imageSrc: string; alt: string }> = {
	noData: {
		imageSrc: '/illustration/undraw_agreement_w6ua.svg',
		alt: 'no-data',
	},
	error: {
		imageSrc: '/illustration/undraw_warning_re_eoyh.svg',
		alt: 'error',
	},
	notFound: {
		imageSrc: '/illustration/undraw_page_not_found_re_e9o6.svg',
		alt: 'not-found',
	},
	notification: {
		imageSrc: '/illustration/undraw_empty_notification_re_lq1r.svg',
		alt: 'notification',
	},
};

export default function Empty({ type = 'noData', title = 'Không có dữ liêu.', imageSrc, alt, height = 300, width = 300 }: EmptyProps) {
	const config = emptyConfigs[type];

	return (
		<div className='flex flex-col justify-center items-center gap-6 py-8'>
			<Image src={imageSrc || config.imageSrc} alt={alt || config.alt} width={width} height={height} className='max-w-full h-auto' />
			<p className='text-gray-600 '>{title}</p>
		</div>
	);
}
