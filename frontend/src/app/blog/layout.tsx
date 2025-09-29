import Footer from '@/components/home-page/footer';
import Header from '@/components/home-page/header';
import { BlogSearch } from './_component/blog-search';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen '>
			<Header />
			<div className='mx-auto w-full py-8 min-h-232'>
				<BlogSearch />

				{children}
			</div>
			<Footer />
		</div>
	);
}
