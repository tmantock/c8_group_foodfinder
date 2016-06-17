<?php
require_once("fs_lib/src/FoursquareApi.php");
require_once("credentials.php");

$result = $db -> query("SELECT `food_category` FROM `categories`");

$output = [];

if($result->num_rows > 0){
  while($row = $result -> fetch_assoc()){
    array_push($output,$row);
  }
}
?>
