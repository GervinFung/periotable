import { genEnvTypeDef } from 'gen-env-type-def';

const main = () => {
	genEnvTypeDef([
		{
			inDir: '.',
			envType: 'process.env',
		},
	]);
};

main();
