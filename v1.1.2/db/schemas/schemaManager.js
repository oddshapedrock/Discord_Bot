const newObject = {}
const createData = (input, values) => {
	for (let i = 0; i < Object.entries(values).length; i++) {
		if (Object.values(values)[i]["required"]) {
			if (!input.hasOwnProperty(Object.keys(values)[i])) {
				return console.log(`.\nError: \nRequired field not filled, Data could not be created.\nInput ${JSON.stringify(input)} does not contian value "${Object.keys(values)[i]}"\n.`);
			}
			newObject[Object.keys(values)[i]] = input[Object.keys(values)[i]];
		} else {
			if (!input.hasOwnProperty(Object.keys(values)[i])) {
				newObject[Object.keys(values)[i]] = Object.values(values)[i].default;
			} else {
				newObject[Object.keys(values)[i]] = input[Object.keys(values)[i]];
			}
		}
	}
	return newObject;
}

module.exports = {
	createData
};
