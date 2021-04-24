export const getRandomHexColorCode = () => {
	const rgbArray = Array(3)
		.fill(null)
		.map(() => Math.floor(Math.random() * 256));

	return rgbArray.reduce((acc, curr) => {
		let hexCode = curr.toString(16);

		if (hexCode.length < 2)
			hexCode += Math.floor(Math.random() * 16).toString(16);

		return (acc += hexCode);
	}, '#');
};
