const { createData } = require('../schemaManager.js');

const createProfile = (input, data) => {

const {db, collection, schema} = data;

	let values = {
		guild: { required: true, type: "string" },
		user: { required: true, type: "string" },
		coins: { required: false, default: 100, type: "number" }
	}

	let newObject = createData(input, values);


	if (newObject != undefined) {
		db.add(collection('profileData.json'), '/collections/profileData.json', newObject);
	}

}

module.exports = {
	createProfile
};
