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
    'David Rules',
    'John Rules',
    'Thomas Rules',
    'Pearl Rules',
    'Jack Rules',
    'Obama Rules',
    'Drama Rules',
    'Hildog Rules',
    'Bernie Rules',
    'Damian Rules',
    'Julius CesarRules',
    'The RockRules',
    'Arnold Rules',
    'Bugs BunnyRules',
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
$userAgentArray = ['Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36',
    'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36',
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
VALUES ('$name','$username','','$age',NOW(),'$loc_lat','$loc_lon','$num_logins','$user_agent','$fb_login')";

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



