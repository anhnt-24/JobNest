import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Save, Send, Sparkle, Zap } from 'lucide-react';
import { SavedJobs } from './_component/saved-jobs';
import AppliedJobs from './_component/applied-jobs';
import SuggestedJobs from './_component/suggested-jobs';

type Props = {
	defaultValue?: 'saved' | 'suggested' | 'applied' | 'urgent';
	counts?: { saved?: number; suggested?: number; applied?: number };
};

export default function JobsTabs({ defaultValue = 'suggested' }: Props) {
	return (
		<div className='bg-white pb-4 rounded-2xl '>
			<Tabs defaultValue={defaultValue}>
				<TabsList className='text-lg font-semibold'>
					<TabsTrigger value='saved'>
						<Save></Save>Đã lưu
					</TabsTrigger>
					<TabsTrigger value='suggested'>
						<Sparkle />
						Gợi ý
					</TabsTrigger>
					<TabsTrigger value='applied'>
						<Send></Send>
						Đã ứng tuyển
					</TabsTrigger>
					<TabsTrigger value='urgent'>
						<Zap></Zap>
						Tuyển gấp
					</TabsTrigger>
				</TabsList>
				<TabsContent value='saved'>
					<SavedJobs></SavedJobs>
				</TabsContent>
				<TabsContent value='urgent'>
					<SavedJobs></SavedJobs>
				</TabsContent>
				<TabsContent value='suggested'>
					<SuggestedJobs></SuggestedJobs>
				</TabsContent>

				<TabsContent value='applied'>
					<AppliedJobs></AppliedJobs>
				</TabsContent>
			</Tabs>
		</div>
	);
}
