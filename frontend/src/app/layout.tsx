import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import ProgressBar from '@/components/ui/custom/progress-bar';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='bg-gray-50'>
				<AuthProvider>
					<ProgressBar />
					<Toaster richColors theme='light' />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
