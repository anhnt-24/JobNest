import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import ProgressBar from '@/components/shared/progress-bar';
import { Toaster } from '@/components/ui/sonner';
const inter = Inter({
	subsets: ['latin', 'vietnamese'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // hoặc dùng default [400, 700]
	variable: '--font-inter',
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={inter.variable}>
			<body>
				<ProgressBar />
				<Toaster richColors theme='light' />
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
