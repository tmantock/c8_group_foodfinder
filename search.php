<?php
session_start();
 require_once("fs_lib/src/FoursquareApi.php");
 require_once("credentials.php");

if (empty($_SESSION["id"])) {
   $insert_query = "INSERT INTO `users` (`fb_login`) VALUES ('false')";
   $resultOfInsert = mysqli_query($conn, $insert_query);
   $guest_id = mysqli_insert_id($conn);
   $_SESSION["id"] = $guest_id;
}
$_POST['search_option']['option'] = 'random';
$_POST['search_option']['category'] = 'sushi';
$_POST["latitude"] = 33.532029;
$_POST["longitude"] = -117.702148;
$_POST['radius'] = '5000';
$_SESSION['id'] = '484';
$search_radius = $_POST['radius'];
$id = $_SESSION['id'];
////   Set client key and secret
	$client_key = FOURSQUARE_CLIENT_ID;
	$client_secret = FOURSQUARE_SECRET_ID;
////  declare new foursquare class with client key and client secret
	$foursquare = new FoursquareApi($client_key, $client_secret);
////	 Searching for venues nearby
	$endpoint = "venues/explore";
////  Conditionals for determining choice
   $params = [

       "ll"=> $_POST['latitude'].",".$_POST['longitude'],
       "intent"=>"browse",
       "radius"=>$search_radius,
       "venuePhotos"=>1
   ];
/////////random search
   if (isset($_POST['search_option']['option']) && $_POST['search_option']['option'] == 'random'){
	$params["query"]="food";
   }
   else {
	$params["query"]= $_POST['search_option']['category'];
   }
   $response = $foursquare->GetPublic($endpoint , $params);
   $venues = $foursquare->GetPublic($endpoint , $params, $POST=false);
   $testme = json_decode( $venues);
   $venues = $testme -> response -> groups[0]->items;

        //send query to db to find user selected restaurant to compare with  4squre results
   $fave_rest = [];
   $optimizeQuery = "SELECT `selected_restaurant`, count(id) AS 'visited_count' FROM `user_interaction` WHERE `unique_assigned_id` = '$id' GROUP BY `selected_restaurant` ORDER BY `visited_count` DESC";

   $favoriteRestaurant = mysqli_query($conn, $optimizeQuery);
   if(mysqli_num_rows($favoriteRestaurant)>0){
   	while($row = mysqli_fetch_assoc($favoriteRestaurant)) {
        	array_push($fave_rest,$row);
        }//while
        $toAjax = json_encode($fave_rest);
   }

$search_result['favorite_restaurants'] = $fave_rest;
$search_result['fourSquare_search_results'] = $venues;
$result = json_encode($search_result);
print($result);
?>
