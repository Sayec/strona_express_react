const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectSchema = new Schema({
  name: String,
  category: String,
  descirption: String,
});

module.exports = mongoose.model('Objects', objectSchema);
