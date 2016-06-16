var current_location;
var options = {
    enableHighAccuracy: true,
    maximumAge: 0
};
var coordinates = {};
//function for acquiring the latitude and longitude on succesful geolocation call
function success (pos) {
    //set accessible variable to to the coordinates of the position object returned from the geolocation
    var crd = pos.coords;
    console.log("Latitude: " + crd.latitude);
    console.log("Longiude: " + crd.longitude);
    console.log("Within: " + crd.accuracy + "meters");
    //set the global variable coordinate's key/value pairs
    coordinates.latitude = crd.latitude;
    coordinates.longitude = crd.longitude;
    return crd;
}
//function for displaying the error in the console for an unsuccesful geolocation call
function error(err) {
    console.warn("Error(" + err.code + "):" + err.message);
}
//function for calling the php page which returns the modified foursquare data
function foursquare_call(options){
    $.ajax({
        dataType: "JSON",
        url: "search.php",
        method: "POST",
        data: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            radius: 100000,
            search_option: {
                option: options,
                category: null
            }
        },
        success: function (response){
          //call the fourSquareReturn function with the response as a parameter to grab key object values for later use
          fourSquareReturn(response.fourSquare_search_results, response.favorite_restaurants);
        },
        error: function(response){
            console.log(response);
        }
    })
}
//function for stripping the foursquare object and adding them to a more compact object for easier use later on
//this function also serves to validate data that may not be present in each object in the foursquare return
function fourSquareReturn(response,fav){
  //local variable declared for holding the truncated foursquare objects
  var restauraunts = [];
  //loop through each object in the response array of venues
  for(var x = 0; x < response.length; x++){
    //declare new fourSquareObj for key / value pairs to added to it
    var fourSquareObj = {};
    var fourSquareResponse = response[x];
    if (fourSquareResponse.venue.photos.count >= 1){
      //Get the value from each property in the FourSquare return object
      fourSquareObj.name = fourSquareResponse.venue.name;
      fourSquareObj.distance = fourSquareResponse.venue.location.distance;
      //Foursquare returns photos seperated by prefix and suffix. The defined height and width must be concatenated in betweet the two
      fourSquareObj.photo = fourSquareResponse.venue.photos.groups[0].items[0].prefix + "300x200"+ fourSquareResponse.venue.photos.groups[0].items[0].suffix;
      //conditional for determining if the object has the hours property for location times
      if(fourSquareResponse.venue.hasOwnProperty('hours')){
        fourSquareObj.hours = fourSquareResponse.venue.hours.status;
      }
      else{
        fourSquareObj.hours = "Time Unknown"
      }
      fourSquareObj.website = fourSquareResponse.venue.url;
      fourSquareObj.phone = fourSquareResponse.venue.contact.formattedPhone;
      fourSquareObj.venueid = fourSquareResponse.venue.id;
      fourSquareObj.street = fourSquareResponse.venue.location.address;
      fourSquareObj.city = fourSquareResponse.venue.location.city;
      fourSquareObj.state = fourSquareResponse.venue.location.state;
      fourSquareObj.zip = fourSquareResponse.venue.location.postalCode;
      fourSquareObj.lat = fourSquareResponse.venue.location.lat;
      fourSquareObj.lng = fourSquareResponse.venue.location.lng;
      //conditional for determining if the object has the price property for venue cost
		  if(fourSquareResponse.venue.hasOwnProperty('price')){
			  fourSquareObj.price = fourSquareResponse.venue.price.message;
			}
      else {
			  fourSquareObj.price = "not found";
			}
      fourSquareObj.rating = fourSquareResponse.venue.rating;
      fourSquareObj.tips = fourSquareResponse.tips[0].text;
      fourSquareObj.user_first_name = fourSquareResponse.tips[0].user.firstName;
      fourSquareObj.user_last_name = fourSquareResponse.tips[0].user.lastName;
      fourSquareObj.popularity = fourSquareResponse.reasons.items[0].summary;
      fourSquareObj.checkins = fourSquareResponse.venue.stats.checkinsCount;
      fourSquareObj.category_1 = fourSquareResponse.venue.categories[0].shortName;
      fourSquareObj.category_2 = fourSquareResponse.venue.categories[0].pluralName;
      //push the newly created object into an array for sorting later on
      restauraunts.push(fourSquareObj);
    }
  }//for loop
  //call distance_sort with the array as the parameter to sort all locations b distance
  console.log("restaurants array: ",restauraunts);
  distance_sort(restauraunts,fav);
}
//function for converting meters to miles
function convert_to_miles(meters) {
  //returns the value for metric conversion
    return (meters * 0.000621371192).toFixed(2);
}

