import { genEnvTypeDef } from 'gen-env-type-def';

const main = () => {
	genEnvTypeDef([
		{
			inDir: 'config',
			envType: 'process.env',
			outDir: '.',
		},
	]);
};

main();
