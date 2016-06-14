<?php
session_start();
//start your session
//make sure to include your facebook credentials!
require_once('facebook_info.php');
//then you'll need to include the facebook sdk
require_once('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
//create a new facebook object
$fb = new Facebook\Facebook([
    'app_id'                => FACEBOOK_APP_ID,
    'app_secret'            => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
]);

//make a redirect helper handler

$helper = $fb->getRedirectLoginHelper();
//specify the permissions this app will need, putting them into an array
$permissions = ['email','user_posts'];
//generate the login url
$loginUrl = $helper->getLoginUrl(SERVER_LANDING, $permissions);
//echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
?>
<!doctype html>
<html ng-app="routeApp">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Food Decider</title>
  <!--Bootstrap CDN -->
  <script src ="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <!--jQuery CDN-->
  <!--Angular CDN with Angular routing CDN-->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <script src="http://code.angularjs.org/1.3.15/angular-route.js"></script>
  <!--Google Fonts-->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Pacifico">
  <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans">
  <!--Font Awesome CDN -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
  <!--Stylesheet-->
  <link rel="stylesheet" type="text/css" href="style.css">
  <!--Javascript-->
  <script src = "script.js"></script>
  <script src="test.js"></script>
  <script src="ang_routing.js"></script>
</head>
<body ng-controller="mainCtrl">
    <div id="display_contents">
        <div ng-view></div>

    </div>
</body>
</html>
