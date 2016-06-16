var from;
var to;

var addressFromDB = "9080 Irvine Center Drive, CA";

var userAgent;
function userAgent() {
    userAgent = "User-agent header sent: " + navigator.userAgent;
    console.log("user-agent = ", userAgent);
}
function calculateRoute(from, to) {
    // Center initialized to fixed location - D.C
    var to = addressFromDB;
    var locationOptions = {
        zoom: 10,
        center: new google.maps.LatLng(38.89, -77.03),  //WA DC
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Draw the map to DOM
    var mapObject = new google.maps.Map(document.getElementById("map"), locationOptions);
    //Create an instance of directionsService and directionsRequest object,
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    from = directionsRequest.origin;
    console.log("directionsRequest.origin = from = ", from);
    to = directionsRequest.destination;
    console.log("directionsRequest.destination = to = ",to);
    //use the route method of directionsService to run the request
    directionsService.route(
        directionsRequest,
        function(response, status)
        {
            if (status == google.maps.DirectionsStatus.OK)
            {
                new google.maps.DirectionsRenderer({
                    map: mapObject,
                    directions: response
                });
            }
            else
                $("#error").append("There is no help for where you are, give it up<br />");
        }
    );
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [from],
            destinations: [to],
            travelMode: google.maps.TravelMode.DRIVING,
            //transitOptions: TransitOptions,
            //drivingOptions: DrivingOptions,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: true
        }, callback);

    function callback(response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.text;
                    var duration = element.duration.text;
                    var from = origins[i];
                    var to = destinations[j];
                    console.log("element.duration.text", duration);
                    $("#error").append("ETA: " + "element.duration.text" + duration + "<br />");
                }
            }
        }
    }

}//calculate route()

$(document).ready(function() {

    $("#from-here").click(function(event) {
        event.preventDefault();
        var addressId = this.id.substring(0, this.id.indexOf("-"));
                console.log("addressID = ", addressId);

        //get current position:
        navigator.geolocation.getCurrentPosition(function(position) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                        "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    },
                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK)
                            $("#" + addressId).val(results[0].formatted_address);
                        else
                            $("#error").append("Unable to retrieve your address<br />");
                        console.log("$(addressId).val(results[0] = ",$("#" + addressId).val(results[0]));
                    });

            },
            function(positionError){
                $("#error").append("Error: " + positionError.message + "<br />");
            },
            {
                enableHighAccuracy: true,
                timeout: 2 * 1000
            });
    });



    $("#calculate-route").submit(function(event) {
        event.preventDefault();
        calculateRoute($("#from").val(), $("#to").val());
    });
    // If the browser does not support Geolocation
    if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Your browser's Geolocation support is screwing up everythang");
    }
    userAgent();
});