const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

//https://medium.com/@avanthikameenakshi/crud-react-express-99025f03f06e
const organizationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  realm: String,
  date: String,
  name: String,
  country: String,
  type: String,
  language: String,
});


organizationSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Organization', organizationSchema);
