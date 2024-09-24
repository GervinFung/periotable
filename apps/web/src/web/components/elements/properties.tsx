import type { Argument, DeepReadonly } from '@poolofdeath20/util';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { spaceToDash } from '../../../common/string';

type Properties = Record<string, React.ReactNode>;

const titleToId = (name: string) => {
	return spaceToDash(name).toLowerCase();
};

const filterProperties = (properties: Properties) => {
	return Object.entries(properties).filter(([_, value]) => {
		return value && value !== 'NULL';
	});
};
const Value = (
	props: Readonly<{
		value: React.ReactNode;
	}>
) => {
	switch (typeof props.value) {
		case 'object': {
			return props.value;
		}
		case 'string':
		case 'number': {
			return (
				<Typography>
					{props.value === '' ? 'N/A' : props.value}
				</Typography>
			);
		}
		default: {
			return null;
		}
	}
};

const Property = (
	props: Argument<typeof Value> &
		Readonly<{
			name: string;
		}>
) => {
	return (
		<Box>
			{props.name === 'None' ? null : (
				<Typography color="neutral">
					{props.name.replace(/_/g, ' ')}
				</Typography>
			)}
			<Value value={props.value} />
		</Box>
	);
};

const Properties = (
	props: DeepReadonly<{
		title: string;
		properties: Properties;
		top: number;
		noGrid?: true;
	}>
) => {
	const properties = filterProperties(props.properties);

	switch (properties.length) {
		case 0: {
			return null;
		}
		default: {
			const isBohrModel = props.title === 'Bohr Model';

			return (
				<Box
					id={titleToId(props.title)}
					sx={{
						scrollMarginTop: props.top,
					}}
				>
					<Typography level="h3">{props.title}</Typography>
					{props.noGrid ? (
						<Stack mt={2} spacing={3}>
							{properties.map(([key, value]) => {
								return (
									<Property
										key={key}
										name={key}
										value={value}
									/>
								);
							})}
						</Stack>
					) : (
						<Grid
							columnSpacing={{
								lg: 3,
								sm: 6,
								xs: 0,
							}}
							container
							mt={2}
							rowSpacing={3}
						>
							{properties.map(([key, value]) => {
								return (
									<Grid
										key={key}
										lg={4}
										sm={isBohrModel ? 12 : 6}
										xs={12}
									>
										<Property
											key={key}
											name={key}
											value={value}
										/>
									</Grid>
								);
							})}
						</Grid>
					)}
				</Box>
			);
		}
	}
};

export { titleToId, filterProperties };
export default Properties;
