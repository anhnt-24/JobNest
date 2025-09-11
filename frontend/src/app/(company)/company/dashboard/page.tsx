import { ChartAreaInteractive } from '@/components/ui/company/chart-area-interactive';
import { DataTable } from '@/components/ui/company/data-table';
import { SectionCards } from '@/components/ui/company/section-cards';

import data from './data.json';

export default function Page() {
	return (
		<div>
			<SectionCards />
			<div className='px-4 lg:px-6'>
				<ChartAreaInteractive />
			</div>
			<DataTable data={data} />
		</div>
	);
}
