'use client';
import CompanyCard from '../_component/company-card';
import CompanyIntro from '../_component/company-info';
import CompanyShare from '../_component/company-share';
import CompanyContact from '../_component/company-contact';
import CompanyGrid from '../_component/other-company';
import CompanyJobs from '../_component/company-jobs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { companyService } from '@/service/company.service';
import { CompanyResponse } from '@/schema/company.schema';

export default function Page() {
	const params = useParams();
	const id = params.id;
	const { data: company } = useSWR(id ? `/company/${id}` : null, () => companyService.getCompanyById(Number(id)).then(res => res.data));
	return (
		<div>
			<CompanyCard company={company as CompanyResponse}></CompanyCard>
			<div className='flex pt-2 gap-6 '>
				<div className='flex-2  space-y-6'>
					<CompanyIntro company={company as CompanyResponse}></CompanyIntro>
					<CompanyGrid />
					<CompanyJobs></CompanyJobs>
				</div>
				<div className='flex-1 space-y-6 '>
					<CompanyContact company={company as CompanyResponse}></CompanyContact>
					<CompanyShare></CompanyShare>
				</div>
			</div>
		</div>
	);
}
