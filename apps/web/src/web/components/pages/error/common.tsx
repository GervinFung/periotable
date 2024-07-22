import React from 'react';

import { useRouter } from 'next/router';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import { Argument, Optional, Return, isTruthy } from '@poolofdeath20/util';

import { ErrorTile } from '../../table/element';
import Seo from '../../seo';
import useBreakpoint from '../../../hooks/break-point';

const scrambleAndShowBase = (listOfCharacters: string) => {
	return (
		props: Readonly<{
			count: number;
			content: string;
		}>
	) => {
		const generateWord = () => {
			return listOfCharacters.charAt(
				Math.floor(Math.random() * listOfCharacters.length)
			);
		};

		return Array.from(
			{
				length: props.count,
			},
			() => {
				const generatedContent = props.content
					.split('')
					.map(() => {
						const generatedWord = generateWord();

						return generatedWord !== props.content
							? generatedWord
							: generateWord();
					})
					.join('');

				return {
					content: generatedContent,
					isSame: props.content === generatedContent,
				};
			}
		).concat({
			content: props.content,
			isSame: true,
		});
	};
};

const scrambleAndShow = (
	param: Argument<Return<typeof scrambleAndShowBase>>
) => {
	const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	const lowerCaseAlphabets = alphabets.toLowerCase();

	const number = '0123456789';

	const listOfCharacters = `${alphabets}${lowerCaseAlphabets}${number}`;

	return scrambleAndShowBase(listOfCharacters)(param);
};

const useWordScramble = (
	props: Argument<typeof scrambleAndShow> &
		Readonly<{
			timeOut: number;
		}>
) => {
	type Result = Readonly<
		| {
				status: 'not-started';
		  }
		| {
				status: 'started';
				index: number;
		  }
	>;

	const words = scrambleAndShow({
		count: props.count,
		content: props.content,
	});

	const [result, setResult] = React.useState({
		previous: {
			status: 'not-started',
		} as Result,
		current: {
			status: 'not-started',
		} as Result,
	} as const);

	const ended = isTruthy(
		result.current.status === 'started' &&
			words.at(result.current.index)?.isSame
	);

	const setPreviousResult = (previous: Result) => {
		return setResult((result) => {
			return {
				...result,
				previous,
			};
		});
	};

	const setCurrentResult = (current: Result) => {
		return setResult((result) => {
			return {
				...result,
				current,
			};
		});
	};

	const changeWord = () => {
		const timer = setTimeout(() => {
			setResult((result) => {
				const { current } = result;

				return {
					...result,
					current:
						current.status === 'not-started'
							? current
							: {
									status: 'started',
									index: current.index + (ended ? 0 : 1),
								},
				};
			});
		}, props.timeOut);

		return () => {
			return clearTimeout(timer);
		};
	};

	React.useEffect(() => {
		const { previous, current } = result;

		switch (previous.status) {
			case 'started': {
				setCurrentResult(previous);
				break;
			}
			case 'not-started': {
				if (current.status === 'not-started') {
					setCurrentResult(previous);
				} else {
					if (words.at(current.index)?.isSame) {
						setCurrentResult(previous);
					} else {
						return changeWord();
					}
				}
			}
		}
	}, [result.previous.status]);

	React.useEffect(() => {
		changeWord();
	}, [result.current.status === 'started' && result.current.index]);

	return {
		word: () => {
			return result.current.status !== 'started'
				? props.content
				: (words.at(result.current.index)?.content ?? props.content);
		},
		stop: () => {
			return setPreviousResult({
				status: 'not-started',
			});
		},
		start: () => {
			return setPreviousResult({
				status: 'started',
				index: 0,
			});
		},
	};
};

const Error = (
	props: Readonly<{
		statusCode: number;
	}>
) => {
	const router = useRouter();

	const breakpoint = useBreakpoint();

	const name = useWordScramble({
		count: 20,
		timeOut: 20,
		content: 'Error',
	});

	const symbol = useWordScramble({
		count: 20,
		timeOut: 30,
		content: 'Err',
	});

	React.useEffect(() => {
		name.start();
		symbol.start();
	}, []);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			pb={8}
			height="75vh"
		>
			<Seo
				url={undefined}
				title={Optional.some('Error')}
				description=""
				keywords={[]}
			/>
			<Stack
				direction={{
					xs: 'column',
					sm: 'row',
				}}
				spacing={6}
				width="90%"
				justifyContent="center"
				alignItems="center"
			>
				<ErrorTile
					index={props.statusCode}
					name={name.word()}
					symbol={symbol.word()}
					mass={props.statusCode}
				/>
				<Stack spacing={3}>
					<Typography
						level="h1"
						fontSize={{
							xs: undefined,
							sm: '3em',
						}}
					>
						Element Not Found
					</Typography>
					<Typography>
						We are discovering new elements right now and you should
						not be here
					</Typography>
					<Stack
						direction={{
							xs: 'column',
							sm: 'row',
						}}
						spacing={{
							xs: 3,
							sm: 1,
						}}
						alignItems={{
							xs: undefined,
							sm: 'center',
						}}
					>
						<Button
							variant="outlined"
							onClick={() => {
								router.replace('/');
							}}
							sx={{
								alignSelf: 'center',
							}}
						>
							Click here
						</Button>
						<Typography>
							{breakpoint === 'xs'
								? 'Then, you will find'
								: 'to look at'}{' '}
							existing elements
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Error;
