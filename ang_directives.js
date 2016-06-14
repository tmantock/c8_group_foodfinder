app.directive('card', function(){
    return {
        restrict: 'E',
        scope: {
            restData: '=',
            index: '='
        },
        templateUrl: 'templates/cardTemplate.html'
    }
});