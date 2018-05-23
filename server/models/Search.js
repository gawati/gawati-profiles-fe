const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

//https://medium.com/@avanthikameenakshi/crud-react-express-99025f03f06e
const searchSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  userName: String,
  searchName: String,
  data: String,
  time : { type : Date, default: Date.now },
});


searchSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Search', searchSchema);