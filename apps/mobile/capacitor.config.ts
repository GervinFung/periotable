import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.periotable.edu',
	appName: 'Periotable',
	webDir: 'build',
	server: {
		androidScheme: 'https',
	},
};

export default config;
