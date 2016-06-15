<?php
session_start();
//start your session
//make sure to include your facebook credentials!
require_once('credentials.php');
//then you'll need to include the facebook sdk
require_once('php_oauth_facebook/libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
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
    <!--Stylesheet-->
    <link rel="stylesheet" type="text/css" href="style.css">
    <!--Javascript-->
    <script src = "script.js"></script>
    <script src="test.js"></script>
    <script src="ang_routing.js"></script>
</head>

    <h1 id="lunch_heading" class="col-xs-12">What's For Lunch?</h1>
    <h3 class="landing-heading">Food Search That's Truly Simple</h3>
    <h4 class="landing-heading">Find The Best Local Cuisine - Effortlessly</h4>

    <div class="container">
         <?php $url = htmlspecialchars($loginUrl);
if(empty($_SESSION["name"])){

      echo "<button type='button' class='btn btn-lg' id='login-button' > <a  href='". $url ."'>Log in with Facebook!</a></button>";
}//if name is empty
else {
echo "<div id='welcome_user'>Welcome ".$_SESSION["name"]."</div>";
}//else to welcome the user
?>

        <div class="modal fade" id="login" role="dialog">
            <div class="modal-dialog">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h5 class="modal-title">Please Log in with Facebook</h5>
                    </div>
                    <div class="modal-body col-xs-12">
                        <form class="login-form col-xs-12">
                            <div class="col-xs-2 login-fields login-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
                            <input type="username" placeholder="Username" class="col-xs-10 login-fields">
                            <div class="col-xs-2 login-fields login-icon"><i class="fa fa-key" aria-hidden="true"></i></div>
                            <input type="password" placeholder="Password" class="col-xs-10 login-fields">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-xs-12 submit">Log In</div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Random Selection Button -->
    <div class="circle">
      <div id="random">Pick For Me!</div>
    </div>

