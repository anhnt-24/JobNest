'use client';
import useSWR from 'swr';
import JobList from './job-list';
import { jobService } from '@/service/job.service';
import { CardTitle } from '@/components/ui/card';

function RelatedJobs() {
	const { data: jobs, isLoading } = useSWR([`/timviec`], () => jobService.getAll({}).then(res => res.data));
	if (isLoading) return <></>;
	return (
		<>
			<CardTitle>Việc làm liên quan</CardTitle>
			<JobList jobs={jobs}></JobList>
		</>
	);
}

export default RelatedJobs;
