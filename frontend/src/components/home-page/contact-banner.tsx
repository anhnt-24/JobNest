'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Mail, Phone, Send, MapPin, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { FaLocationDot, FaPaperPlane, FaPhone } from 'react-icons/fa6';
import { FaEnvelope, FaMailchimp } from 'react-icons/fa';
import Image from 'next/image';
import { Label } from '../ui/label';

export default function ContactBanner() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Subscriber:', { name, email });
		setIsSubscribed(true);
		setName('');
		setEmail('');

		// Auto reset after 5 seconds for demo
		setTimeout(() => setIsSubscribed(false), 5000);
	};

	return (
		<section className='relative py-16 px-4 sm:px-6 lg:px-8 bg-white mt-20'>
			<div className='relative max-w-7xl mx-auto'>
				<div className=''>
					<div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-4'>
						<div className='relative '>
							<Image alt='cc' src={'/illustration/undraw_interview_yz52.png'} width={1000} height={100} className='w-full'></Image>
						</div>
						<div className='relative p-6 '>
							<div className='relative'>
								{isSubscribed ? (
									<div className='text-center py-8 px-6 bg-gradient-to-br from-success/10 to-success/5 rounded-2xl border border-success/20'>
										<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full mb-4 shadow-lg'>
											<CheckCircle className='w-8 h-8 text-success-foreground' />
										</div>
										<h4 className='text-xl font-bold text-success mb-2'>Đăng ký thành công!</h4>
										<p className='text-success/80 mb-6'>Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.</p>
										<Button variant='outline' onClick={() => setIsSubscribed(false)} className='border-success/30 text-success hover:bg-success/10'>
											Đăng ký email khác
										</Button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className='space-y-6'>
										<div className='space-y-4'>
											<div className='text-left mb-6'>
												<h1 className=' uppercase'>Kết Nối Với Chúng Tôi</h1>
												<p className='text-muted-foreground max-w-3xl mx-auto'>Liên hệ ngay để nhận tư vấn miễn phí hoặc đăng ký nhận tin tức mới nhất từ chúng tôi</p>
											</div>
											<div className='relative'>
												<Input
													type='text'
													placeholder='Nguyễn Văn A'
													value={name}
													onChange={e => setName(e.target.value)}
													required
													className='h-14 px-6 bg-gray-50 text-base border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300'
												/>
											</div>
											<div className='relative'>
												<Input
													type='email'
													placeholder='Email của bạn'
													value={email}
													onChange={e => setEmail(e.target.value)}
													required
													className='h-14 px-6 bg-gray-50  text-base border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300'
												/>
											</div>
										</div>

										<Button type='submit' className='w-full h-14 font-semibold'>
											<FaPaperPlane className='mr-2' />
											ĐĂNG KÝ NHẬN TIN
										</Button>

										<p className='text-base text-muted-foreground text-center leading-relaxed'>Chúng tôi cam kết bảo mật thông tin và không spam email của bạn</p>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
