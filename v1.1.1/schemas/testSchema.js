const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true
};

const testSchema = mongoose.Schema({
  id: reqString,
  text: reqString,
});

module.exports = mongoose.model("test-schema", testSchema);
