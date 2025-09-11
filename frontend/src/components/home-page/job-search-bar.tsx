import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPinIcon, Search } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Collapsible } from '../ui/collapsible';
import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { DropdownMenu } from '../ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Badge } from '../ui/badge';

export function JobSearchBar() {
	return (
		<div className=' py-32 bg-gradient-to-r from-black to-orange-950  bg-contain bg-center '>
			<div className='w-full  max-w-6xl mx-auto  '>
				{/* Main heading */}
				<div className='text-center mb-6'>
					<h1 className=' font-bold text-3xl text-primary-foreground'>Hãy chia sẻ nhu cầu công việc của bạn</h1>
				</div>

				<div className='flex gap-4'>
					<div className='flex-1 flex gap-3 mb-6 h-16 items-center rounded-xs bg-white  shadow-lg font-medium text-base px-4 py-4'>
						<div className='flex-1'>
							<Input placeholder='Nhập nhu cầu công việc của bạn' className=' shadow-none py-6 px-4 md:text-base text-black !border-none ' />
						</div>
						<Separator orientation='vertical'></Separator>
						<div className='w-48'>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MapPinIcon className='inline size-5'></MapPinIcon> Địa điểm
								</DropdownMenuTrigger>
								<DropdownMenuContent>c</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<Button className='py-8 px-12 bg-primary text-white rounded-xs font-bold'>
						<Search className='size-6' />
						Tìm kiếm
					</Button>
				</div>

				{/* Popular jobs */}
				<div className='flex flex-wrap gap-3 items-center'>
					<p className='text-primary-foreground font-bold'>Gợi ý:</p>
					{['Fullstack developer intern', 'Intern nodejs developer', 'Nhân viên kinh doanh', 'Full stack developer'].map(job => (
						<Badge key={job} variant='outline' className='rounded-full p-0 text-sm border-gray-300 bg-transparent text-primary-foreground px-2 py-2 hover:text-primary hover:border-primary'>
							{job}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
