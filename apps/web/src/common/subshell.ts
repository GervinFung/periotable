const subshells = [
	{
		subshell: 's',
		color: '#9266CC',
		hover: '#8F52E0',
	},
	{
		subshell: 'p',
		color: '#85D4EC',
		hover: '#63C5EA',
	},
	{
		subshell: 'd',
		color: '#F471A5',
		hover: '#EA4B8B',
	},
	{
		subshell: 'f',
		color: '#FED480',
		hover: '#FCB424',
	},
] as const;

type Subshell = (typeof subshells)[number];

export type { Subshell };

export default subshells;
