/**
 * Created by Qzxtzrtz on 6/8/2016.
 */

var searchParam;
var searchRadius;
var searchObject = {
    searchParam: 'stuff',
    currentLocation: {lat: null, long: null},//{lat: 33.630, long: -117.74},
    resultArray: [],
    type: "cafe",
    radius: '1000',
    maxNumber: null,
    score: 0
};

function getLocation() {
    searchObject.radius = searchRadius.val();
    searchObject.searchParam = searchParam.val();
    console.log("searchObject.radius",searchObject.radius, "searchObject.searchParam",searchObject.searchParam);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
        //console.log("hello from inside getLocation()");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function initMap(user_location) {
    var my_location = new google.maps.LatLng(user_location.coords.latitude, user_location.coords.longitude);
    searchObject.currentLocation.lat = user_location.coords.latitude;
    searchObject.currentLocation.long = user_location.coords.longitude;
    console.log("my_location: latitude = ", user_location.coords.latitude, "longitude = ", user_location.coords.longitude);
    var x = $("#location");
    x.empty();
    x.append(user_location.coords.latitude," ",user_location.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
        center: my_location,
        zoom: 10
    });

    //infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    console.log("searchObject.radius",searchObject.radius, "searchObject.searchParam",searchObject.searchParam, "searchObject", searchObject);

    service.nearbySearch({
        location: my_location,
        radius: searchObject.radius,
        type: searchObject.type,
        name: searchObject.searchParam
    }, callback);
    

//        service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log('callback ',results,status);
    searchObject.resultArray= results;
    console.log("result array: ",searchObject.resultArray);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

$(document).ready(function () {
    searchParam = $("#searchParam");
    searchRadius = $("#searchRadius");

    var OUR_KEY = 'AIzaSyAjB0z2sG-kIlF4cnQiLwF2q78SE1QjVKQ';
    var map;
    var service;
    var infowindow;

    getLocation();
    // $("#bt_submit").click(start_the_game);

});/////ready
