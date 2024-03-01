import React from 'react';

import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from 'next';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { DeepReadonly } from '@poolofdeath20/util';

import data from '../../src/web/generated/data';
import BohrThreeDimensional from '../../src/web/components/bohr/three-dimensional';
import { BigTile } from '../../src/web/components/table/element';
import classifications, {
	transformCategory,
} from '../../src/common/classfication';

type Element = (typeof data)[number];

type ElementProps = Readonly<{
	element: Element | undefined;
}>;

const getStaticPaths = (async () => {
	return {
		fallback: false,
		paths: data.map((classification) => {
			return {
				params: {
					name: classification.name_en.toLowerCase(),
				},
			};
		}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = (async (context) => {
	const { Optional } = await import('@poolofdeath20/util');

	const name = context.params?.name;

	if (typeof name !== 'string') {
		throw new Error('Name is not a string');
	}

	return {
		props: {
			element: Optional.from(
				data.find((element) => {
					return element.name_en.toLowerCase() === name;
				})
			).unwrapOrThrow(`Element not found: ${name}`),
		},
	};
}) satisfies GetStaticProps<ElementProps>;

const Property = (
	props: Readonly<{
		name: string;
		value: React.ReactNode;
	}>
) => {
	const Value = () => {
		switch (typeof props.value) {
			case 'object': {
				return props.value;
			}
			case 'string':
			case 'number': {
				return (
					<Typography textAlign="justify">
						{props.value === '' ? 'N/A' : props.value}
					</Typography>
				);
			}
			default: {
				return null;
			}
		}
	};

	return (
		<Box>
			<Typography color="neutral">
				{props.name.split('_').join(' ')}
			</Typography>
			<Value />
		</Box>
	);
};

const Properties = (
	props: DeepReadonly<{
		title: string;
		properties: Record<string, React.ReactNode>;
	}>
) => {
	const properties = Object.entries(props.properties).filter(([_, value]) => {
		return value && value !== 'NULL';
	});

	switch (properties.length) {
		case 0: {
			return null;
		}
		default: {
			return (
				<Stack spacing={4}>
					<Typography level="h3">{props.title}</Typography>
					{properties.map(([key, value]) => {
						return <Property key={key} name={key} value={value} />;
					})}
				</Stack>
			);
		}
	}
};

const Color = (
	props: Readonly<{
		color: string | number;
	}>
) => {
	return (
		<Box display="flex" gap={2} alignItems="center">
			<Box
				borderRadius="50%"
				width={16}
				height={16}
				sx={{
					backgroundColor: `#${props.color}`,
				}}
			/>
			<Typography>{props.color}</Typography>
		</Box>
	);
};

const Element = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { element } = props;

	const color =
		classifications.find((classification) => {
			return element.category_code
				.split('_')
				.join('-')
				.startsWith(transformCategory(classification.category));
		}) ?? classifications[9];

	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
			<Stack spacing={8} width="60%">
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					pb={8}
				>
					<Typography level="h1">
						{/* Pe can be like Typescript */}
						The Periodic Table
					</Typography>
				</Box>
				<Stack spacing={8}>
					<BigTile
						color={color.color}
						index={element.number}
						name={element.name_en}
						symbol={element.symbol}
						mass={element.atomic_mass}
					/>
					<Properties
						title="Bohr Model"
						properties={{
							Interactive: (
								<Box
									sx={(theme) => {
										return {
											border: `1px solid ${theme.palette.divider}`,
											width: 'fit-content',
										};
									}}
								>
									{element.bohrModel.threeDimensional ? (
										<BohrThreeDimensional
											src={
												element.bohrModel
													.threeDimensional
											}
											alt={element.name_en}
										/>
									) : null}
								</Box>
							),
						}}
					/>
					<Properties
						title="Basic Information"
						properties={{
							Atomic_Number: element.number,
							Name: element.name_en,
							Alternative_Name: element.alternate_name,
							Gas_Phase: element.gas_phase,
							Allotropes: element.allotrope_names,
							Appearance: element.appearance,
						}}
					/>
					<Properties
						title="Descriptive Numbers"
						properties={{
							CAS_Number: element.cas_number,
							CID_Number: element.cid_number,
							DOT_Number: element.dot_number,
							RTECS_Number: element.rtecs_number,
							Mendeleev_Number: element.mendeleev_number,
							Pettifor_Number: element.pettifor_number,
							Eu_Number: element.eu_number,
							Space_Group_Number: element.space_group_number,
							Glawe_Number: element.glawe_number,
						}}
					/>
					<Properties
						title="Mass"
						properties={{
							Atomic_Mass: element.atomic_mass,
							Uncertainty: element.atomic_mass_uncertainty,
						}}
					/>
					<Properties
						title="Periodic Position"
						properties={{
							X_Position: element.xpos,
							Y_Position: element.ypos,
							Period: element.period,
							Group: element.group,
						}}
					/>
					<Properties
						title="Classification"
						properties={{
							Block: element.block,
							Category: element.category_code
								.split('_')
								.join(' '),
							Geochemical: element.geochemical_class,
							Goldschmidt: element.goldschmidt_class,
							Electrical_Type: element.electrical_type,
						}}
					/>
					<Properties
						title="Abundance"
						properties={{
							Urban_Soil: `${element.abundance_urban_soil}mg/kg`,
							Seawater: `${element.abundance_seawater_w1}kg/L`,
							Sun: `${element.abundance_sun_s1}mole ratio to silicon`,
							Earth_Crust: `${element.abundance_in_earth_crust_c1}kg`,
							Human_Body: `${element.abundance_humans}%`,
							Solar_System: `${element.abundance_solar_system_y1}mole ratio to silicon`,
							Meteorites: `${element.abundance_meteorite}%`,
						}}
					/>
					<Properties
						title="Color"
						properties={{
							Jmol: <Color color={element.jmol_color} />,
							Molcas_Gv: (
								<Color color={element.molcas_gv_color} />
							),
							CPK: <Color color={element.cpk_color} />,
						}}
					/>
					<Properties
						title="Atomic Radius"
						properties={{
							Empirical: element.atomic_radius_empirical,
							Calculated: element.atomic_radius_calculated,
							Van_Der_Waals: element.atomic_radius_vanderwaals,
							Bonding: element.vdw_radius_bondi,
							Room_Temperature: element.vdw_radius_rt,
							Batsanov: element.vdw_radius_batsanov,
							Rahm: element.atomic_radius_rahm,
							Dreiding: element.vdw_radius_dreiding,
							Uff: element.vdw_radius_uff,
							Mm3: element.vdw_radius_mm3,
							Alvarez: element.vdw_radius_alvarez,
							Bragg: element.covalent_radius_bragg,
							Truhlar: element.vdw_radius_truhlar,
							'Covalent - Single Bound':
								element.atomic_radius_covalent_single_bond,
							'Covalent - Triple Bound':
								element.atomic_radius_covalent_triple_bond,
							'Covalent - Cordero':
								element.covalent_radius_cordero,
							'Covalent - Pyykko': element.covalent_radius_pyykko,
							'Covalent - Pyykko Double':
								element.covalent_radius_pyykko_double,
							'Covalent - Pyykko Triple':
								element.covalent_radius_pyykko_triple,
							Mendeleev: element.metallic_radius_mendeleev,
							C12: element.metallic_radius_c12,
							Metallic: element.atomic_radius_metallic,
						}}
					/>
					<Properties
						title="Temperature"
						properties={{
							'Melting/Freeze USE': element.melt_use,
							'Melting/Freeze WEL': element.melt_WEL,
							'Melting/Freeze CRC': element.melt_CRC,
							'Melting/Freeze LNG': element.melt_LNG,
							'Boiling/Density USE': element.boil_use,
							'Boiling/Density WEL': element.boil_WEL,
							'Boiling/Density CRC': element.boil_CRC,
							'Boiling/Density LNG': element.boil_LNG,
							'Boiling/Density Zhang': element.boil_Zhang,
							Curie_Point: element.curie_point,
							Superconducting_Point:
								element.superconducting_point,
							'Critical Temperature':
								element.critical_temperature,
							Flashpoint: element.flashpoint,
							Autoignition_Point: element.autoignition_point,
							Critical_Pressure: element.critical_pressure,
						}}
					/>
					<Properties
						title="Density"
						properties={{
							STP: element.density_rt,
							Solid_WE: element.density_solid_WEL,
							Solid_CRC: element.density_solid_CRC,
							Solid_LNG: element.density_solid_LNG,
							Liquid_CR2: element.density_liquid_cr2,
							Gas: element.density_gas,
						}}
					/>
					<Properties
						title="Heat"
						properties={{
							Molar_Volume: element.molar_volume,
							Atomic_Volume: element.atomic_volume,
							Heat_Of_Fusion_USE: element.enthalpy_of_fusion,
							Heat_Of_Fusion_CRC: element.heat_of_fusion_crc,
							Heat_Of_Fusion_LNG: element.heat_of_fusion_lng,
							Heat_Of_Fusion_WEL: element.heat_of_fusion_wel,
							Evaporation_USE: element.evaporation_heat,
							Evaporation_CRC: element.heat_of_vaporization_crc,
							Evaporation_LNG: element.heat_of_vaporization_lng,
							Evaporation_WEL: element.heat_of_vaporization_wel,
							Evaporation_Zhang:
								element.heat_of_vaporization_zhang,
							Combustion: element.heat_of_combustion,
							Molar_Heat: element.molar_heat,
							Heat_Capacity_USE: element.specific_heat_capacity,
							Heat_Capacity_CRC: element.specific_heat_crc,
							Heat_Capacity_LNG: element.specific_heat_lng,
							Heat_Capacity_WEL: element.specific_heat_wel,
							Thermal_Conductivity: element.thermal_conductivity,
							Thermal_Expansion: element.thermal_expansion,
							Adiabatic_Index: element.adiabatic_index,
						}}
					/>
					<Properties
						title="Speed of Sound"
						properties={{
							Longitudinal: element.speed_of_sound_longitudinal,
							Transversal: element.speed_of_sound_transversal,
							Extensional: element.speed_of_sound_extensional,
							Fluid: element.speed_of_sound_fluid,
						}}
					/>
					<Properties
						title="Eletrical Resistance"
						properties={{
							'80k': element.electrical_resistivity_80K,
							'273k': element.electrical_resistivity_273K,
							'293k': element.electrical_resistivity_293K,
							'298k': element.electrical_resistivity_298K,
							'300k': element.electrical_resistivity_300K,
							'500k': element.electrical_resistivity_500K,
						}}
					/>
					<Properties
						title="Magnetic"
						properties={{
							Order: element.magnetic_ordering,
							Neel_Point: element.neel_point,
							Susceptibility: element.magnetic_susceptibility,
						}}
					/>
					<Properties
						title="Elastic"
						properties={{
							Shear_Modulus: element.shear_modulus,
							Bulk_Modulus: element.bulk_modulus,
							Poisson_Ratio: element.poisson_ratio,
							Youngs_Modulus: element.youngs_modulus,
						}}
					/>
					<Properties
						title="Hardness"
						properties={{
							Mohs: element.mohs_hardness,
							Brinell: element.brinell_hardness,
							Vickers: element.vickers_hardness,
						}}
					/>
					<Properties
						title="Etymology"
						properties={{
							Description: element.description,
							Language_Of_Origin: element.language_of_origin,
							Origin_Of_Word: element.origin_of_word,
							Meaning: element.meaning,
							Symbol_Origin: element.symbol_origin,
							Etymological_Description:
								element.etymological_description,
						}}
					/>
					<Properties
						title="Discovery & Isolation"
						properties={{
							'Observed/Predicted By':
								element.observed_predicted_by,
							'Observed/Discovery Year':
								element.observation_or_discovery_year,
							Discovery_Location: element.discovery_location,
							Isolated_Sample_By: element.isolated_sampled_by,
							Isolated_Sample_Year: element.isolation_sample_year,
							Named_By: element.named_by,
						}}
					/>
					<Properties
						title="Production & Use"
						properties={{
							Sources: element.sources,
							Uses: element.uses,
						}}
					/>
					<Properties
						title="Radioactive"
						properties={{
							Half_Life: element.half_life,
							Lifetime: element.lifetime,
							Decay_Mode: element.decay_mode,
							Neutron_Mass_Absorption:
								element.neutron_mass_absorption,
							Neutron_Cross_Section:
								element.neutron_cross_section,
						}}
					/>
					<Properties
						title="Electron Affinity"
						properties={{
							Proton_Affinity: element.proton_affinity,
							'Electron_Affinity (eV)':
								element.electron_affinity_eV,
							'Electron_Affinity (kJ/mol)':
								element.electron_affinity_kJmol,
							'Electron_Affinity (pauling)':
								element.electronegativity_pauling,
							'Electron_Affinity (allen)':
								element.electronegativity_allen,
							'Electron_Affinity (ghosh)':
								element.electronegativity_ghosh,
						}}
					/>
					<Properties
						title="Dipole Polarity"
						properties={{
							Accepted: element.dipole_polarizability,
							Uncertainty: element.dipole_polarizability_unc,
							'C6 GBW': element.c6_gb,
							'C6 Coeff': element.c6_coeff,
						}}
					/>
					<Properties
						title="Lattice"
						properties={{
							Constant_Internal_Default_Radius:
								element.lattice_constant_internal_default_radii,
							Constant: element.lattice_constant,
							Strucutre: element.lattice_structure,
							Angles: element.lattice_angles,
						}}
					/>
					<Properties
						title="Electron & Quantum"
						properties={{
							Oxidation_States: element.oxidation_states,
							Electron_Configuration:
								element.electron_configuration,
							Quantum_Number: element.quantum_number,
							Electron_Configuration_Semantic:
								element.electron_configuration_semantic,
							...Array.from({ length: 8 }, (_, index) => {
								return {
									[`Shells-${index}`]:
										element[`shells-${index}`],
								};
							}).reduce((accumulator, value) => {
								return {
									...accumulator,
									...value,
								};
							}, {}),
							...Array.from({ length: 30 }, (_, index) => {
								return {
									[`Ionization Energies-${index}`]:
										element[`ionization_energies-${index}`],
								};
							}).reduce((accumulator, value) => {
								return {
									...accumulator,
									...value,
								};
							}, {}),
						}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export type { ElementProps };

export { getStaticProps, getStaticPaths };

export default Element;
