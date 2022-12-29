let newObj = {};
const createData = (input, values) => {
	for (let i = 0; i < Object.entries(values).length; i++) {
		if (!input.hasOwnProperty(Object.keys(values)[i])) {
			if (!Object.values(values)[i]['required']) {
				newObj[Object.keys(values)[i]] = Object.values(values)[i].default;
			} else {
				console.log(`.\nError: \nRequired field not filled, Data could not be created. \nInput ${JSON.stringify(input)} does not contain value "${Object.keys(values)[i]}"\n.`);
				return undefined;
			}
		} else {
			if (Object.values(values)[i].type == typeof(input[Object.keys(values)[i]]) || Object.values(values)[i].type == "any") {
				newObj[Object.keys(values)[i]] = input[Object.keys(values)[i]];
			} else {
				console.log("Wrong value type");
				return undefined;
			}
		}
	}
	return {...newObj};
}

module.exports = {
	createData
};
