var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({

});

var PersonSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  github_link: {
    type: String,
    require: false
  },
  github_profile_image: {
    type: String,
    require: false
  },
  current_city: {
    type: String,
    require: true
  },
  pets: [{
    type: String,
    require: false
  }]

});

var Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
