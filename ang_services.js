app.factory('geoLoc', function ($q, $window) {
    function getCurrentPosition() {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };

        var defer = $q.defer();

        if (!$window.navigator.geolocation) {
            defer.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    defer.resolve(position);
                },
                function (err) {
                    defer.reject(err);
                }, options);
        }

        return defer.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
});


app.service('fourSquare', function ($http, $q) {

    fsSelf = this;

    fsSelf.foursquare_call = function(crd) {
        var defer = $q.defer();
        var output = [];
        $http({
            dataType: "JSON",
            url: "https://api.foursquare.com/v2/venues/explore?client_id= BJ55LPF34FXTMHV4VOW0L0VMAUV4MYG2VK3JC33ELWU2KOXZ&client_secret= KNMJ3JKCNBI4AUWZNHPLZBQZSMEQTURPQW0EGS4AKOO2TM3X&v=20130815&ll=33.64,-117.74&venuePhotos=1&query=bbq",
            method: "GET",
            data: {
                latitude: crd.coords.latitude,
                longitude: crd.coords.longitude,
                radius: 100000,
                user_id: 555,
                search_option: {
                    option: "random",
                    category: "sushi"
                }
            }
        }).then(function (response) {
                defer.resolve(fourSquareReturn(response.data));
            },
            function (err) {
                console.log(err);
                defer.reject(err);
            }
        );
        return defer.promise;
    };

    function fourSquareReturn(response) {
        var fourSquareResponse = response.response.groups[0].items;
        var restaurants = [];
        for (var x = 0; x < fourSquareResponse.length; x++) {
            var fourSquareObj = {};
            if (response.response.groups[0].items[x].venue.photos.count >= 1) {
                var restInfo = fourSquareResponse[x];
                fourSquareObj.name = restInfo.venue.name;
                fourSquareObj.distance = restInfo.venue.location.distance;
                fourSquareObj.photo = restInfo.venue.photos.groups[0].items[0].prefix + "300x200" + restInfo.venue.photos.groups[0].items[0].suffix;
                fourSquareObj.hours = restInfo.venue.hours;
                fourSquareObj.website = restInfo.venue.url;
                fourSquareObj.phone = restInfo.venue.contact.formattedPhone;
                fourSquareObj.venueid = restInfo.venue.id;
                fourSquareObj.street = restInfo.venue.location.address;
                fourSquareObj.city = restInfo.venue.location.city;
                fourSquareObj.state = restInfo.venue.location.state;
                fourSquareObj.zip = restInfo.venue.location.postalCode;
                fourSquareObj.lat = restInfo.venue.location.lat;
                fourSquareObj.lng = restInfo.venue.location.lng;
                fourSquareObj.price = restInfo.venue.price.message || 'unknown';
                fourSquareObj.rating = restInfo.venue.rating;
                restaurants.push(fourSquareObj);
            }
        }//for loop

        return restaurants;
    }
});