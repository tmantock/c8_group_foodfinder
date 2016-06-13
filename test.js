/********************* FOURSQUARE AJAX CALLS     *******************************/

var current_location;
var restauraunts = [];
var firstRest = restauraunts[0];

var options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

function success (pos) {
  var crd = pos.coords;
  console.log("Latitude: " + crd.latitude);
  console.log("Longiude: " + crd.longitude);
  console.log("Within: " + crd.accuracy + "meters");
  foursquare_call(crd);
  return crd;
}

function error(err) {
  console.warn("Error(" + err.code + "):" + err.message);
}

function foursquare_call(crd){
     $.ajax({
        dataType: "JSON",
        url: "https://api.foursquare.com/v2/venues/explore?client_id= BJ55LPF34FXTMHV4VOW0L0VMAUV4MYG2VK3JC33ELWU2KOXZ&client_secret= KNMJ3JKCNBI4AUWZNHPLZBQZSMEQTURPQW0EGS4AKOO2TM3X&v=20130815&ll=33.64,-117.74&venuePhotos=1&query=bbq",
        method: "GET",
        url: 'https://api.foursquare.com/v2/venues/explore?client_id= BJ55LPF34FXTMHV4VOW0L0VMAUV4MYG2VK3JC33ELWU2KOXZ&client_secret= KNMJ3JKCNBI4AUWZNHPLZBQZSMEQTURPQW0EGS4AKOO2TM3X&v=20130815&ll=33.64,-117.74&venuePhotos=1&query=bbq',
        method: "get",
  // data: {
  //   latitude: crd.latitude,
  //   longitude: crd.longitude,
  //   radius: 100000,
  //   user_id: 555,
  //   search_option: {
  //     option: "random",
  //     category: "sushi"
  //   }

      success: function (response){
          fourSquareReturn(response);
            console.log(response.response);
      },//success
      error: function(response){
            console.log(response);
      }//erro
      });//ajax
} //foursquare_call

function fourSquareReturn(response){
    var fourSquareResponse = response.response.groups[0].items;
    for(var x = 0; x < fourSquareResponse.length; x++){
        var fourSquareObj = {};
        if (response.response.groups[0].items[x].venue.photos.count >= 1){
        fourSquareObj.name = response.response.groups[0].items[x].venue.name;
        fourSquareObj.distance = response.response.groups[0].items[x].venue.location.distance;
        fourSquareObj.photo = response.response.groups[0].items[x].venue.photos.groups[0].items[0].prefix + "400X400"+ response.response.groups[0].items[x].venue.photos.groups[0].items[0].suffix;
        fourSquareObj.hours = response.response.groups[0].items[x].venue.hours;
        fourSquareObj.website =  response.response.groups[0].items[x].venue.url;
        fourSquareObj.phone = response.response.groups[0].items[x].venue.contact.formattedPhone;
        fourSquareObj.venueid = response.response.groups[0].items[x].venue.id;
        fourSquareObj.street =  response.response.groups[0].items[x].venue.location.address;
        fourSquareObj.city = response.response.groups[0].items[x].venue.location.city;
        fourSquareObj.state =   response.response.groups[0].items[x].venue.location.state;
        fourSquareObj.zip = response.response.groups[0].items[x].venue.location.postalCode;
        fourSquareObj.lat = response.response.groups[0].items[x].venue.location.lat;
        fourSquareObj.lng = response.response.groups[0].items[x].venue.location.lng;
        fourSquareObj.price = response.response.groups[0].items[x].venue.price.message;
        fourSquareObj.rating = response.response.groups[0].items[x].venue.rating;
        restauraunts.push(fourSquareObj);
      }//if
       // fourSquareObj.tips = response.response.groups[0].items[x].tips;
       // fourSquareObj.firstName =  response.response.groups[0].items[x].tips[0].user.firstName;
       // fourSquareObj.lastName =  response.response.groups[0].items[x].tips[0].user.lastName;
       // fourSquareObj.likes = response.response.groups[0].items[x].tips[0].likes[0].count;
    }//for loop
    console.log("fourSquareReturn",restauraunts);
}//fourSquareReturn


$(document).ready(function() {
    // console.log("current_location", current_location);
    current_location = navigator.geolocation.getCurrentPosition(success, error, options);
    console.log("current_location", current_location);
    $("#more-info").click(function () {
        console.log("#more-info button has been clicked");
        $("#result-div").addClass("flip-card");
    });
});//docready
