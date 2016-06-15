/********************* FOURSQUARE AJAX CALLS     *******************************/

var current_location;
var restauraunts = []; // an array of restaurant objects from fourSquareReturn
var firstRest = restauraunts[0];
var color_array = ["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F","#006064"];
var options = {
    enableHighAccuracy: false,
    maximumAge: 0
};
var circle;
var coordinates = {}; // this contains object defintions longitude and latitude

function success (pos) {
  var crd = pos.coords;
  console.log("Latitude: " + crd.latitude);
  console.log("Longiude: " + crd.longitude);
  console.log("Within: " + crd.accuracy + "meters");
  coordinates.latitude = crd.latitude;
  coordinates.longitude = crd.longitude;
  console.log(coordinates);
  return crd;
}

function error(err) {
  console.warn("Error(" + err.code + "):" + err.message);
}

// ajax call to foursqaure -- triggered on button click from landing.html ngRoute -- all key restaurant object/DOM functions trigger in a chain off it
function foursquare_call(){
 $.ajax({
   dataType: "JSON",
  url: "https://api.foursquare.com/v2/venues/explore?client_id= BJ55LPF34FXTMHV4VOW0L0VMAUV4MYG2VK3JC33ELWU2KOXZ&client_secret= KNMJ3JKCNBI4AUWZNHPLZBQZSMEQTURPQW0EGS4AKOO2TM3X&v=20130815&ll=33.64,-117.74&venuePhotos=1&query=sushi",
  method: "GET",
  data: {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    radius: 100000,
    user_id: 555,
    search_option: {
      option: "random",
      category: "sushi"
    }
  },
  success: function (response){
    fourSquareReturn(response);
    console.log(response.response);
  },
  error: function(response){
  console.log(response);
  }
});
}

// creates all restaurant objects from a single foursquare call - push to restaurants global array
function fourSquareReturn(response){
    var fourSquareResponse = response.response.groups[0].items;
    for(var x = 0; x < fourSquareResponse.length; x++){
        var fourSquareObj = {}; // local variable (scope is the loop) is restaurant object pushed to global restaurants array
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

        // THIS IS HARD CODED FOR TESTING - NEED TEVIN TO FIX
        // fourSquareObj.price = response.response.groups[0].items[x].venue.price.message;
        fourSquareObj.price = "unknown";
        fourSquareObj.rating = response.response.groups[0].items[x].venue.rating;
        restauraunts.push(fourSquareObj);
      }
    }// end of for loop
    results_to_DOM(restauraunts);
    console.log("fourSquareReturn",restauraunts);
}

function convert_to_miles(meters) {
  return (meters * 0.000621371192).toFixed(2);
}

