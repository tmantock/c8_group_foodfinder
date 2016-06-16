var app = angular.module("routeApp", ['ngRoute']);

app.config(function($routeProvider){
   $routeProvider
       .when('/', {
           templateUrl: 'landing.php',
           controller: 'landingCtrl'
       })
       .when('/index',{
           templateUrl: 'landing.php',
           controller: 'landingCtrl'
       })
       .when('/results', {
           templateUrl: 'results.html',
           controller: 'resultsCtrl'
       })
       .when('/selection', {
           templateUrl: 'selection.html',
           controller: 'selectionCtrl'
       })
       .otherwise({
           redirectTo: '/'
       });
});

app.controller('mainCtrl', function($scope){
 $scope.message = ("Hellow from main Crtl");
});
app.controller('landingCtrl', function($scope){
   // $scope.message = ("Hellow from landing Crtl");
   click_circle();
});

app.controller('resultsCtrl', function($scope){
   // $("#image-holder").append(restauraunts.firstRest.photo);
   $scope.message = "Hellow from results Crtl";
   // $scope.message = firstRest.photo;
});

app.controller('selectionCtrl', function($scope){
   // $scope.message = ("Hellow from selection Crtl");
   // $scope.message = ("Hellow from selection Crtl");
});

function click_circle() {

$('.circle').on('click', function() {
  foursquare_call();
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
