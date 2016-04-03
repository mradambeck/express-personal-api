var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArtistSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  instagram_link: {
    type: String,
    require: false
  },
  facebook_link: {
    type: String,
    require: false
  },
  website_link: {
    type: String,
    require: false
  }
});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
