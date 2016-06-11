<?php
require_once("fs_lib/src/FoursquareApi.php");
require_once("credentials.php");
// Set client key and secret
$client_key = FOURSQUARE_CLIENT_ID;
$client_secret = FOURSQUARE_SECRET_ID;

$location_id = "4a6f6c91f964a52023d61fe3";
//declare new foursquare class with client key and client secret
$foursquare = new FoursquareApi($client_key, $client_secret);
// Searching for tips specific to location
$endpoint = "venues/".$location_id."/tips";
// Perform a request to a public resource
$response = $foursquare->GetPublic($endpoint);
// Returns a list of tips
// $POST defaults to false
$tips = $foursquare->GetPublic($endpoint , $POST=false);
//print tips object
print($tips);
?>
