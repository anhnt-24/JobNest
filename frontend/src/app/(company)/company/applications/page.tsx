import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicationTable } from '@/components/company/application-table';

export default function CompanyApplicationsPage() {
	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-bold'>Đơn ứng tuyển</h1>

			<Tabs defaultValue='all'>
				<TabsList>
					<TabsTrigger value='all'>Tất cả</TabsTrigger>
					<TabsTrigger value='pending'>Chờ xử lý</TabsTrigger>
					<TabsTrigger value='reviewed'>Đã xem</TabsTrigger>
					<TabsTrigger value='rejected'>Từ chối</TabsTrigger>
					<TabsTrigger value='accepted'>Chấp nhận</TabsTrigger>
				</TabsList>

				<TabsContent value='all'>
					<ApplicationTable status='all' />
				</TabsContent>
				<TabsContent value='pending'>
					<ApplicationTable status='pending' />
				</TabsContent>
				<TabsContent value='reviewed'>
					<ApplicationTable status='reviewed' />
				</TabsContent>
				<TabsContent value='rejected'>
					<ApplicationTable status='rejected' />
				</TabsContent>
				<TabsContent value='accepted'>
					<ApplicationTable status='accepted' />
				</TabsContent>
			</Tabs>
		</div>
	);
}
