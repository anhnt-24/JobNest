import AdvancedFilter from './_components/advanced-filter';
import JobList from './_components/job-list';
import JobSearchBar from './_components/job-search-bar';

function Page() {
	return (
		<div className='w-full mt-18'>
			<JobSearchBar />
			<p className='mb-4 font-medium'>
				Tuyển dụng <span className='text-primary font-semibold'>214 </span> việc làm Fullstack Developer tại Hà Nội [Update 20/08/2025]
			</p>
			<div className='flex gap-4'>
				<AdvancedFilter />
				<JobList />
			</div>
		</div>
	);
}

export default Page;
