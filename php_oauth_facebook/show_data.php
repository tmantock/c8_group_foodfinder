<?php
/* session, connect data, yada yada*/
session_start();
require_once('../credentials.php');
require_once('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
$fb = new Facebook\Facebook([
    'app_id'                => FACEBOOK_APP_ID,
    'app_secret'            => FACEBOOK_SECRET,
    'default_graph_version' => 'v2.6',
]);
//set the default access token from the session
$fb -> setDefaultAccessToken($_SESSION['fb_access_token']);
//make our data request to facebook
$res = $fb->get('me?fields=id,name,birthday,context,about,age_range');
//get the graph object for later use

//or decode it into an associative array for later use
$nodeData=$res->getDecodedBody();
//then iterate through the data and do with it what you will!
echo '<h3>Data recieved</h3>';

var_dump($nodeData);
//print_r($nodeData);
//print("<br>");
$_SESSION['fb_id'] = $nodeData['id'];
$name=$nodeData['name']; echo"$name";
$id = $nodeData['id']; echo"$id";
$age_range = $nodeData['age_range']['min'];


$query = "SELECT * FROM `users` WHERE `fb_id` = '$id'";
    $result = mysqli_query($conn, $query);
    print("<br>"."result before if statement");
    print_r($result);
    print(mysqli_num_rows($result));
    if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)) {
        //echo "printing row require once";
        print("<br> User already exists");
	print_r($row);
    }//while
    }//if

	else {
	$query2 = "INSERT INTO `users` (`name`,`fb_id`,`fb_login`,`age`) VALUES ('$name','$id','true','$age_range')";

	$result2 = mysqli_query($conn, $query2);
	echo "in the else, new user row = ";
        print_r($result2);
    	print(mysqli_num_rows($result2)); 
	}//else



//print_r($_SESSION);
?>
