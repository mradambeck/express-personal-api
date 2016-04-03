var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Artist = require('./artist');


var ArtworkSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  year: {
    type: String,
    require: true
  },
  medium: {
    type: String,
    require: true
  },
  dimensions: {
    type: String,
    require: false
  },
  image_url: {
    type: String,
    require: false
  }


});

var Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;
