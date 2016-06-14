var app = angular.module("routeApp", ['ngRoute']);

app.config(function($routeProvider, fourSquareProvider){
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
            controller: 'resultsCtrl',
            controllerAs: 'rc'
        })
        .when('/selection', {
            templateUrl: 'selection.html',
            controller: 'selectionCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});