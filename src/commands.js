const commands = {
	RESET: [
		'A0750301',
		'E1450301',
		'B0900301',
		'C0500301'
	],

	CLAP_MIDDLE: [
		'E1730300',
		'A1080300',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C0500301',
		'A0750300',
		'E1400300',
		'B0900300'
	],

	CLAP_LEFT: [
		'B0490300',
		'E1730300',
		'A1080300',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C0500301',
		'A0750300',
		'E1400300',
		'B0900300'
	],

	CLAP_RIGHT: [
		'B1490300',
		'E1730300',
		'A1080300',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C1272551',
		'C0502551',
		'C0500301',
		'A0750300',
		'E1400300',
		'B0900300'
	],

	COFFEE_RIGHT: [
		'B0490301',
		'A1490301',
		'E1380301',
		'C0960301',
		'A1240301',
		'B1490301',
		'E1410301',
		'A1490301',
		'C0402551',
		'A0750301',
		'E1400301',
		'B0900301',
		'C0500301'
	],

	COFFEE_LEFT: [
		'B1490301',
		'A1500301',
		'C0960301',
		'A1160301',
		'B0490301',
		'E1480301',
		'A1480301',
		'A1430301',
		'E1410301',
		'E1390301',
		'C0492551',
		'A0750301',
		'E1400301',
		'B0900301',
		'C0500301'
	]
};

const toggleMap = { COFFEE: ['RIGHT', 'LEFT'], CLAP: ['MIDDLE', 'LEFT', 'RIGHT'] }

export const getCommand = (name) => {
	return toggleMap[name] ? getToggleCommand(name) : commands[name];
};

export const getToggleCommand = (prefix) => {
	const toggleValue = toggleMap[prefix];
	const firstValue = toggleValue[0];

	toggleValue.splice(0, 1);
	toggleMap[prefix].push(firstValue);

	return commands[`${prefix}_${firstValue}`];
};

export default commands;