import Footer from '@/components/home/footer';
import Header from '@/components/home/header';

export default function Login({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen '>
			<Header />
			<div className='mx-auto w-full max-w-7xl p-4 py-16'>{children}</div>
			<Footer />
		</div>
	);
}
