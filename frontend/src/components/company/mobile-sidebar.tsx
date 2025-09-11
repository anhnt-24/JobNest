import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

export function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger className='md:hidden'>
				<Menu className='h-6 w-6' />
			</SheetTrigger>
			<SheetContent side='left' className='w-[250px] p-0'>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}
