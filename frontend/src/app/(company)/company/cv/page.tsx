'use client';
import CVTable from './_component/cv-table';
import JobTable from './_component/job-table';

function Page() {
	return (
		<>
			<JobTable></JobTable>
			<CVTable
				job={{
					viTri: 'Backend Engineer',
					diaDiem: 'Hà Nội',
					mucLuong: '20–30 triệu',
					capBac: 'Senior',
					hanNop: '2025-09-01',
				}}
				cvs={[
					{
						id: 'cv1',
						ten: 'Nguyễn Văn A',
						email: 'a.nguyen@email.com',
						sdt: '0123456789',
						viTri: 'Backend Engineer',
						ngayNop: '2025-07-20',
						trangThai: 'Mới',
						fileUrl: '/cv/nguyenvana.pdf',
					},
					// ... more CVs
				]}
			/>
		</>
	);
}

export default Page;
