import CompanyCard from './_component/company-card';
import CompanyForm from './_component/company-form';

export default function CompanyRecruitment() {
	return (
		<div className='space-y-6'>
			<CompanyCard></CompanyCard>
			<CompanyForm />
		</div>
	);
}