// called at end of fourSquareReturn using global restaurants array just populated
function results_to_DOM (array) {
  var card_array = []; // seems this should be a global variable (array) for interaction b/w restuarant objects & these matching DOM elements
  var top_position = 0;
  var z_index = 10;
  var window_height = $('body').height();
  for(var i = 0; i<10; i++){
    var div = $("<div>").addClass("result-card").css("background",color_array[i]);
    var img = $("<div>").addClass("result-image").css({
       background: "url(" + array[i].photo + ")",
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });
    var textDiv = $("<div>").addClass("result-text-holder");
    var name = $("<h4>").text(array[i].name);
    var i_distance = $("<i>").addClass("fa fa-car");
    var i_eta = $("<i>").addClass("fa fa-clock-o");
    var i_rating = $("<i>").addClass("fa fa-star");
    var i_price = $("<i>").addClass("fa fa-usd fa-2x");
    var distance = $("<p>").text(convert_to_miles(array[i].distance) + " miles");
    var eta = $("<p>");
    var rating = $("<p>").text("Rating: " + array[i].rating);
    var price = $("<p>").text("Price: " + array[i].price);
    var btn_div = $("<div>").addClass("button-holder");
    var i_left = $("<i>").addClass("fa fa-arrow-left");
    var i_right = $("<i>").addClass("fa fa-arrow-right");
    var prev_div = $("<div>").addClass("col-xs-4 result-button");
    var next_div = $("<div>").addClass("col-xs-4 result-button");
    var nav_div = $("<div>").addClass("col-xs-4 result-button");
    var nav_text = $("<p>").text("Let's Go!");
    var next_btn = $("<div>").addClass("next-button").attr("data-position",i);
    var prev_btn = $("<div>").addClass("prev-button").attr("data-position",i);
    var nav_button = $("<div>").addClass("navigation-button");

    next_btn.on("click", function (){
      console.log("this within next is", this);
      next_card(this , 1);
    });


    prev_btn.on("click", function (){
      console.log("this within prev is", this);
      prev_card(this , 1);
    })

    prev_btn.append(i_left);
    next_btn.append(i_right);
    nav_button.append(nav_text);
    prev_div.append(prev_btn);
    next_div.append(next_btn);
    nav_div.append(nav_button);
    btn_div.append(prev_div,nav_div,next_div);
    textDiv.append(name, i_distance, distance, i_eta, eta, i_rating, rating, i_price, price);
    div.append (img, textDiv, btn_div);
    $("#results-page").append(div.attr("id","card" + i).css({ // .result_card  --  #id = of 0-9 matching array
      top: 100 + top_position + window_height + "px",
      'z-index': "+"+z_index
    }));
    top_position += 15;
    z_index -= 1;

      $('div').on('swipeleft', function(e) {
          console.log('swipeL (prev_card) triggered', i);
      });

      $('div').on('swiperight', function(e) {
          console.log('swipeR (next_card) triggered', i);
      });

    card_array.push("card"+i);
  }
  stack_up(card_array, window_height);
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

function next_card (element , direction) {
  var card = $(element).attr("data-position");
  if (parseInt(card) !== 9){
    var parent = $("#card"+card);
    var current_position = parent.position().top;
    var next_child_position = $("#card" + (parseInt(card) + 1)).position().top;
    var distance = 0;
    var current_width = parent.width();
    parent.animate({left: current_width * 2 + "px"},300);
    card = parseInt(card) + 1;
    var length = 10;
    for(var i = card; i<=length; i++){
      var child = $("#card" + i);
      child.animate({top: (current_position + distance) + "px"},500);
      distance += 25;
    }
  }
  else {
    return;
  }
}

function prev_card (element , direction) {
  var card = $(element).attr("data-position");
  if (parseInt(card) !== 0){
    var parent = $("#card"+card);
    var prev_card = $("#card" + (parseInt(card) - 1));
    var card_width = prev_card.width();
    var current_position = parent.position();
    var distance = 25;
    var current_width = parent.width();
    prev_card.animate({left: current_position.left + (card_width/2) + "px"},300);
    card = parseInt(card);
    var length = 10;
    for(var i = card; i<=length; i++){
      var child = $("#card" + i);
      child.animate({top: (current_position.top) + distance + "px"},500);
      distance += 25;
    }
  }
  else {
    return;
  }
}

function price_replacement(array) {
    for (var i=0;i<array.length; i++){
        switch(array[i].price.message.toLocaleLowerCase()){
            case "cheap":
                array[i].price.message = "$";
                break;
            case "moderate":
                array[i].price.message = "$$";
                break;
            case "expensive":
                array[i].price.message = "$$$";
                break;
            case "very expensive":
                array[i].price.message = "$$$$";
                break;
            case "unknown":
                array[i].price.message = "?";
                break;
        }
    }///end of for loop
    return array;
}
function price_sort(array) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
            if (array[i].price.message > array[i+1].price.message) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
   }while (swapped)
    return array;
}


function distance_sort(array) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
            if (array[i].distance > array[i+1].distance) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    }
    while (swapped)
    return array;
}

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(success,error, options);
});


function click_circle() {
  $(".circle").on('click', function() {
      console.log("click circle fxn triggered")
      foursquare_call();
       var $this = $(this);
       $this.css('z-index', 2).removeClass('expanded').css('z-index', 1);
       $this.animate({
         left: 0,
         top: 0,
         margin: 0,
         width: '500px',
         height: '1000px',
         'border-radius': 0,
         padding: '5px 5px 5px 5px'
         }, 300).addClass('expanded');
         $this.css('z-index', -1);
         setTimeout(function() {
             window.location.href = "#results";
             $("body").css('background-color', '#006064 ');
         },350);
       $this.css('z-index', 0);
     });

// we think we need to move this to trigger on landing as well FOR selection
    $("#more-info").click(function () {
        console.log("#more-info button has been clicked");
        $("#result-div").addClass("flip-card");
    });
}
