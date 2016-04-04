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


/********************
 * JSON API Endpoints
 *******************/

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  console.log("/api has been served");
  res.json({
    message: "Welcome to Adam Beck's personal api! I have a profile for myself and a couple friends, as well as a database outlining my art collection.  Here's some info on endpoints and usage:",
    documentation_url: "https://github.com/mradambeck/express-personal-api/blob/master/README.md",
    base_url: "http://blueberry-pie-15876.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "All the people in my database"},
      {method: "GET", path: "/api/profile/:name", description: "Grab a person via their name", parameters: [
        { name: "Full name of the person", github_link: "Link to their Github profile",
        github_profile_image: "Link to their github profile image", current_city: "Where they currently live, (in City, State format)",
        pets: "Any pets that they have", _id: "Mongo assigned ID number", _v: "Version" }
      ]},
      {method: "GET", path: "/api/profile/Adam%20Beck", description: "My personal profile"},
      {method: "GET", path: "/api/artists", description: "All the artists in my database"},
      {method: "GET", path: "/api/artists/:name", description: "Pull a single artists in my database by their name", parameters: [
        { name: "Full name of the artist", instagram_link: "Link to the artists instagram account",
        facebook_link: "Link to the artists Facebook Account", website_link: "Link to the artists Website", _id: "Mongo assigned ID number",
        _v: "Mongo assigned version number"}
      ]},
      {method: "POST", path: "/api/artists", description: "Create new artist"},
      {method: "GET", path: "/api/artworks", description: "All the artpieces in my collection"},
      {method: "GET", path: "/api/artworks/:id", description: "Pull a single artwork", parameters: [
        { title: "Name of the artwork", artist: "Artist the created the artwork", year: "Year the artwork was created",
        medium: "Medium of the artwork (ex: 'Photograph, Oil on Canvas, Print, etc')", dimensions: "Dimensions of the artwork",
        image_url: "URL linking to an image of the artwork", _id: "Mongo assigned ID number", _v: "Mongo assigned Version number"}
      ]},
      {method: "POST", path: "/api/artworks", description: "Create new artwork - note, artist must be created first"},
      {method: "PUT", path: "/api/artworks/:id", description: "Update an artwork that already exists in the database"},
      {method: "DELETE", path: "/api/artworks/:id", description: "Remove an artwork from the database"}
    ]
  });
});

// get all People
app.get('/api/profile', function (req, res) {
  // send all persons as JSON response
  db.Person.find(function(err, people){
    if (err) { return console.log("index error: " + err); }
    console.log("api/profile has been served");
    res.json(people);
  });
});

// get one Person
app.get('/api/profile/:name', function (req, res) {
  var nameToLookFor = req.params.name;
  console.log('/api/profile/', nameToLookFor);
  db.Person.findOne({name: nameToLookFor }, function(err, data) {
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
app.get('/api/artists/:name', function (req, res) {
  var nameToLookFor = req.params.name;
  console.log('/api/artists/', nameToLookFor);
  db.Artist.findOne({name: nameToLookFor }, function(err, artist) {
    if (err) { return console.log("index error: " + err); }
    res.json(artist);
  });
});

// create new Artist
app.post('/api/artists', function (req, res) {
  // create new artist with form data (`req.body`)
  console.log('Create Artist', req.body);
  var newArtist = new db.Artist(req.body);
  newArtist.save(function handleDBArtistSaved(err, savedArtist) {
    res.json(savedArtist);
  });
});

// get all Artworks
app.get('/api/artworks', function (req, res) {
  // send all books as JSON response, add artist
  db.Artwork.find().populate('artist')
    .exec(function(err, artworks) {
      if (err) { return console.log("index error: " + err); }
      res.json(artworks);
  });
});

// get one Artwork
app.get('/api/artworks/:id', function (req, res) {
  var id = req.params.id;
  console.log('/api/artworks/',id);
  db.Artwork.findOne({_id: id }, function(err, artwork) {
    if (err) { return console.log("index error: " + err); }
    res.json(artwork);
  });
});

// create new Artwork
app.post('/api/artworks', function (req, res) {
  // create new book with form data (`req.body`)
  var newArtwork = new db.Artwork({
    title: req.body.title,
    year: req.body.year,
    medium: req.body.medium,
    dimensions: req.body.dimensions,
    image_url: req.body.image_url
  });
  // find the artist from req.body
  db.Artist.findOne({name: req.body.artist}, function(err, artist){
    if (err) {
      return console.log(err);
    }
    // add this artist to the artwork
    console.log("artist: ", artist);
    newArtwork.artist = artist;
    console.log("newArtwork.artist: ", newArtwork.artist);

    // save newBook to database
    newArtwork.save(function(err, artwork){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", artwork.title);
      // send back the artwork!
      res.json(artwork);
    });
  });
});

app.put('/api/artworks/:id', function (req, res){
  console.log('artwork update', req.params);
  var artworkId = req.params.id;
  db.Artwork.findOneAndUpdate({ _id: artworkId}, function (err, artwork){

  });
});


// delete artwork
app.delete('/api/artworks/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('artwork delete', req.params);
  var artworkId = req.params.id;
  // find the index of the book we want to remove
  db.Artwork.findOneAndRemove({ _id: artworkId })
    .populate('artist.name')
    .exec(function (err, deletedArtwork) {
    res.json(deletedArtwork);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
