// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allows other devs to consume api from another website
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log("server.js working");

/************
 * DATABASE *
 ************/

var db = require('./models');


/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));


/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
  console.log("/views/index.html has been served");
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  console.log("/api has been served");
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/mradambeck/express-personal-api/blob/master/README.md",
    base_url: "http://blueberry-pie-15876.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/people", description: "All the people in my database"},
      {method: "GET", path: "/api/people/:id", description: "Grab a person via their _id", parameters: [
        { name: "Full name of the person", github_link: "Link to their Github profile",
        github_profile_image: "Link to their github prfile image", current_city: "Where they currently live, (in City, State format)",
        pets: "Any pets that they have", _id: "Mongo assigned ID number", _v: "Version" }
      ]},
      {method: "GET", path: "/api/people/57000c8ecd10852c17b18cc1", description: "My personal profile"},
      {method: "GET", path: "/api/artists", description: "All the artists in my database"},
      {method: "GET", path: "/api/artists/:id", description: "Pull a single artists in my database by their ID", parameters: [
        { name: "Full name of the artist", instagram_link: "Link to the artists instagram account",
        facebook_link: "Link to the artists Facebook Account", website_link: "Link to the artists Website" }
      ]},
      {method: "GET", path: "/api/artworks", description: "All the artpieces in my collection"},
      {method: "GET", path: "/api/artworks/:id", description: "Pull a single artwork", parameters: [
        { title: "Name of the artwork", artist: "Artist the created the artwork", year: "Year the artwork was created",
        medium: "Medium of the artwork (ex: 'Photograph, Oil on Canvas, Print, etc')", dimensions: "Dimensions of the artwork",
        image_url: "URL linking to an image of the artwork"}
      ]},
    ]
  });
});

// get all People
app.get('/api/people', function (req, res) {
  // send all persons as JSON response
  db.Person.find(function(err, people){
    if (err) { return console.log("index error: " + err); }
    console.log("api/people has been served");
    res.json(people);
  });
});

// get one Person
app.get('/api/people/:id', function (req, res) {
  var id = req.params.id;
  console.log('/api/people/',id);
  db.Person.findOne({_id: id }, function(err, data) {
    if (err) { return console.log("index error: " + err); }
    res.json(data);
  });
});

// get all Artists
app.get('/api/artists', function (req, res) {
  // send all persons as JSON response
  db.Artist.find(function(err, artists){
    if (err) { return console.log("index error: " + err); }
    console.log("api/artists has been served");
    res.json(artists);
  });
});

// get one Artist
app.get('/api/artists/:id', function (req, res) {
  var id = req.params.id;
  console.log('/api/artists/',id);
  db.Artist.findOne({_id: id }, function(err, artist) {
    if (err) { return console.log("index error: " + err); }
    res.json(artist);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
