var app = angular.module("routeApp", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'landing.html',
            controller: 'landingCtrl'
        })
        .when('/index',{
            templateUrl: 'landing.html',
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
 // $scope.message = ("Hellow from main Crtl");
  $scope.message = ("Hellow from main Crtl");
});
app.controller('landingCtrl', function($scope){
    // $scope.message = ("Hellow from landing Crtl");
});
app.controller('resultsCtrl', function($scope){
  // $scope.message = "Hellow from results Crtl";
  // $("#image-holder").append(restauraunts.firstRest.photo);
  $scope.message = "Hellow from results Crtl";
  // $scope.message = firstRest.photo;
});

app.controller('selectionCtrl', function($scope){
  // $scope.message = ("Hellow from selection Crtl");
  // $scope.message = ("Hellow from selection Crtl");
});
