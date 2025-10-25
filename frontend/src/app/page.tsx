import { Button } from '@/components/ui/button';
import Footer from '@/components/home/footer';
import Header from '@/components/home/header';

import { ArrowRight, Search, Building2, GraduationCap, Trophy, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JobSearchBar } from '@/components/home/job-search-bar';
import { JobList } from '@/components/home/job-list';
import JobCategories from '@/components/home/job-categories';
import FeaturedEmployers from '@/components/home/featured-employers';
import InfiniteEmployerCarousel from '@/components/home/company-convey';
import ContactBanner from '@/components/home/contact-banner';
import FeaturedPosts from '@/components/home/feature-posts';
import { UrgentJobList } from '@/components/home/urgent-job-list';
import JobKeywords from '@/components/home/job-key-word';

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<JobSearchBar></JobSearchBar>
			<JobList />
			<UrgentJobList />
			<JobCategories></JobCategories>
			<FeaturedEmployers></FeaturedEmployers>
			<InfiniteEmployerCarousel></InfiniteEmployerCarousel>
			<FeaturedPosts />
			<ContactBanner></ContactBanner>
			<JobKeywords></JobKeywords>
			<Footer />
		</div>
	);
}
