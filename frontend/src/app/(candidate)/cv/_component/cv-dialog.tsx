'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CVA4 from './cv';
import { Search } from 'lucide-react';

export default function CVDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='secondary' className='font-semibold rounded-full'>
					<Search></Search>
					Xem CV
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl w-full h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>Fullstack Developer</DialogTitle>
				</DialogHeader>
				<div className='w-full'>
					<CVA4 />
				</div>
			</DialogContent>
		</Dialog>
	);
}
