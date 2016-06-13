/********************* FOURSQUARE AJAX CALLS     *******************************/

var current_location;
var restauraunts = [];
var firstRest = restauraunts[0];
var color_array = ["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F","#006064"]

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
        fourSquareObj.photo = response.response.groups[0].items[x].venue.photos.groups[0].items[0].prefix + "300x200"+ response.response.groups[0].items[x].venue.photos.groups[0].items[0].suffix;
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
      }
    }//for loop
    results_to_DOM(restauraunts);
    console.log("fourSquareReturn",restauraunts);
}//fourSquareReturn

function convert_to_miles(meters) {
  return (meters * 0.000621371192).toFixed(2);
}

function results_to_DOM (array) {
  var card_array = [];
  var top_position = 0;
  var z_index = 10;
  var window_height = $('body').height();
  for(var i = 0; i<10; i++){
    var div = $("<div>").addClass("result-card").css("background",color_array[i]);
    var img = $("<div>").addClass("result-image").css({
       background: "url(" + restauraunts[i].photo + ")",
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });
    var textDiv = $("<div>").addClass("result-text-holder");
    var i_distance = $("<i>").addClass("fa fa-car");
    var i_eta = $("<i>").addClass("fa fa-car");
    var i_rating = $("<i>").addClass("fa fa-star");
    var i_price = $("<i>").addClass("fa fa-usd fa-2x");
    var distance = $("<p>").text("Distance: " + restauraunts[i].distance);
    var eta = $("<p>");
    var rating = $("<p>").text("Rating: " + restauraunts[i].rating);
    var price = $("<p>").text("Price: " + restauraunts[i].price);
    var nav_text = $("<p>").text("Let's Go!");
    var nav_button = $("<div>").addClass("navigation-button");
    nav_button.append(nav_text);
    textDiv.append(i_distance, distance, i_eta, eta, i_rating, rating, i_price, price);
    div.append (img, textDiv, nav_button);
    $("#results-page").append(div.attr("id","card" + i).css({
      top: 100 + top_position + window_height + "px",
      'z-index': "+"+z_index
    }));
    top_position += 25;
    z_index -= 1;
    card_array.push("card"+i);
  }
  stack_up(card_array,window_height);
}

function stack_up (array, height) {
  var delay = 500;
  for(var i=0; i<array.length; i++){
    var target_card = $("#" + array[i]);
    var current_position = target_card.position().top;
    target_card.delay(delay).animate({top: (height - current_position) * -1 + "px"},500);
    delay+=300;
  }
}

$(document).ready(function() {
    // console.log("current_location", current_location);
    current_location = navigator.geolocation.getCurrentPosition(success, error, options);
    console.log("current_location", current_location);
    $("#more-info").click(function () {
        console.log("#more-info button has been clicked");
        $("#result-div").addClass("flip-card");
    });
});//docready
