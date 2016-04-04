// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var person_seed = [
  {
    name: "Adam Beck",
    github_link: "https://github.com/mradambeck",
    github_profile_image: "https://avatars.githubusercontent.com/u/8527273?v=3",
    current_city: "Oakland, CA",
    pets: ["Baxter", "Simon"]
  }
  // {
  //   name: "Sherah Smith",
  //   github_link: "https://github.com/sherah",
  //   github_profile_image: "https://avatars.githubusercontent.com/u/1241135?v=3",
  //   current_city: "Oakland, CA",
  //   pets: []
  // }
];

var artist_seed = [
  {
    name: "Deth P. Sun",
    instagram_link: "https://www.instagram.com/dethpsun/",
    facebook_link: "https://www.facebook.com/dethpsun/",
    website_link: "http://dethpsun.com/",
  },
  {
    name: "David Huffman",
    website_link: "http://david-huffman.com/"
  },
  {
    name: "Marci Washington",
    instagram_link: "https://www.instagram.com/marciwash/",
    facebook_link: "https://www.facebook.com/Marci-Washington-118217581571034/",
    website_link: "http://www.marciwashington.com/",
  },
  {
    name: "Mary Snowden",
    facebook_link: "https://www.facebook.com/mary.snowden.18"
  },
  {
    name: "Michael Beck",
    facebook_link: "https://www.facebook.com/michael.beck.988373",
    website_link: "http://www.michaelbeck.com/"
  },
  {
    name: "Gareth Lloyd",
    facebook_link: "https://www.facebook.com/Thunderwear420"
  },
  {
    name: "Rachel Kaye",
    website_link: "http://rachelakaye.com/"
  },
  {
    name: "Adam Beck",
    facebook_link: "https://www.facebook.com/mr.adambeck",
    instagram_link: "https://www.instagram.com/adambeck/"
  },
  {
    name: "Ben Peterson",
    instagram_link: "https://www.instagram.com/newertopographics"
  },
  {
    name: "Manny Silva",
  },
  {
    name: "Kelly Lynn Jones",
    website: "http://www.littlepaperplanes.com"
  }
];



db.Artist.create(artist_seed, function(err, artist){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new Artist", artist._id);
  process.exit(); // we're all done! Exit the program.
});

db.Person.create(person_seed, function(err, person){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new person", person._id);
  process.exit(); // we're all done! Exit the program.
});
