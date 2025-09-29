// import { UserButton } from '@clerk/nextjs';
import { MobileSidebar } from './mobile-sidebar';

export function CompanyNavbar() {
	return (
		<header className='sticky top-0 z-10 border-b bg-background'>
			<div className='flex h-16 items-center justify-between px-4'>
				<div className='flex items-center'>
					<MobileSidebar />
					<h1 className='ml-2 text-xl font-semibold'>Nhà tuyển dụng</h1>
				</div>
				<div className='flex items-center space-x-4'></div>
			</div>
		</header>
	);
}
