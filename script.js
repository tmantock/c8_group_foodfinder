/********************* FOURSQUARE AJAX CALLS     *******************************/

var current_location;
var restauraunts = [];
var firstRest = restauraunts[0];
// var color_array = ["#00AAFF", "#009EF5", "#0095EB", "#008BE1", "#0083D7", "#0079CD", "#0070C3", "#0066B9", "#005DAF", "#0053A5","#004E9B"];
var color_array = ["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F","#006064"];
var options = {
    enableHighAccuracy: true,
    maximumAge: 0
};
var coordinates = {};

function success (pos) {
    var crd = pos.coords;
    console.log("Latitude: " + crd.latitude);
    console.log("Longiude: " + crd.longitude);
    console.log("Within: " + crd.accuracy + "meters");
    coordinates.latitude = crd.latitude;
    coordinates.longitude = crd.longitude;
    return crd;
}

function error(err) {
    console.warn("Error(" + err.code + "):" + err.message);
}

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
            console.log(response.fourSquare_search_results);
            fourSquareReturn(response.fourSquare_search_results);
        },
        error: function(response){
            console.log(response);
        }
    })
}

function fourSquareReturn(response){
    for(var x = 0; x < response.length; x++){
        var fourSquareObj = {};
        var fourSquareResponse = response[x];
        if (fourSquareResponse.venue.photos.count >= 1){
            fourSquareObj.name = fourSquareResponse.venue.name;
            fourSquareObj.distance = fourSquareResponse.venue.location.distance;
            fourSquareObj.photo = fourSquareResponse.venue.photos.groups[0].items[0].prefix + "300x200"+ fourSquareResponse.venue.photos.groups[0].items[0].suffix;
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
		          if(fourSquareResponse.venue.hasOwnProperty('price')){
			          fourSquareObj.price = fourSquareResponse.venue.price.message;
			        }
              else {
				        fourSquareObj.price = "not found";
				      }
            //fourSquareObj.price = response.response.groups[0].items[x].venue.price.message;
            fourSquareObj.rating = fourSquareResponse.venue.rating;
            fourSquareObj.tips = fourSquareResponse.tips[0].text;
            fourSquareObj.user_first_name = fourSquareResponse.tips[0].user.firstName;
            fourSquareObj.user_last_name = fourSquareResponse.tips[0].user.lastName;
            fourSquareObj.popularity = fourSquareResponse.reasons.items[0].summary;
            fourSquareObj.checkins = fourSquareResponse.venue.stats.checkinsCount;
            fourSquareObj.category_1 = fourSquareResponse.venue.categories[0].shortName;
            fourSquareObj.category_2 = fourSquareResponse.venue.categories[0].pluralName;
            restauraunts.push(fourSquareObj);
        }
    }//for loop
    distance_sort(restauraunts);
    console.log("fourSquareReturn",restauraunts);
}

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
        var popularity = $("<p>").text(array[i].popularity + ". " + array[i].checkins + " Foursquare user" +
            " check-ins and counting!").addClass("info-content");
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

        next_btn.on("click", function (){
            next_card(this , 1);
        });

        prev_btn.on("click", function (){
            prev_card(this , 1);
        });

        nav_button.on("click", function(){
            window.location.href = "#selection"
        });


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

        div.append (name, img, addressDiv, moreInfoDiv, btn_div);
        $("#results-page").append(div.attr("id","card" + i).css({
            top: 70 + top_position + window_height + "px",
            'z-index': "+"+z_index
        }));
        top_position += 15;
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
    price_replacement(array);
    return array;
}

function price_replacement(array) {
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
    price_sort(array);
    return array;
}
function price_sort(array) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
          if(array[i].price.message == "not found"){
            array.splice(array[i],1);
          }
          else{
            if (array[i].price.message > array[i+1].price.message) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
          }
        }
    }while (swapped)
    results_to_DOM(array);
    return array;
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

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(success,error, options);

    $("#more-info").click(function () {
        console.log("#more-info button has been clicked");
        $("#result-div").addClass("flip-card");
    });
});
/**
 * Created by Qzxtzrtz on 6/15/2016.
 */
