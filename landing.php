<?php
session_start();
//start your session
//make sure to include your facebook credentials!
require_once('credentials.php');
//then you'll need to include the facebook sdk
//require_once('php_oauth_facebook/libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');

require_once('library/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
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

    <h1 id="lunch_heading" class="col-xs-12">What's For Lunch?</h1>
    <h3 class="landing-heading">Food Search That's Truly Simple</h3>
    <h4 class="landing-heading">Find The Best Local Cuisine - Effortlessly</h4>

    <div class="container landing-container">
         <?php $url = htmlspecialchars($loginUrl);
if(empty($_SESSION["name"])){

      echo "<button type='button' class='btn btn-lg' id='login-button' > <i 
class='fa fa-facebook-official fa-lg facebook-icon' aria-hidden='true'></i>
<a  href='". $url ."'  class='login-link'>   Log in with Facebook </a></button>";
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
