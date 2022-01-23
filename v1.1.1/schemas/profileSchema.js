const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)

const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
    unique: true
  },
  serverID: {
    type: String,
    require: true
  },
  coins: {
    type: Number,
    default: 1000
  },
  bank: {
    type: Number
  }
});

module.exports = mongoose.model("profilemodels", profileSchema);
