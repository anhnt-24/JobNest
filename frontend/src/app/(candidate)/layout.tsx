import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen '>
			<Header />
			<div className='mx-auto w-full max-w-7xl pb-12  min-h-232'>{children}</div>
			<Footer />
		</div>
	);
}
