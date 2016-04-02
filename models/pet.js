var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  species: {
    type: String,
    require: true
  },
  breed: {
    type: String,
    require: true
  },
  photo_url: {
    type: String,
    require: false
  }
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
