app.controller('mainCtrl', function ($scope) {
    $scope.message = ("Hellow from main Crtl");
});
app.controller('landingCtrl', function ($scope) {
    // $scope.message = ("Hellow from landing Crtl");
});

app.controller('resultsCtrl', function ($scope, $log, geoLoc, fourSquare) {
    resSelf = this;
    $scope.restData = [];


    function getLoc() {
        geoLoc.getCurrentPosition().then(
            function (loc) {
                fourSquare.foursquare_call(loc).then(
                    function (resp) {
                        $scope.restData = resp;
                        $log.info("Data from FourSquare loaded");
                    },
                    function (err) {
                        $log.error('Error from fourSquare call', err);
                    }
                );
            },
            function (err) {
                resSelf.userLoc = 'Location failed to load';
                $log.error('Location error:', err);
            }
        )
    }

    getLoc();
});

app.controller('selectionCtrl', function ($scope) {
    // $scope.message = ("Hellow from selection Crtl");
    // $scope.message = ("Hellow from selection Crtl");
});