'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CompanyShare() {
	const [copied, setCopied] = useState(false);
	const link = window.location.href;

	const handleCopy = () => {
		navigator.clipboard.writeText(link);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<Card>
			<CardTitle className='border-b '>Chia sẻ công ty tới bạn bè</CardTitle>
			<div className='space-y-2'>
				<p className='font-medium'>Sao chép đường dẫn</p>
				<div className='flex gap-2'>
					<Input value={link} readOnly />
					<Button variant='outline' onClick={handleCopy}>
						<Copy className='h-4 w-4' />
					</Button>
				</div>
				{copied && <p className='text-green-600 text-sm'>Đã sao chép!</p>}
			</div>
			<div>
				<p className='font-medium mb-2'>Chia sẻ qua mạng xã hội</p>
				<div className='flex gap-4'>
					<a href={`https://facebook.com/sharer/sharer.php?u=${link}`} target='_blank' rel='noopener noreferrer' className='p-2 hover:scale-110 transition-transform'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/facebook.png' alt='Facebook' />
							<AvatarFallback>F</AvatarFallback>
						</Avatar>
					</a>

					<a href={`https://twitter.com/intent/tweet?url=${link}`} target='_blank' rel='noopener noreferrer' className='p-2 hover:scale-110 transition-transform'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/twitter.png' alt='Twitter' />
							<AvatarFallback>T</AvatarFallback>
						</Avatar>
					</a>

					<a href={`https://www.linkedin.com/shareArticle?url=${link}`} target='_blank' rel='noopener noreferrer' className='p-2 hover:scale-110 transition-transform'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/linkedin.png' alt='LinkedIn' />
							<AvatarFallback>L</AvatarFallback>
						</Avatar>
					</a>
				</div>
			</div>
		</Card>
	);
}
