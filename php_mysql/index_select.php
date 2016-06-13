<?php
//    echo "access to index_select.php";
    require_once('mysql_connect.php');
//if (!$conn) {
//    echo "Error: Unable to connect to MySQL." . PHP_EOL;
//    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
//    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
//    exit;
//}
//echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
//echo "Host information: " . mysqli_get_host_info($conn) . PHP_EOL;
//
//    echo "after require once";
//    //print_r($conn);
//echo "after print once";
    $query = "SELECT * FROM `users`";
    $result = mysqli_query($conn, $query);
        print_r($result);
    print(mysqli_num_rows($result));
    if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)) {
        //echo "printing row require once";
        print_r($row);
        print("<br>");
    }
}
?>