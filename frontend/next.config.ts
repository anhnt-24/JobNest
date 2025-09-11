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
		],
	},
};

export default nextConfig;
