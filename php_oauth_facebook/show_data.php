<?php
/* session, connect data, yada yada*/
session_start();
require_once ('../credentials.php');
require_once ('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
$fb = new Facebook\Facebook([
    'app_id'                => FACEBOOK_APP_ID,
    'app_secret'            => FACEBOOK_SECRET,
    'default_graph_version' => 'v2.6',
]);
//set the default access token from the session
$fb -> setDefaultAccessToken($_SESSION['fb_access_token']);
//make our data request to facebook
$res = $fb->get('me?fields=id,name,birthday,context,about');
//get the graph object for later use

//or decode it into an associative array for later use
$nodeData=$res->getDecodedBody();
//then iterate through the data and do with it what you will!
echo '<h3>Data recieved</h3>';
var_dump($nodeData);

?>