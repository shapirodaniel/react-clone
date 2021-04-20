export const getRandomHexColorCode = () => {
	const rgbArray = Array(3)
		.fill(null)
		.map(() => Math.floor(Math.random() * 256));

	return rgbArray.reduce((acc, curr) => {
		const hexCode = curr.toString(16);
		return (acc += hexCode);
	}, '#');
};
