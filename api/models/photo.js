const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: String,
  category: String,
  object: String,
  description: String,
  url: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photos', photoSchema);
