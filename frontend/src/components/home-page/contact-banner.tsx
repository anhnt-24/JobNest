'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Mail, Phone, Send, MapPin, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';

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
		<section className='relative py-16 px-4 sm:px-6 lg:px-8 '>
			<div className='relative max-w-7xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-3xl font-bold  mb-4'>Kết Nối Với Chúng Tôi</h1>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>Liên hệ ngay để nhận tư vấn miễn phí hoặc đăng ký nhận tin tức mới nhất từ chúng tôi</p>
				</div>

				<div className='bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 overflow-hidden'>
					<div className='grid grid-cols-1 lg:grid-cols-2'>
						{/* Contact Information Section */}
						<div className='relative p-6  bg-gradient-to-r from-black to-orange-950'>
							<div className='relative space-y-8 '>
								<div>
									<h3 className='text-2xl font-bold text-primary-foreground mb-2'>LIÊN HỆ NHANH</h3>
									<p className='text-muted-foreground'>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
								</div>

								<div className='space-y-6'>
									<div className='group flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300'>
										<div className='bg-primary p-3 rounded-full shadow-lg group-hover:shadow-glow transition-all duration-300'>
											<Phone className='w-5 h-5 text-primary-foreground' />
										</div>
										<div>
											<p className='font-semibold text-primary mb-1'>Hotline</p>
											<a href='tel:02466805588' className='text-lg font-bold text-primary-foreground hover:text-primary transition-colors'>
												(024) 6680 5588
											</a>
										</div>
									</div>

									<div className='group flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 transition-all duration-300'>
										<div className='bg-primary p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300'>
											<Mail className='w-5 h-5 text-primary-foreground' />
										</div>
										<div>
											<p className='font-semibold   text-primary mb-1'>Email</p>
											<a href='mailto:hotro@topcv.vn' className='text-lg font-bold text-primary-foreground hover:text-accent transition-colors'>
												hotro@topcv.vn
											</a>
										</div>
									</div>

									<div className='group flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:border-accent/40 transition-all duration-300'>
										<div className='bg-primary p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300'>
											<MapPin className='w-5 h-5 text-background' />
										</div>
										<div>
											<p className='font-semibold text-primary mb-2'>Địa chỉ</p>
											<p className='text-primary-foreground font-medium leading-relaxed'>
												Tầng 3, Tòa nhà GP Invest
												<br />
												170 Đê La Thành, Đống Đa
												<br />
												Hà Nội, Việt Nam
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Newsletter Subscription Section */}
						<div className='relative p-6 '>
							<div className='relative'>
								<div className='mb-8'>
									<h3 className='text-2xl font-bold text-foreground mb-2'>ĐĂNG KÝ NHẬN TIN MỚI</h3>
									<p className='text-muted-foreground'>Cập nhật thông tin mới nhất về cơ hội việc làm và xu hướng thị trường</p>
								</div>

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
											<div className='relative'>
												<Input
													type='text'
													placeholder='Họ và tên'
													value={name}
													onChange={e => setName(e.target.value)}
													required
													className='h-14 px-6 text-base border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300'
												/>
											</div>
											<div className='relative'>
												<Input
													type='email'
													placeholder='Email của bạn'
													value={email}
													onChange={e => setEmail(e.target.value)}
													required
													className='h-14 px-6 text-base border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300'
												/>
											</div>
										</div>

										<Button type='submit' className='w-full h-14'>
											<Send className='mr-2 h-5 w-5' />
											ĐĂNG KÝ NHẬN TIN
										</Button>

										<p className='text-base text-muted-foreground text-center leading-relaxed'>🔒 Chúng tôi cam kết bảo mật thông tin và không spam email của bạn</p>
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
