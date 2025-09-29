import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-gradient-to-r from-black/90 to-green-900 text-white pt-12 pb-6 relative'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					{/* Column 1 - About */}
					<div>
						<h1 className='text-2xl font-bold mb-4 text-primary'>JobNest'</h1>
						<p className='text-gray-300 mb-4'>Kết nối nhà tuyển dụng và ứng viên chất lượng. Tìm kiếm công việc mơ ước của bạn ngay hôm nay.</p>
						<div className='flex space-x-4'>
							<a href='#' className='text-gray-300 hover:text-white transition'>
								<Facebook className='w-5 h-5' />
							</a>
							<a href='#' className='text-gray-300 hover:text-white transition'>
								<Twitter className='w-5 h-5' />
							</a>
							<a href='#' className='text-gray-300 hover:text-white transition'>
								<Linkedin className='w-5 h-5' />
							</a>
							<a href='#' className='text-gray-300 hover:text-white transition'>
								<Instagram className='w-5 h-5' />
							</a>
						</div>
					</div>

					{/* Column 2 - Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Liên kết nhanh</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Trang chủ
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Tìm việc
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Công ty
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Blog
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Về chúng tôi
								</a>
							</li>
						</ul>
					</div>

					{/* Column 3 - Job Categories */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Ngành nghề</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Công nghệ thông tin
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Tài chính/Ngân hàng
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Kỹ thuật
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Y tế/Sức khỏe
								</a>
							</li>
							<li>
								<a href='#' className='text-gray-300 hover:text-white transition'>
									Giáo dục/Đào tạo
								</a>
							</li>
						</ul>
					</div>

					{/* Column 4 - Contact */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Liên hệ</h3>
						<ul className='space-y-3'>
							<li className='flex items-start'>
								<MapPin className='w-5 h-5 mt-0.5 mr-3 flex-shrink-0' />
								<span className='text-gray-300'>123 Đường ABC, Quận 1, TP.HCM</span>
							</li>
							<li className='flex items-center'>
								<Mail className='w-5 h-5 mr-3' />
								<span className='text-gray-300'>contact@JobNest'.vn</span>
							</li>
							<li className='flex items-center'>
								<Phone className='w-5 h-5 mr-3' />
								<span className='text-gray-300'>(028) 1234 5678</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center relative'>
					<p className='text-gray-400 text-sm mb-4 md:mb-0'>© 2025 JobNest'. Bảo lưu mọi quyền.</p>
					<div className='flex space-x-6'>
						<a href='#' className='text-gray-400 hover:text-white text-sm transition'>
							Điều khoản sử dụng
						</a>
						<a href='#' className='text-gray-400 hover:text-white text-sm transition'>
							Chính sách bảo mật
						</a>
						<a href='#' className='text-gray-400 hover:text-white text-sm transition'>
							Câu hỏi thường gặp
						</a>
					</div>
				</div>
				<div className='absolute h-full  top-0 right-0'>
					<img src='/footer-img.svg' alt='' className='h-full w-full' />
				</div>
			</div>
		</footer>
	);
}
