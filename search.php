<?php
session_start();
require_once("fs_lib/src/FoursquareApi.php");
require_once("credentials.php");
//  require_once("mysqli_connect.php");

//  $user_information = [];
//  $user_category_information = [];
//  $user_restaurant_information = [];
//
//  //Get search option from POST
//  $search_option = $_POST['search_option']['option'];
//  $search_category = $_POST['search_option']['category'];

//  //Get search radius option from POST
//  $search_radius = $_POST['radius'];
//  //Get the user ID from SESSION
//  $user_id = $_POST['user_id'];
//  //Get the users information from database
//  $user = $db -> query("SELECT `drop_dwn_choice`,`selected_rstaurnt`,`category_id`,`restaurant_distance`,`radius_selector`,`price_selector`, `usr_uniq_assigned_id` FROM `user_interaction` WHERE `usr_uniq_assigned_id`='$user_id'");
//  if($user->num_rows>0){
//    while($user_row = $user->fetch_assoc()){
//      array_push($user_information , $user_row);
//    }
//    //print_r($user_information);print("<br><br>");
//  }
//  //Get the number of times the user selected a certain category
//  $user_category_count = $db -> query("SELECT `user_interaction`.`usr_uniq_assigned_id` , `categories`.`food_cat` , COUNT(`user_interaction`.`category_id`) AS `count_category` FROM `user_interaction` JOIN `categories` WHERE `categories`.`category_id` = `user_interaction`.`category_id` ORDER BY `count_category` DESC");
//  if($user_category_count->num_rows>0){
//    while($user_cat_row = $user_category_count -> fetch_assoc()){
//      array_push($user_category_information,$user_cat_row);
//    }
//  //  print_r($user_category_information);print("<br><br>");
//  }
//  //Get the number of times the user picks a certain restaurant
//  $user_restaurant_choice = $db -> query("SELECT `usr_uniq_assigned_id` , `selected_rstaurnt` , COUNT(`selected_rstaurnt`) AS `restaurant_count` FROM `user_interaction` ORDER BY `restaurant_count` DESC");
//  if($user_restaurant_choice->num_rows>0){
//    while($user_restaurant_row = $user_restaurant_choice -> fetch_assoc()){
//      array_push($user_restaurant_information,$user_restaurant_row);
//    }
//  //  print_r($user_restaurant_information);
//  }

////   Set client key and secret
	$client_key = FOURSQUARE_CLIENT_ID;
	$client_secret = FOURSQUARE_SECRET_ID;
////  declare new foursquare class with client key and client secret
	$foursquare = new FoursquareApi($client_key, $client_secret);
////	 Searching for venues nearby
	$endpoint = "venues/explore";
////  Conditionals for determining choice

//  if(isset($_POST['user_id'])){
//    if($search_option === "random"){
//      if($user_category_information[0]['count_category'] >= 5){
//      // Prepare parameters
//       $params = array(
//        "ll"=> $_POST['latitude'].",".$_POST['longitude'],
//        "intent"=>"browse",
//        "radius"=>$search_radius,
//        "query"=> $user_category_information[0]['food_cat']
//       );
//      }
//      else{
//        // Prepare parameters
//         $params = array(
//          "ll"=> $_POST['latitude'].",".$_POST['longitude'],
//          "intent"=>"browse",
//          "radius"=>$search_radius,
//          "query"=> $_POST['search_option']['category']
//         );
//      }
//    }
//    else if($search_option === "menu"){
//	    // Prepare parameters
//	    $params = array(
//		    "ll"=> $_POST['latitude'].",".$_POST['longitude'],
//		    "intent"=>"browse",
//		    "radius"=>$search_radius,
//		    "query"=> $seacrh_category
//	    );
//    }

//  }else{
      // $params = array(
      //     "ll"=> $_POST['latitude'].",".$_POST['longitude'],
      //     "intent"=>"browse",
      //     "radius"=>5000,
      //     "query"=> "sushi"
      // );
//      }


  if(isset($_POST['user_id'])){
    if($search_option === "random"){
      if($user_category_information[0]['count_category'] >= 5){
      // Prepare parameters
       $params = array(
        "ll"=> $_POST['latitude'].",".$_POST['longitude'],
        "intent"=>"browse",
        "radius"=>$search_radius,
        "query"=> $user_category_information[0]['food_cat']
       );
      }
      else{
        // Prepare parameters
         $params = array(
          "ll"=> $_POST['latitude'].",".$_POST['longitude'],
          "intent"=>"browse",
          "radius"=>$search_radius,
          "query"=> $_POST['search_option']['category']
         );
      }
    }
    else if($search_option === "menu"){
	    // Prepare parameters
	    $params = array(
		    "ll"=> $_POST['latitude'].",".$_POST['longitude'],
		    "intent"=>"browse",
		    "radius"=>$search_radius,
		    "query"=> $search_category
	    );
    }
  }
else{
    $params = array(
        "ll"=> $_POST['latitude'].",".$_POST['longitude'],
        "intent"=>"browse",
        "radius"=>5000,
        "query"=> "sushi"
    );
}

    $params = array(
                "ll"=> $_POST['latitude'].",".$_POST['longitude'],
                "intent"=>"browse",
                "radius"=>5000,
                "query"=> "lunch"
            );

	// Perform a request to a public resource
	$response = $foursquare->GetPublic($endpoint,$params);

	// Returns a list of Venues
	// $POST defaults to false
	$venues = $foursquare->GetPublic($endpoint , $params, $POST=false);

  print($venues);
?>
