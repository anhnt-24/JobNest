import { Button } from '@/components/ui/button';
import Footer from '@/components/home-page/footer';
import Header from '@/components/home-page/header';

import { ArrowRight, Search, Building2, GraduationCap, Trophy, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JobSearchBar } from '@/components/home-page/job-search-bar';
import { JobListings } from '@/components/home-page/job-list';
import JobCategories from '@/components/home-page/job-categories';
import FeaturedEmployers from '@/components/home-page/featured-employers';
import InfiniteEmployerCarousel from '@/components/home-page/company-convey';
import ContactBanner from '@/components/home-page/contact-banner';
import FeaturedPosts from '@/components/home-page/feature-posts';
import { UrgentJobList } from '@/components/home-page/urgent-job-list';

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen gap-6'>
			<Header />
			<JobSearchBar></JobSearchBar>
			<JobListings />
			<UrgentJobList />
			<JobCategories></JobCategories>
			<FeaturedEmployers></FeaturedEmployers>
			<InfiniteEmployerCarousel></InfiniteEmployerCarousel>
			<FeaturedPosts />
			<ContactBanner></ContactBanner>
			<Footer />
		</div>
	);
}
