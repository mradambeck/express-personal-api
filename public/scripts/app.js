console.log("Sanity Check: JS is working!");
var peopleTemplate;
var artworkTemplate;
var $peopleColumn;
var $artworkColumn;
var allPeople = [];
var allArtworks = [];

$(document).ready(function(){

  $peopleColumn = $('#peopleColumn');
  $artworkColumn = $('#artworkColumn');

  // compile handlebars templates
  var peopleSource = $('#people-template').html();
  peopleTemplate = Handlebars.compile(peopleSource);

  var artworkSource = $('#artwork-template').html();
  artworkTemplate = Handlebars.compile(artworkSource);


  // ajax calls
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handlePeopleSuccess,
    error: handlePeopleError
  });

  $.ajax({
    method: 'GET',
    url: '/api/artworks',
    success: handleArtworksSuccess,
    error: handleArtworksError
  });

  $('#artworkColumn').on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/artworks/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/artworks/'+$(this).attr('data-id'),
      success: deleteArtworkSuccess,
      error: deleteArtworkError
    });
  });

  // $('#artworkColumn').on('click', '.updateBtn', function() {
  //   console.log('clicked delete button to', '/api/artworks/'+$(this).attr('data-id'));
  //   $.ajax({
  //     method: 'PUT',
  //     url: '/api/artworks/'+$(this).attr('data-id'),
  //     success: updateArtworkSuccess,
  //     error: updateArtworkError
  //   });
  // });

  $('#newArtworkForm').on('submit', function(event) {
    event.preventDefault();
    console.log('new artwork serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/artworks',
      data: $(this).serializeArray(),
      success: newArtworkSuccess,
      error: newArtworkError
    });
  });

});

// handle People population
function handlePeopleSuccess(json) {
  allPeople = json;
  console.log('allPeople: ', allPeople);
  renderPeople();
}
function handlePeopleError(e) {
  console.log('uh oh');
  $('#peopleColumn').text('Failed to load people, is the server working?');
}

// handle Artwork population
function handleArtworksSuccess(json) {
  allArtworks = json;
  console.log('allArtworks: ',allArtworks);
  renderArtworks();
}
function handleArtworksError(e) {
  console.log('uh oh');
  $('#artworksColumn').text('Failed to load people, is the server working?');
}

// handle artwork creation
function newArtworkSuccess(json) {
  $('#newArtworkForm input').val('');
  allArtworks.push(json);
  renderArtworks();
}

function newArtworkError(err) {
  console.log('newArtwork error! ', err);
}

// delete artworks
function deleteArtworkSuccess(json) {
  var artwork = json;
  console.log(json);
  var artworkId = artwork._id;
  console.log('delete artwork', artworkId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allArtworks.length; index++) {
    if(allArtworks[index]._id === artworkId) {
      allArtworks.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  renderArtworks();
}

function deleteArtworkError() {
  console.log('deleteArtwork error!');
}


// rendering to page

function renderPeople() {
  // empty existing posts from view
  $peopleColumn.empty();

  // pass `allPeople` into the template function
  var peopleHtml = peopleTemplate({ people: allPeople });

  // append html to the view
  $peopleColumn.append(peopleHtml);
}

function renderArtworks() {
  // empty existing posts from view
  $artworkColumn.empty();

  // pass `allArtwork` into the template function
  var artworkHtml = artworkTemplate({ artwork: allArtworks });

  // append html to the view
  $artworkColumn.append(artworkHtml);
}