function distance_sort(array,fav) {
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
    price_replacement(array,fav);
    return array;
}

function price_replacement(array,fav) {
    for (var i=0;i<array.length; i++){
        switch(array[i].price.toLocaleLowerCase()){
            case "cheap":
                array[i].price = "$";
                break;
            case "moderate":
                array[i].price = "$$";
                break;
            case "expensive":
                array[i].price = "$$$";
                break;
            case "very expensive":
                array[i].price = "$$$$";
                break;
            case "not found":
              array[i].price = "Not Found";
              break;
        }
    }///end of for loop
    price_sort(array,fav);
    return array;
}
function price_sort(array,fav) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
          if(array[i].price.message == "not found"){
            array.splice(array[i],1);
          }
          else{
            if (array[i].price.message < array[i+1].price.message) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
          }
        }
    }while (swapped)
    results_to_DOM(array,fav);
    return array;
}
//function for creating and appending elements to the dom for dynamic creation of display cards
function results_to_DOM (array,fav) {
    //an array of colors for changing the color of each card
    var color_array = ["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F","#006064"];
    //declare card_array for later use
    var card_array = [];
    //declare the the top_position value for setting the top key / value of the position object for each card
    var top_position = 0;
    //declare the z-index variable for adding the desired z-index to each card for making the cards appear as if they are stacked
    var z_index = 10;
    //find the height of the window/body
    var window_height = $('body').height();
    //loop through the appending and creation 10 times
    array = final_array(array,fav);
    for(var i = 0; i<10; i++){
      //creation of the various elements necessary for each card and adding the information from foursquare object array that has been sorted
      //div element changes it color per each iteration by iterating throught the color array and adding that specific color
      var div = $("<div>").addClass("result-card").css("background",color_array[i]);
      var img = $("<div>").addClass("result-image").css({
        background: "url(" + array[i].photo + ")",
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center center'
      });
      var addressDiv = $("<div>").addClass("address-text-holder container-fluid");
      /** ADDRESS CONTAINER**/
      var name = $("<h3>").text(array[i].name);
      var street = $('<p>').text(array[i].street);
      var city_state_zip = $('<p>').text(array[i].city + ", " + array[i].state + " " + array[i].zip);
      var phone = $('<p>').text(array[i].phone);
      /** RATING **/
      var rating_container = $('<div>').addClass("info-container col-xs-4");
      var i_rating = $("<i>").addClass("fa fa-star");
      var rating = $("<p>").text(array[i].rating);
      /** DISTANCE **/
      var distance_container = $('<div>').addClass("info-container col-xs-4");
      var i_distance = $("<i>").addClass("fa fa-car");
      var distance = $("<p>").text(convert_to_miles(array[i].distance) + " mi.");
      /** PRICING **/
      var price_container = $("<div>").addClass("info-container col-xs-4");
      var i_price = $("<i>").addClass("fa fa-usd");
      var price = $("<p>").text(array[i].price);
      /** HOURS **/
      var i_hours_container = $('<div>').addClass("info-container col-xs-3");
      var i_hours = $("<i>").addClass("fa fa-clock-o");
      var i_hours_tag = $("<p>").text("Open?");
      var hours_container = $('<div>').addClass("info-container col-xs-9");
      var hours = $("<p>").text(array[i].hours).addClass("info-content");
      /** URL **/
      var i_url_container = $('<div>').addClass("info-container col-xs-3");
      var i_url = $("<i>").addClass("fa fa-globe");
      var i_url_tag = $("<p>").text("Web");
      var url_container = $('<div>').addClass("info-container col-xs-9");
      var url = $("<a>").text(array[i].website).addClass("info-content");
      // var url = $("<a>").attr("href", "array[i].website").addClass("info-content");
      /** POPULARITY **/
      var i_popularity_container = $('<div>').addClass("info-container col-xs-3");
      var i_popularity = $("<i>").addClass("fa fa-foursquare");
      var i_popularity_tag = $("<p>").text("Popularity");
      var popularity_container = $('<div>').addClass("info-container col-xs-9");
      var popularity = $("<p>").text(array[i].popularity + ". " + array[i].checkins + " Foursquare user" +" check-ins and counting!").addClass("info-content");
      /** TIPS **/
      var i_tips_container = $('<div>').addClass("info-container col-xs-3");
      var i_tips = $("<i>").addClass("fa fa-thumbs-o-up");
      var i_tips_tag = $("<p>").text("Tip");
      var tips_container = $('<div>').addClass("info-container col-xs-9");
      var tips = $("<p>").text("'" + array[i].tips + "'" + " - " + array[i].user_first_name + " " + array[i].user_last_name).addClass("info-content");
      /** CATEGORIES **/
      var i_category_container = $('<div>').addClass("info-container col-xs-3");
      var i_category = $("<i>").addClass("fa fa-tags");
      var i_category_tag= $("<p>").text("Category");
      var category_container = $('<div>').addClass("info-container col-xs-9");
      var category = $("<p>").text(array[i].category_1 + ", " + array[i].category_2).addClass("info-content");
      // /** ETA **/
      // var eta_container = $("<div>").addClass("col-xs-3 info-container");
      // var i_eta = $("<i>").addClass("fa fa-clock-o");
      // var eta = $("<p>");
      /** MORE INFO **/
      var moreInfoDiv = $("<div>").addClass("more-info-holder container-fluid");
      var btn_div = $("<div>").addClass("button-holder");
      var i_left = $("<i>").addClass("fa fa-arrow-left");
      var i_right = $("<i>").addClass("fa fa-arrow-right");
      var prev_div = $("<div>").addClass("col-xs-4 result-button");
      var next_div = $("<div>").addClass("col-xs-4 result-button");
      var nav_div = $("<div>").addClass("col-xs-4 result-button");
      var nav_text = $("<p>").text("Go!");
      var next_btn = $("<div>").addClass("next-button").attr("data-position",i);
      var prev_btn = $("<div>").addClass("prev-button").attr("data-position",i);
      var nav_button = $("<div>").addClass("navigation-button");
      //closure for the next button to call the next_card function for moving to the next card
      next_btn.on("click", function (){
        next_card(this , 1);
      });
      //closure for the prev button to call the prev_card function for moving back to the previous card
      prev_btn.on("click", function (){
        prev_card(this , 1);
      });
      //closure for making the navigation button link to the maps application
      nav_button.on("click", function(){
        window.location.href = "#selection"
      });
      //appending various elements to their parent elements
      i_hours_container.append(i_hours, i_hours_tag);
      hours_container.append(hours);
      i_url_container.append(i_url, i_url_tag);
      url_container.append(url);
      i_tips_container.append(i_tips, i_tips_tag);
      tips_container.append(tips);
      i_popularity_container.append(i_popularity, i_popularity_tag);
      popularity_container.append(popularity);
      i_category_container.append(i_category, i_category_tag);
      category_container.append(category);
      // eta_container.append(i_eta, eta);
      distance_container.append(i_distance, distance);
      rating_container.append(i_rating, rating);
      price_container.append(i_price, price);
      prev_btn.append(i_left);
      next_btn.append(i_right);
      nav_button.append(nav_text);
      prev_div.append(prev_btn);
      next_div.append(next_btn);
      nav_div.append(nav_button);
      btn_div.append(prev_div,nav_div,next_div);
      addressDiv.append(street, city_state_zip, phone);
      moreInfoDiv.append(rating_container, distance_container, price_container, i_hours_container, hours_container, i_category_container, category_container, i_tips_container, tips_container, i_popularity_container, popularity_container, i_url_container, url_container);
      //appending all elements to the card
      div.append (name, img, addressDiv, moreInfoDiv, btn_div);
      //appending the card to the results-page on the DOM with a unique id
      $("#results-page").append(div.attr("id","card" + i).css({
        //the top position is set for each card so that each card is slightly lower than the previous.
        //The cards start off below the viewable area by adding the window_height to the top position value, so they can slide up later for the page transition
        top: 70 + top_position + window_height + "px",
        //the z-index is set for each card is set beginning at 10, so the the top most card will display on top of the other cards and so on for the subsequent cards
        'z-index': "+"+z_index
      }));
      //top_position is incrementend to lower each card
      top_position += 15;
      //z_index is decremented so later cards to not show above cards that were created first
      z_index -= 1;
      //the unique id for each card is pushed to an array for later use
      card_array.push("card"+i);
    }
  //stack_up function is called withe card_array and calculated window_height as parameters, so the cards can move from outside of the viewable area into viewable area in a cascading manner
  stack_up(card_array,window_height);
}
//function for moving cards up from out of the viewable window to into the viewable window takes in the card_array nad window height as parameters
function stack_up (array, height) {
  //delay value is defined so cards move to the top in a cascading manner
  var delay = 500;
  //for loop for iterating through the card_array
  for(var i=0; i<array.length; i++){
    //variable set to the jQuery selector for the card
    var target_card = $("#" + array[i]);
    //current_position set to the current top position of the card. This will return the px value of the top position
    var current_position = target_card.position().top;
    //The targeted card is delayed before it animates to the viewable window
    //The card animates by setting the top px value of the window's height less the current position of the card multiplied by -1
    //The speed for the animation is set to 500 miliseconds
    target_card.delay(delay).animate({top: (height - current_position) * -1 + "px"},500);
    //delay is incremented for a cascading effect
    delay+=300;
  }
}
//function for moving the card in view to outside of the viewable window
function next_card (element , direction) {
  //The current index of cards is found via an attribute that was appended to the button during it's creation
  var card = $(element).attr("data-position");
  //Conditional for determing if there are no more cards in the stack
  if (parseInt(card) !== 9){
    //Parent is set to the id value of the button's parent card
    var parent = $("#card"+card);
    //current_position is set to the current position of the parent's top px value
    var current_position = parent.position().top;
    //next_child_position is set to the px value of the next card in the stack
    //variable currently unused. Plan to be used for optimizations later on.
    var next_child_position = $("#card" + (parseInt(card) + 1)).position().top;
    //distance is set to 0. This will be distance each card must move up in the stack when one card is moved
    var distance = 0;
    //current_width is set to the parent card's width px value
    var current_width = parent.width();
    //parent card animates of the screen by taking its width value and multiplying it by 2 with an animation speed pf 300 miliseconds
    parent.animate({left: current_width * 2 + "px"},400, function(){
      parent.hide();
    });
    //card is then incremented
    card = parseInt(card) + 1;
    //lenght is set to ten for the amount of cards in the stack
    var length = 10;
    //for loop for iterating throught each card in the stack
    for(var i = card; i<=length; i++){
      //child is set to the card
      var child = $("#card" + i);
      //the card will animate from its current position + the distance at a speed of 500 miliseconds
      child.animate({top: (current_position + distance) + "px"},500);
      //distnace is incremented so each card moves further up the stack
      distance += 25;
    }
  }
  //if the stack is equal to 9, then exit the function
  else {
    return;
  }
}
//function for moving the card back into the viewable window
function prev_card (element , direction) {
  //The current index of cards is found via an attribute that was appended to the button during it's creation
    var card = $(element).attr("data-position");
    //condition for determing if the top of the stack has been reached
    if (parseInt(card) !== 0){
      //Conditional for determing if there are no more cards in the stack
      var parent = $("#card"+card);
      //prev_child_position is set to the jQuery selector for the previous card in the stack
      var prev_card = $("#card" + (parseInt(card) - 1));
      //card_width is set to the prev_card's width
      var card_width = prev_card.width();
      //current_position is set to the position of the of current card in view(parent of the button)
      //This will return the position object of the card which contains the top and left key / value pairs
      var current_position = parent.position();
      //distance is set to 25. This is the distance each card will have to move down the stack
      var distance = 25;
      //prev_card animates to the current card in view's left position value plus the card out view's width (this is divided by two to overcome the transform translate CSS property for each card).
      prev_card.show().animate({left: current_position.left + (card_width/2) + "px"},400);
      //card is set to the number value of the button's data-position value
      card = parseInt(card);
      //length is set to the number of cards in the stack
      var length = 10;
      //for loop to iterate through the stack of cards
      for(var i = card; i<=length; i++){
        //child is set to the jQuery selector of the card
        var child = $("#card" + i);
        //the child animates down the the stack by taking the top px value of the card in view's position plus the distance
        child.animate({top: (current_position.top) + distance + "px"},500);
        //distance is incremented so each subsequent card moves further down the stack
        distance += 25;
      }
    }
    //if the current card is 0 then it has the reached the top of the stack and exits the function
    else {
      return;
    }
}

