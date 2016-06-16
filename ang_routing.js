//angular.module is declared and 'ngRoute' dependency is included
var app = angular.module("routeApp", ['ngRoute']);

//route is configured below $routeProvider is passed in as a parameter and then used to set the conditions of each
// location or route.
app.config(function($routeProvider){
   $routeProvider
       //first parameter when() is whwat will be looked for after the # in the URL
       .when('/', {
           //templateUrl gives the location of the file to load
           templateUrl: 'landing.php',
           //controller defines the controller to be loaded iwth the template
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
       //otherwise() allows you to define a default route
       .otherwise({
           redirectTo: '/'
       });
});

//controllers for each respective page to be routed to are created below
app.controller('mainCtrl', function($scope){
});
app.controller('landingCtrl', function($scope){
   click_circle();
});

app.controller('resultsCtrl', function($scope){
});

app.controller('selectionCtrl', function($scope){
});
