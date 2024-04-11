import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
	dest: 'public',
	sw: 'service-worker.js',
	disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const config = {
	productionBrowserSourceMaps:
		process.env.NEXT_PUBLIC_NODE_ENV === 'development',
	reactStrictMode: true,
};

export default withPWA(config);
