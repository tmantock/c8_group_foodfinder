<?php
/* session, connect data, yada yada*/
session_start();
require_once ('facebook_info.php');
require_once ('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
$fb = new Facebook\Facebook([
    'app_id'                => FACEBOOK_APP_ID,
    'app_secret'            => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
]);
//set the default access token from the session
echo '<h5>access token: </h5>';
print_r($_SESSION['fb_access_token']);
$fb -> setDefaultAccessToken($_SESSION['fb_access_token']);
//make our data request to facebook
$res = $fb->get('me?fields=id,name');
//get the graph object for later use

//or decode it into an associative array for later use
$nodeData=$res->getDecodedBody();
//then iterate through the data and do with it what you will!
echo '<h3>Data recieved</h3>';
var_dump($nodeData);
