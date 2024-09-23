import type { ClassificationProps } from '../../../../../pages/classifications/[classification]';
import type { SubshellProps } from '../../../../../pages/subshells/[subshell]';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Optional } from '@poolofdeath20/util';
import React from 'react';

import classifications, {
	transformCategory,
} from '../../../../common/classfication';
import SearchBar from '../../../components/common/input';
import Seo from '../../../components/seo';
import { DemoTile } from '../../../components/table/element';

import Position, { useSearch } from './position';
import { GenerateClassificationSelect, GenerateSpdfSelect } from './select';

type DeviceType = Readonly<{
	type: 'desktop' | 'tablet' | 'mobile';
}>;

const Index = (props: ClassificationProps & SubshellProps & DeviceType) => {
	const ClassificationSelect = GenerateClassificationSelect(
		Optional.from(props.classification)
			.map(transformCategory)
			.unwrapOrGet(undefined)
	);

	const SpdfSelect = GenerateSpdfSelect(props.subshell?.subshell);

	const search = useSearch();

	return (
		<Box alignItems="center" display="flex" justifyContent="center" pb={8}>
			<Seo
				description="The home page of Pt, A modern take on Periodic Table of the Elements with interactive features"
				keywords={classifications.map((classification) => {
					return classification.category;
				})}
				title={Optional.from(props.classification).map(
					(classification) => {
						return classification.category;
					}
				)}
				url={
					props.classification
						? `/classifications/${transformCategory(props.classification)}`
						: props.subshell
							? `/subshells/${props.subshell.subshell}`
							: undefined
				}
			/>
			<Stack spacing={6} width="90%">
				<DemoTile />
				<SearchBar
					placeholder="Element name, atomic name, atomic mass"
					search={search}
				/>
				<Stack
					direction={{
						md: 'row',
						xs: 'column',
					}}
					spacing={6}
				>
					{ClassificationSelect.Component}
					{SpdfSelect.Component}
				</Stack>
				<Box alignItems="center" display="flex" justifyContent="center">
					<Position
						classification={ClassificationSelect.state}
						search={search}
						subshell={SpdfSelect.state}
						type={props.type}
					/>
				</Box>
			</Stack>
		</Box>
	);
};

export default Index;
