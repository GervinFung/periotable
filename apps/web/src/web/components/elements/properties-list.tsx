import type Properties from './properties';
import type { GetStaticPropsType } from '../../../../pages/elements/[name]';
import type { Argument } from '@poolofdeath20/util';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { capitalize } from '@poolofdeath20/util';
import Image from 'next/image';
import { parse, string, union, number } from 'valibot';

import constants from '../../constant';
import { obtainNameFromUrl } from '../../util/asset';
import BohrThreeDimensional from '../bohr/three-dimensional';
import BohrTwoDimensional from '../bohr/two-dimensional';
import ListOfCompounds from '../compounds';
import ExternalLink from '../link/external';

const generatePostfix = () => {
	const valueWithSpace = (
		prop: Readonly<{
			value: string | number;
			postfix: string;
		}>
	) => {
		return valueWithoutSpace({
			value: prop.value,
			postfix: ` ${prop.postfix}`,
		});
	};

	const valueWithoutSpace = (
		prop: Readonly<{
			value: string | number;
			postfix: string;
		}>
	) => {
		if (!prop.value) {
			return '';
		}

		return `${prop.value}${prop.postfix}`;
	};

	const temperature = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: '°K',
		});
	};

	const density = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'kg/cm³',
		});
	};

	const heat = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'kJ/mol',
		});
	};

	const heatjoule = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'J/gK',
		});
	};

	const elastic = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'GPa',
		});
	};

	const speed = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'm/s',
		});
	};

	const electrical = (value: string | number) => {
		return valueWithSpace({
			value,
			postfix: 'nΩm',
		});
	};

	return {
		valueWithSpace,
		valueWithoutSpace,
		temperature,
		density,
		heat,
		heatjoule,
		elastic,
		speed,
		electrical,
	};
};

const listOfPropertiesTitle = () => {
	return [
		'Basic Information',
		'Bohr Model',
		'Descriptive Numbers',
		'Mass',
		'Periodic Position',
		'Classification',
		'Abundance',
		'Color',
		'Atomic Radius',
		'Temperature',
		'Density',
		'Heat',
		'Speed of Sound',
		'Electrical Resistance',
		'Magnetic Properties',
		'Elasticity',
		'Hardness',
		'Etymology',
		'Discovery & Isolation',
		'Production & Use',
		'Radioactivity',
		'Electron Affinity',
		'Dipole Polarity',
		'Lattice',
		'Electron & Quantum',
		'List of Compounds',
	] as const;
};

const Color = (color: string | number) => {
	if (!color) {
		return null;
	}

	return (
		<Box alignItems="center" display="flex" gap={2}>
			<Box
				borderRadius="50%"
				height={16}
				sx={{
					backgroundColor:
						typeof color === 'number' ? '#FFF' : `#${color}`,
				}}
				width={16}
			/>
			<Typography>{`#${typeof color === 'number' ? color : color.toUpperCase()}`}</Typography>
		</Box>
	);
};

const Compounds = ({ element }: GetStaticPropsType) => {
	if (!element.compounds.length) {
		return <Typography>There are no known compound</Typography>;
	}

	return (
		<ListOfCompounds
			compounds={element.compounds}
			path={`${element.path}/list-of-compounds`}
			useNativeRouter
		/>
	);
};

