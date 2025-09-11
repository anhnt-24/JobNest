import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';
import ProgressBar from '@/components/ui/custom/progress-bar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
});
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={inter.className} suppressHydrationWarning>
			<AuthProvider>
				<body className='bg-gray-50 '>
					<ProgressBar></ProgressBar>
					<Toaster richColors theme='light'></Toaster>
					{children}
				</body>
			</AuthProvider>
		</html>
	);
}
