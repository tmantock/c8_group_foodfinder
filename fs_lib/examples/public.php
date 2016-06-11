<?php
	require_once("../src/FoursquareApi.php");
	// Set your client key and secret
	$client_key = "BJ55LPF34FXTMHV4VOW0L0VMAUV4MYG2VK3JC33ELWU2KOXZ";
	$client_secret = "KNMJ3JKCNBI4AUWZNHPLZBQZSMEQTURPQW0EGS4AKOO2TM3X";

	$foursquare = new FoursquareApi($client_key, $client_secret);

	// Searching for venues nearby Montreal, Quebec
	$endpoint = "venues/explore";

	// Prepare parameters
	$params = array(
		"ll"=> "33.6363035,-117.73951749999999",
		"intent"=>"browse",
		"radius"=>100000,
		"query"=>"bbq"
	);

	// Perform a request to a public resource
	$response = $foursquare->GetPublic($endpoint,$params);

	// Returns a list of Venues
	// $POST defaults to false
	$venues = $foursquare->GetPublic($endpoint , $params, $POST=false);
	?>
	<pre>
		<?= print_r($venues);?>
	</pre>

	<?php

	?>
