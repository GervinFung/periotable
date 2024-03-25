import fs from 'fs';

const main = () => {
	const error = `
import WebError, {
	getServerSideProps,
} from '../src/web/components/pages/error/web';

export { getServerSideProps };

export default WebError;
`;

	const index = `
import WebIndex, {
	getServerSideProps,
} from '../src/web/components/pages/index/web';

export { getServerSideProps };

export default WebIndex;
`;

	fs.writeFileSync(`${process.cwd()}/pages/_error.tsx`, error);
	fs.writeFileSync(`${process.cwd()}/pages/index.tsx`, index);
};

main();
