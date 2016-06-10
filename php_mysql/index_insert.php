<?php
require_once('mysql_connect.php');
print_r($_GET);print('<br>******<br>');
print_r($_POST);
$query = "INSERT `users` SET `name`= '". $_POST['name']."' , `user_name`='". $_POST['user_name']."' , `age`=".$_POST['age'];

$result = mysqli_query($conn, $query);
if(!$result){
    print(mysqli_error($conn));
}

if(mysqli_affected_rows($conn)>0){
    $new_id = mysqli_insert_id($conn);
    print($new_id);
    $output['success'] = true;
    $output['new_id'] = $new_id;
}
else {
    print('NO DATA');
}



