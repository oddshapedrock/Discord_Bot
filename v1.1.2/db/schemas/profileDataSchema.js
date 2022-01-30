const db = require('../db.js');
const data = require('../collections/profileData.js');
const {createData} = require("./schemaManager.js");

const createProfile = (input) => {

let values = {
  guild: {required: true},
  user: {required: true},
  bank: {required: false,  default: 0},
  coins: {required: false, default: 100},
  lastTransaction: {required: false, default: 0}
}

let newObject = createData(input, values);
db.add(data, '/collections/profileData.js', newObject);
}

module.exports = {
  createProfile
};
