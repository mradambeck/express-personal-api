var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/personal-api");

// module.exports.Campsite = require("./campsite.js.example");

//import person.js
module.exports.Person = require("./person.js");
module.exports.Pet = require(".pet.js");
