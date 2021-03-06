/**
 * Created by gkwon on 6/10/16.
 */
$(document).ready(function(){
   $("#more-info").click(function(){
       console.log("#more-info button has been clicked");
       $("#result-div").addClass("flip-card");
   })
});
$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success,error, options);
});

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
  url: "search.php",
  method: "POST",
  data: {
    latitude: crd.latitude,
    longitude: crd.longitude,
    radius: 100000,
    user_id: 555,
    search_option: {
      option: "random",
      category: "sushi"
    }
  },
  success: function (response){
  console.log(response.response);
  },
  error: function(response){
  console.log(response);
  }
  });
}

// function ajax(){
//    var consumer_secret = 'y1f4JyOmV0aIXTCOY-kACmHphO4';
//    var token_secret = 'WQgLs4FhHzxpjAhFHMkHsOFqj7s';
//    $.ajax({
//        method: 'get',
//        dataType: 'jsonp',
//        url: 'http://api.yelp.com/v2/search',
//        params: {
//            oauth_consumer_key: 't48KcyimnEPCmVK4r4KbRA',
//            oauth_token: '5YRqLRsdC5jyNVFCJW9EBZHzNtPJyEGl',
//            oauth_signature_method: 'HMAC-SHA1',
//            oauth_signature: 'WQgLs4FhHzxpjAhFHMkHsOFqj7s',
//            oauth_timestamp: new Date().getTime(),
//            oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
//            callback: "cb",
//            term: 'food',
//            location: 'Irvine'
//        },
//        cache: true,
//        jsonpCallback: "cb",
//        success: function(response){
//            console.log("AJAX call successful: ",response);
//        },
//        error: function(response){
//          console.warn(response);
//        }
//    });
// }
//
// function randomString(length, chars) {
//    var result = '';
//    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
//    return result;
// }
