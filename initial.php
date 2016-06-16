<?php
session_start();
require_once("credentials.php");
$category = [];
$categories = $db -> query("SELECT * FROM `categories`");
if($categories->num_rows>0){
  while($cat_row = $categories -> fetch_assoc()){
    array_push($category,$cat_row);
  }
}
print(json_encode($category));
?>
