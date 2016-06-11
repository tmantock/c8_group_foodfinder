<?php

require_once('mysql_connect.php');
print_r($_GET);print('<br>******<br>');
print_r($_POST);

$nameArray = ['Micah',
    'David',
    'John',
    'Thomas',
    'Pearl',
    'Jack',
    'Obama',
    'Drama',
    'Hildog',
    'Bernie',
    'Damian',
    'Julius Cesar',
    'The Rock',
    'Arnold',
    'Bugs Bunny',
];
$usernameArray = ['MicahRules69',
    'DavidRules69',
    'JohnRules69',
    'ThomasRules69',
    'PearlRules',
    'JackRules69',
    'ObamaRules69',
    'DramaRules69',
    'HildogRules69',
    'BernieRules69',
    'DamianRules69',
    'Julius CesarRules69',
    'The RockRules69',
    'ArnoldRules69',
    'Bugs BunnyRules69',
];
$ageArray = [ 10,22,33,44,56,66,77,88,99,11,22,43,55,667,77,33,78,99,999,666];
$loc_latArray = ['39.842286',
    '222.842286',
    '111.842286',
    '666.842286',
    '122.842286',
    '226.842286',
    '39.842286',
    '54.842286',
    '55.842286',
    '225.56588',
    '253.165466',
    '25.556645',
    '224.89542',
    '225.246',
    '666.2553',
];
$loc_lonArray = ['-107.964846',
    '-152.25611',
    '-325.25612',
    '-555.1115',
    '-115.5886',
    '-225.668',
    '-224.66895',
    '-112.6556',
    '-112.2256',
    '55.4558',
    '115.2455',
    '115.25566',
    '110.556',
    '78.5664',
    '55.58956',
];
$num_loginsArray = [ 10,22,33,44,56,66,77,88,99,11,22,43,55,667,77,33,78,99,999,666];
$userAgentArray = ['Micah',
    'David',
    'John',
    'Thomas',
    'Pearl',
    'Jack',
    'Obama',
    'Drama',
    'Hildog',
    'Bernie',
    'Damian',
    'Julius Cesar',
    'The Rock',
    'Arnold',
    'Bugs Bunny',
];
$fb_loginArray = [0,1];

$min = 0;
$max_nameArrayLength = count($nameArray);
$max_UserNameArrayLength = count($usernameArray);
$max_ageArrayLength = count($ageArray);
$max_loc_latArrayLength = count($loc_latArray);
$max_loc_lonArrayLength = count($loc_lonArray);
$max_num_loginsArrayLength = count($num_loginsArray);
$max_userAgentArrayLength = count($userAgentArray);
$max_fb_loginArrayLength = count($fb_loginArray);

$random_name_indx = random_int($min,$max_nameArrayLength);
$random_username_indx = random_int($min,$max_UserNameArrayLength);
$random_age_indx = random_int($min,$max_ageArrayLength);
$random_loc_lat_indx = random_int($min,$max_loc_latArrayLength);
$random_loc_lon_indx = random_int($min,$max_loc_lonArrayLength);
$random_num_logins_indx = random_int($min,$max_num_loginsArrayLength);
$random_user_agent_indx = random_int($min,$max_userAgentArrayLength);
$random_fb_login_indx = random_int($min,$max_fb_loginArrayLength);

$name = $nameArray[$random_name_indx];
$username = $usernameArray[$random_username_indx];
$age = $ageArray[$random_age_indx];
$loc_lat = $loc_latArray[$random_loc_lat_indx];
$loc_lon = $loc_lonArray[$random_loc_lon_indx];
$num_logins = $num_loginsArray[$random_num_logins_indx];
$user_agent = $userAgentArray[$random_user_agent_indx];
$fb_login = $fb_loginArray[$random_fb_login_indx];


$query = "INSERT INTO `users` (`name`, `username`, `id`, `age`, `date_added`, `loc_lat`, `loc_lon`, `num_logins`, `user_agent`, `fb_login`)
VALUES ('$name','$username','','$age','','$loc_lat','$loc_lon','$num_logins','$user_agent','$fb_login')";

//$query = "INSERT INTO `users` (`name`, `username`, `id`, `age`, `date_added`, `loc_lat`, `loc_lon`, `num_logins`, `user_agent`, `fb_login`)VALUES ('".$_POST['name']."','".$_POST['user_name']."','".$_POST['id']."','".$_POST['age']."','".$_POST['date_added']."','".$_POST['loc_lat']."','".$_POST['loc_lon']."','".$_POST['num_logins']."','".$_POST['user_agent']."','".$_POST['loc_lon']."')";

//$query = "INSERT INTO `users`
//            SET `name`= '". $_POST['name']."' ,
//                `username`= '". $_POST['user_name']."' ,
//                `id`= '". $_POST['id']."' ,
//                `age`= '". $_POST['age']."' ,
//                `date_added`= '". $_POST['date_added']."' ,
//                `loc_lat`= '".$_POST['loc_lat']."' ,
//                `loc_lon`= '".$_POST['loc_lon']."' ,
//                `num_logins`= '".$_POST['num_logins']."' ,
//                `user_agent`= '".$_POST['user_agent']."' ,
//                `fb_login`= '".$_POST['loc_lon']


print($query);
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



