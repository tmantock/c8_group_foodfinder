<?php
    require_once('mysql_connect.php');
    print_r($conn);
    $query = "SELECT * FROM `users`";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)) {
        print_r($row);
    }
}
