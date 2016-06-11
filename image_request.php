<?php
require_once("fs_lib/src/FoursquareApi.php");
require_once("credentials.php");
// Set client key and secret
$client_key = FOURSQUARE_CLIENT_ID;
$client_secret = FOURSQUARE_SECRET_ID;

$location_id = $_POST['location_id'];
//declare new foursquare class with client key and client secret
$foursquare = new FoursquareApi($client_key, $client_secret);
// Searching for images specidic to venue
$endpoint = "venues/".$location_id."/photos";
// Perform a request to a public resource
$response = $foursquare->GetPublic($endpoint);
// Returns a list of images for venue
// $POST defaults to false
$image = $foursquare->GetPublic($endpoint , $POST=false);
//print image object
print($image);
?>
