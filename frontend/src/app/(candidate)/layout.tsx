import Footer from '@/components/home-page/footer';
import Header from '@/components/home-page/header';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen '>
			<Header />
			<div className='mx-auto w-full max-w-7xl p-4 min-h-232'>{children}</div>
			<Footer />
		</div>
	);
}
