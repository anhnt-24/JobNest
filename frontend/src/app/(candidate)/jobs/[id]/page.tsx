import { Suspense } from 'react';
import JobPosting from '../_component/job-posting';
import LoadingCard from '../../candidate/profile/skeleton';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	return (
		<Suspense fallback={<LoadingCard />}>
			<JobPosting id={id}></JobPosting>
		</Suspense>
	);
}