const listOfProperties = (props: GetStaticPropsType) => {
	const { element } = props;

	const postfix = generatePostfix();

	const titles = listOfPropertiesTitle();

	const stringOrNumber = (value: unknown) => {
		return parse(union([string(), number()]), value);
	};

	return [
		{
			title: titles[0],
			properties: {
				Name: element.name_en,
				Alternative_Name: element.alternate_name,
				Atomic_Number: element.number,
				Gas_Phase: element.gas_phase,
				Allotropes: element.allotrope_names,
				Appearance: capitalize(element.appearance),
				Refractive_Index: element.refractive_index,
				Phase_At_STP: element.phase_at_stp,
				Spectrum_Image: !element.spectrum ? null : (
					<Image
						alt={`Spectrum image of ${element.name_en}`}
						height={41}
						priority
						src={`${constants.images.generated.spectrum}/${obtainNameFromUrl(element.spectrum.replace('360', '240'))}`}
						width={240}
					/>
				),
				Source: (
					<ExternalLink
						aria-label={`Wikipedia page for ${element.name_en}`}
						href={element.wikipedia}
						sx={{
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'none',
							},
						}}
					>
						<Typography
							level="body-md"
							sx={{
								width: 'fit-content',
								borderBottom: '1px solid',
							}}
						>
							Wikipedia
						</Typography>
					</ExternalLink>
				),
			},
		},
		{
			title: titles[1],
			properties: {
				Static: (
					<Box>
						{!element.bohrModel.static ? null : (
							<BohrTwoDimensional
								name={element.name_en}
								src={`${constants.images.generated.bohr.static}/${obtainNameFromUrl(
									element.bohrModel.static
								)}`}
							/>
						)}
					</Box>
				),
				Interactive: (
					<Box
						sx={{
							width: 'fit-content',
							border: '1px solid',
							borderColor: 'neutral.800',
						}}
					>
						{!element.bohrModel.interactive ? null : (
							<BohrThreeDimensional
								name={element.name_en}
								src={`${constants.images.generated.bohr.interactive}/${obtainNameFromUrl(element.bohrModel.interactive)}`}
							/>
						)}
					</Box>
				),
			},
		},
		{
			title: titles[2],
			properties: {
				CAS_Number: element.cas_number,
				CID_Number: element.cid_number,
				DOT_Number: element.dot_number,
				RTECS_Number: element.rtecs_number,
				Mendeleev_Number: element.mendeleev_number,
				Pettifor_Number: element.pettifor_number,
				Eu_Number: element.eu_number,
				Space_Group_Number: element.space_group_number,
				Glawe_Number: element.glawe_number,
			},
		},
		{
			title: titles[3],
			properties: {
				Atomic_Mass: `${element.atomic_mass} Da`,
				Uncertainty: element.atomic_mass_uncertainty,
			},
		},
		{
			title: titles[4],
			properties: {
				X_Position: element.xpos,
				Y_Position: element.ypos,
				Period: element.period,
				Group: element.group,
			},
		},
		{
			title: titles[5],
			properties: {
				Block: element.block,
				Category: element.category_code
					.split('_')
					.map(capitalize)
					.join(' '),
				Geochemical: element.geochemical_class,
				Goldschmidt: element.goldschmidt_class,
				Electrical_Type: element.electrical_type,
			},
		},
		{
			title: titles[6],
			properties: {
				Urban_Soil: postfix.valueWithSpace({
					value: element.abundance_urban_soil,
					postfix: 'mg/kg',
				}),
				Seawater: postfix.valueWithSpace({
					value: element.abundance_seawater_w1,
					postfix: 'kg/L',
				}),
				Sun: postfix.valueWithSpace({
					value: element.abundance_sun_s1,
					postfix: 'mole ratio to silicon',
				}),
				Earth_Crust: postfix.valueWithSpace({
					value: element.abundance_in_earth_crust_c1,
					postfix: 'g',
				}),
				Human_Body: postfix.valueWithSpace({
					value: element.abundance_humans,
					postfix: '%',
				}),
				Solar_System: postfix.valueWithSpace({
					value: element.abundance_solar_system_y1,
					postfix: 'mole ratio to silicon',
				}),
				Meteorites: postfix.valueWithSpace({
					value: element.abundance_meteorite,
					postfix: '%',
				}),
			},
		},
		{
			title: titles[7],
			properties: {
				Jmol: Color(element.jmol_color),
				Molcas_Gv: Color(element.molcas_gv_color),
				CPK: Color(element.cpk_color),
			},
		},
		{
			title: titles[8],
			properties: {
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
				'Covalent (Single Bound)':
					element.atomic_radius_covalent_single_bond,
				'Covalent (Triple Bound)':
					element.atomic_radius_covalent_triple_bond,
				'Covalent (Cordero)': element.covalent_radius_cordero,
				'Covalent (Pyykko)': element.covalent_radius_pyykko,
				'Covalent (Pyykko Double)':
					element.covalent_radius_pyykko_double,
				'Covalent (Pyykko Triple)':
					element.covalent_radius_pyykko_triple,
				Mendeleev: element.metallic_radius_mendeleev,
				C12: element.metallic_radius_c12,
				Metallic: element.atomic_radius_metallic,
			},
		},
		{
			title: titles[9],
			properties: {
				'Melting/Freeze (USE)': postfix.temperature(element.melt_use),
				'Melting/Freeze (WEL)': postfix.temperature(element.melt_WEL),
				'Melting/Freeze (CRC)': postfix.temperature(element.melt_CRC),
				'Melting/Freeze (LNG)': postfix.temperature(element.melt_LNG),
				'Boiling/Density (USE)': postfix.temperature(element.boil_use),
				'Boiling/Density (WEL)': postfix.temperature(element.boil_WEL),
				'Boiling/Density (CRC)': postfix.temperature(element.boil_CRC),
				'Boiling/Density (LNG)': postfix.temperature(element.boil_LNG),
				'Boiling/Density (Zhang)': postfix.temperature(
					element.boil_Zhang
				),
				Curie_Point: postfix.valueWithSpace({
					value: element.curie_point,
					postfix: 'Tc',
				}),
				Superconducting_Point: postfix.temperature(
					element.superconducting_point
				),
				'Critical Temperature': postfix.temperature(
					element.critical_temperature
				),
				Flashpoint: postfix.temperature(element.flashpoint),
				Autoignition_Point: postfix.temperature(
					element.autoignition_point
				),
				Critical_Pressure: postfix.valueWithSpace({
					value: element.critical_pressure,
					postfix: 'MPa',
				}),
			},
		},
		{
			title: titles[10],
			properties: {
				STP: postfix.density(element.density_rt),
				'Solid (WEL)': postfix.density(element.density_solid_WEL),
				'Solid (CRC)': postfix.density(element.density_solid_CRC),
				'Solid (LNG)': postfix.density(element.density_solid_LNG),
				'Liquid (CR2)': postfix.density(element.density_liquid_cr2),
				Gas: postfix.density(element.density_gas),
			},
		},
		{
			title: titles[11],
			properties: {
				Molar_Volume: postfix.valueWithSpace({
					value: element.molar_volume,
					postfix: 'cm³/mol',
				}),
				Atomic_Volume: postfix.valueWithSpace({
					value: element.atomic_volume,
					postfix: 'cm³',
				}),
				Heat_Of_Fusion_USE: postfix.heat(element.enthalpy_of_fusion),
				Heat_Of_Fusion_CRC: postfix.heat(element.heat_of_fusion_crc),
				Heat_Of_Fusion_LNG: postfix.heat(element.heat_of_fusion_lng),
				Heat_Of_Fusion_WEL: postfix.heat(element.heat_of_fusion_wel),
				Evaporation_USE: postfix.heat(element.evaporation_heat),
				Evaporation_CRC: postfix.heat(element.heat_of_vaporization_crc),
				Evaporation_LNG: postfix.heat(element.heat_of_vaporization_lng),
				Evaporation_WEL: postfix.heat(element.heat_of_vaporization_wel),
				Evaporation_Zhang: postfix.heat(
					element.heat_of_vaporization_zhang
				),
				Combustion: postfix.valueWithSpace({
					value: element.heat_of_combustion,
					postfix: 'kJ/mol',
				}),
				Molar_Heat: postfix.valueWithSpace({
					value: element.molar_heat,
					postfix: 'J/molK',
				}),
				Heat_Capacity_USE: postfix.heatjoule(
					element.specific_heat_capacity
				),
				Heat_Capacity_CRC: postfix.heatjoule(element.specific_heat_crc),
				Heat_Capacity_LNG: postfix.heatjoule(element.specific_heat_lng),
				Heat_Capacity_WEL: postfix.heatjoule(element.specific_heat_wel),
				Thermal_Conductivity: postfix.valueWithSpace({
					value: element.thermal_conductivity,
					postfix: 'W/m*K',
				}),
				Thermal_Expansion: postfix.valueWithSpace({
					value: element.thermal_expansion,
					postfix: '1/K',
				}),
				Adiabatic_Index: element.adiabatic_index,
			},
		},
		{
			title: titles[12],
			properties: {
				Longitudinal: postfix.speed(
					element.speed_of_sound_longitudinal
				),
				Transversal: postfix.speed(element.speed_of_sound_transversal),
				Extensional: postfix.speed(element.speed_of_sound_extensional),
				Fluid: postfix.speed(element.speed_of_sound_fluid),
			},
		},
		{
			title: titles[13],
			properties: {
				'80k': postfix.electrical(element.electrical_resistivity_80K),
				'273k': postfix.electrical(element.electrical_resistivity_273K),
				'293k': postfix.electrical(element.electrical_resistivity_293K),
				'298k': postfix.electrical(element.electrical_resistivity_298K),
				'300k': postfix.electrical(element.electrical_resistivity_300K),
				'500k': postfix.electrical(element.electrical_resistivity_500K),
			},
		},
		{
			title: titles[14],
			properties: {
				Order: element.magnetic_ordering,
				Neel_Point: postfix.valueWithSpace({
					value: element.neel_point,
					postfix: 'Tn',
				}),
				Susceptibility: postfix.valueWithSpace({
					value: element.magnetic_susceptibility,
					postfix: 'm3/kg',
				}),
			},
		},
		{
			title: titles[15],
			properties: {
				Shear_Modulus: postfix.elastic(element.shear_modulus),
				Bulk_Modulus: postfix.elastic(element.bulk_modulus),
				Poisson_Ratio: postfix.valueWithSpace({
					value: element.poisson_ratio,
					postfix: 'ν',
				}),
				Youngs_Modulus: postfix.elastic(element.youngs_modulus),
			},
		},
		{
			title: titles[16],
			properties: {
				Mohs: element.mohs_hardness,
				Brinell: element.brinell_hardness,
				Vickers: element.vickers_hardness,
			},
		},
		{
			title: titles[17],
			noGrid: true,
			properties: {
				Description: element.description,
				Language_Of_Origin: element.language_of_origin,
				Origin_Of_Word: element.origin_of_word,
				Meaning: element.meaning,
				Symbol_Origin: element.symbol_origin,
				Etymological_Description: element.etymological_description,
			},
		},
		{
			title: titles[18],
			properties: {
				'Observed/Predicted By': element.observed_predicted_by,
				'Observed/Discovery Year':
					element.observation_or_discovery_year,
				Discovery_Location: !element.countries.length ? null : (
					<Stack direction="row" spacing={2}>
						{element.countries.map((country) => {
							return (
								<Tooltip
									enterTouchDelay={0}
									key={country.name}
									size="sm"
									title={country.name}
									variant="outlined"
								>
									<Image
										alt={country.name}
										height={country.height}
										priority
										src={`${constants.images.generated.country}/${country.svg}`}
										width={country.width}
									/>
								</Tooltip>
							);
						})}
					</Stack>
				),
				Isolated_Sample_By: element.isolated_sampled_by,
				Isolated_Sample_Year: element.isolation_sample_year,
				Named_By: element.named_by,
			},
		},
		{
			title: titles[19],
			noGrid: true,
			properties: {
				Sources: element.sources,
				Uses: element.uses,
			},
		},
		{
			title: titles[20],
			properties: {
				Half_Life: element.half_life,
				Lifetime: element.lifetime,
				Decay_Mode: element.decay_mode,
				Neutron_Mass_Absorption: element.neutron_mass_absorption,
				Neutron_Cross_Section: element.neutron_cross_section,
			},
		},
		{
			title: titles[21],
			properties: {
				Proton_Affinity: element.proton_affinity,
				'Electron_Affinity (eV)': element.electron_affinity_eV,
				'Electron_Affinity (kJ/mol)': element.electron_affinity_kJmol,
				'Electron_Affinity (pauling)':
					element.electronegativity_pauling,
				'Electron_Affinity (allen)': element.electronegativity_allen,
				'Electron_Affinity (ghosh)': element.electronegativity_ghosh,
			},
		},
		{
			title: titles[22],
			properties: {
				Accepted: element.dipole_polarizability,
				Uncertainty: element.dipole_polarizability_unc,
				'C6 GB': element.c6_gb,
				'C6 Coefficient': element.c6_coeff,
			},
		},
		{
			title: titles[23],
			properties: {
				Constant_Internal_Default_Radius:
					element.lattice_constant_internal_default_radii,
				Constant: element.lattice_constant,
				Strucutre: element.lattice_structure,
				Angles: element.lattice_angles,
			},
		},
		{
			title: titles[24],
			properties: {
				Oxidation_States: element.oxidation_states,
				Electron_Configuration: element.electron_configuration,
				Quantum_Number: element.quantum_number,
				Electron_Configuration_Semantic:
					element.electron_configuration_semantic,
				...Array.from({ length: 8 }, (_, index) => {
					return {
						[`Shells-${index}`]: stringOrNumber(
							// @ts-expect-error: length of 8 will generate 0 to 7, which is within the range of `shells-number`
							element[`shells-${index}`]
						),
					};
				}).reduce((accumulator, value) => {
					return {
						...accumulator,
						...value,
					};
				}, {}),
				...Array.from({ length: 30 }, (_, index) => {
					return {
						[`Ionization Energies-${index}`]: stringOrNumber(
							// @ts-expect-error: length of 30 will be within 30, which is within the range of `ionization_energies-number`
							element[`ionization_energies-${index}`]
						),
					};
				}).reduce((accumulator, value) => {
					return {
						...accumulator,
						...value,
					};
				}, {}),
			},
		},
		{
			title: titles[25],
			noGrid: true,
			properties: {
				None: <Compounds {...props} />,
			},
		},
	] as const satisfies ReadonlyArray<
		Omit<Argument<typeof Properties>, 'top'>
	>;
};

export { listOfPropertiesTitle };
export default listOfProperties;
