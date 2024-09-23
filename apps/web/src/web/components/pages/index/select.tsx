import type { DeepReadonly, Return } from '@poolofdeath20/util';

import Chip from '@mui/joy/Chip';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Optional, capitalize } from '@poolofdeath20/util';
import { useRouter } from 'next/router';
import React from 'react';
import { CgClose } from 'react-icons/cg';

import classifications, {
	transformCategory,
} from '../../../../common/classfication';
import subshells from '../../../../common/subshell';

type NullableString = string | undefined;

const GenerateMultiSelect = (
	props: DeepReadonly<{
		key: string;
		value: NullableString;
		kind: string;
		placeholder: string;
		options: Array<{
			id: string;
			label: string;
			color?: string;
		}>;
		onChange: (
			props: Readonly<{
				router: Return<typeof useRouter>;
				value: string | undefined;
			}>
		) => void;
	}>
) => {
	const router = useRouter();

	const query = router.query[props.key];

	if (Array.isArray(query)) {
		throw new Error(
			`Value for "${props.kind}" of "${query.join()}" is an array`
		);
	}

	const ids = {
		label: `select-field-${props.kind}-label`,
		button: `select-field-${props.kind}-button`,
	};

	const value = props.options
		.map(({ id }) => {
			return id;
		})
		.find((id) => {
			return id === query;
		});

	const Component = (
		<FormControl
			sx={{
				width: 280,
			}}
		>
			<FormLabel htmlFor={ids.button} id={ids.label}>
				{capitalize(props.kind)}
			</FormLabel>
			<Select
				endDecorator={
					!value ? undefined : (
						<IconButton
							color="neutral"
							onClick={() => {
								props.onChange({
									value: undefined,
									router,
								});
							}}
							onMouseDown={(event) => {
								event.stopPropagation();
							}}
							size="sm"
							variant="plain"
						>
							<CgClose />
						</IconButton>
					)
				}
				onChange={(_, value) => {
					props.onChange({
						router,
						value: value ?? undefined,
					});
				}}
				placeholder={props.placeholder}
				renderValue={(option) => {
					return !option ? null : (
						<Chip
							key={option.id}
							sx={{
								backgroundColor: 'background.level1',
							}}
							variant="soft"
						>
							<Typography
								level="body-sm"
								sx={{
									color: props.options.find(({ id }) => {
										return id === option.value;
									})?.color,
								}}
							>
								{option.label}
							</Typography>
						</Chip>
					);
				}}
				slotProps={{
					listbox: {
						placement: 'bottom-end',
						sx: {
							width: '100%',
							backgroundColor: 'background.level1',
						},
					},
					button: {
						id: ids.button,
						'aria-labelledby': `${ids.label} ${ids.button}`,
					},
				}}
				sx={{
					paddingBlock: 0,
				}}
				value={value ?? null}
			>
				{props.options.map((option) => {
					return (
						<Option key={option.id} value={option.id}>
							{!option.color ? null : (
								<Sheet
									sx={{
										backgroundColor: option.color,
										width: 10,
										height: 10,
									}}
								/>
							)}
							<Typography level="body-sm">
								{option.label}
							</Typography>
						</Option>
					);
				})}
			</Select>
		</FormControl>
	);

	return {
		Component,
		state: Optional.from(value),
	};
};

const GenerateClassificationSelect = (value: NullableString) => {
	return GenerateMultiSelect({
		value,
		key: 'classification',
		kind: 'category',
		placeholder: 'Select a category',
		options: classifications.map((classification) => {
			return {
				id: transformCategory(classification),
				label: classification.category,
				color: classification.color,
			};
		}),
		onChange: (props) => {
			const href = !props.value ? '/' : `/classifications/${props.value}`;

			void props.router.push(href, undefined, {
				shallow: true,
				scroll: false,
			});
		},
	});
};

const GenerateSpdfSelect = (value: NullableString) => {
	return GenerateMultiSelect({
		value,
		key: 'subshell',
		kind: 'subshell',
		placeholder: 'Select a subshell',
		options: subshells.map(({ subshell, color }) => {
			return {
				id: subshell,
				label: subshell.toUpperCase(),
				color,
			};
		}),
		onChange: (props) => {
			const href = !props.value ? '/' : `/subshells/${props.value}`;

			void props.router.push(href, undefined, {
				shallow: true,
				scroll: false,
			});
		},
	});
};

export { GenerateClassificationSelect, GenerateSpdfSelect };
