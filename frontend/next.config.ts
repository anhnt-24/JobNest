import type { NextConfig } from 'next';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '9000',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn-new.topcv.vn',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