function click_circle() {
  $('.circle').on('click', function() {
    foursquare_call("random");
    var $this = $(this);
    $this.css('z-index', 2).removeClass('expanded').css('z-index', 1);
    $this.animate(
 



     {expansion: 10 },
      {
        step: function(now,fx) {
          $(this).css('-webkit-transform','scale('+now+')');
        },
        complete:function() {
    window.location.href = "#results";
    $("body").css('background-color', '#ffaa00 ');
  }
  }, 300).addClass('expanded');
  });
}//end click_cirlcle

function final_array(array,fav) {
    var found_favorite_restautant  = [];
    for(var f=0; f<fav.length;f++){
        for (var j=0; j<array.length;j++){
            if(fav[f].selected_restaurant == array[j].name){
                found_favorite_restautant.push(array.splice(j,1));
		//console.log("found a match",j);
            }///if
        }//for j
    }//for fav
    array = array.splice(0,(array.length/2)+5);
    array = shuffle(array);   
    array = array.splice(0,10-(found_favorite_restautant.length-1));
    console.log("fav: ",found_favorite_restautant );
    for(var k=0; k<found_favorite_restautant.length ; k++){ 
    array.unshift(found_favorite_restautant[k][0]);
     }
    //console.log("array of 10 before shuffle",array);
    array = shuffle(array);
    //console.log("result inside last arrange: ",array);
    //console.log("favorite res: ",fav);
    return array;
}///fiinal array
function shuffle (array) {
    //i set a number (0)
    var i = 0;
    //j set to a number (0)
    var j = 0;
    //temp set to null
    var temp = null;
    //loops through the array starting at its last index and decrements down until it reaches the lfirst index
    for (i = array.length - 1; i > 0; i -= 1) {
        //j set to a random number
        j = Math.floor(Math.random() * (i + 1));
        //temp set to an index in the array
        temp = array[i];
        //index of the array is set to another index in the array
        array[i] = array[j];
        //index of the array is set the temp value (null)
        array[j] = temp;
    }
    //array is returned
    return array;
}

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(success,error, options);

    $("#more-info").click(function () {
        console.log("#more-info button has been clicked");
        $("#result-div").addClass("flip-card");
    });
});
