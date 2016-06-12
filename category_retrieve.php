<?php
require_once("fs_lib/src/FoursquareApi.php");
require_once("credentials.php");
// Set client key and secret
$client_key = FOURSQUARE_CLIENT_ID;
$client_secret = FOURSQUARE_SECRET_ID;
//declare new foursquare class with client key and client secret
$foursquare = new FoursquareApi($client_key, $client_secret);
// Searching for images specidic to venue
$endpoint = "venues/categories";
// Perform a request to a public resource
$response = $foursquare->GetPublic($endpoint);
// Returns a list of images for venue
// $POST defaults to false
$fs_categories = $foursquare->GetPublic($endpoint , $POST=false);
//decode category object
$fs_categories = json_decode($fs_categories,true);

$fs_categories = $fs_categories['response']['categories'][3]['categories'];
foreach($fs_categories as $key=>$value){
?>
<pre>
<?php print($value['name']); ?>
</pre>
<?php
}
?>
