<?php
/*********************    INSERT FOR user_interactions TABLE  DATA ********************/

require_once('mysql_connect.php');
print_r($_GET);print('<br>******<br>');
if(!empty($_POST)){print_r($_POST);};
$food_catArray = ["Bakery cafes‎",
    "Barbecue",
    "Biker bars‎",
    "Buffet",
    "Cafés",
    "Cafés in Singapore",
    "Chili con carne",
    "Coffeehouses",
    "Diners",
    "Doughnut",
    "Drive-in",
    "Ethnic",
    "Fast casual",
    "Fast-food ",
    "Fish and chip",
    "Frozen yogurt",
    "Gastropubs",
    "Gluten-free",
    "Hamburger",
    "Hot dog",
    "Ice cream parlors",
    "Juice bars",
    "Kosher",
    "Lunch counters",
    "Noodle",
    "Pancake houses",
    "Pizzerias",
    "Poultry",
    "Prison",
    "Root beer stands",
    "Seafood",
    "Steakhouses",
    "Submarine sandwich",
    "Tea houses",
    "Tex-Mex",
    "Theme",
    "Vegetarian",
];

$randomInt = random_int(0,50);
$randomInt2 = random_int(0,50);
$randomInt3 = random_int(0,50);
$randomInt4 = random_int(0,50);
$randomInt5 = random_int(0,50);
$randomInt6 = random_int(0,50);
$randomInt7 = random_int(0,500);
$random_cat_id = random_int(0,50);

    $id = '' ;
    $drop_dwn_select = random_int(0,1);
    $random_btn_selected = random_int(0,1) ;
    $num_of_nxt_clicks = $randomInt ;
    $num_of_prev_clicks = $randomInt2 ;
    $back_click = random_int(0,1) ;
    $nav_click = random_int(0,1) ;
    $random_click_log = $randomInt3 ;
    $drop_dwn_choice = $food_catArray[array_rand($food_catArray)];
    $selected_rstaurnt = "Some $drop_dwn_choice-Related Restaurant";
    $category_id = $random_cat_id ;
    $restaurant_distance = $randomInt4 ;
    $radius_selector = $randomInt5 ;
    $price_selector = $randomInt6 ;
    $usr_uniq_assigned_id = $randomInt7 ;
    $prev_selec_made = '' ;

    $query = "INSERT INTO `user_interaction` (`id`, `search_timestmp`, `drop_dwn_select`, `random_btn_selected`, `num_of_nxt_clicks`, `num_of_prev_clicks`, `drop_dwn_select_timestmp`, `back_click`, `back_timestmp`, `nav_click`, `nav_click_timestmp`, `random_click_log`, `drop_dwn_choice`, `selected_rstaurnt`, `category_id`, `restaurant_distance`, `radius_selector`, `price_selector`, `init_timestmp_for_data_rqust`, `usr_uniq_assigned_id`, `prev_selec_made`)
VALUES ('', NOW(), '$drop_dwn_select', NOW(), '$num_of_nxt_clicks', '$num_of_prev_clicks', NOW(), '$back_click', NOW(), '$nav_click', NOW(), '$random_click_log', '$drop_dwn_choice', '$selected_rstaurnt', '$category_id', '$restaurant_distance', '$radius_selector', '$price_selector', NOW(), '$usr_uniq_assigned_id', '$prev_selec_made')";

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
/*********************    INSERT FOR categories TABLE  DATA ********************/
//<?php
//
//require_once('mysql_connect.php');
//print_r($_GET);print('<br>******<br>');
//if(!empty($_POST)){print_r($_POST);};
//$food_catArray = ["Bakery cafes‎",
//    "Barbecue",
//    "Biker bars‎",
//    "Buffet",
//    "Cafés",
//    "Cafés in Singapore",
//    "Chili con carne",
//    "Coffeehouses",
//    "Diners",
//    "Doughnut",
//    "Drive-in",
//    "Ethnic",
//    "Fast casual",
//    "Fast-food ",
//    "Fish and chip",
//    "Frozen yogurt",
//    "Gastropubs",
//    "Gluten-free",
//    "Hamburger",
//    "Hot dog",
//    "Ice cream parlors",
//    "Juice bars",
//    "Kosher",
//    "Lunch counters",
//    "Noodle",
//    "Pancake houses",
//    "Pizzerias",
//    "Poultry",
//    "Prison",
//    "Root beer stands",
//    "Seafood",
//    "Steakhouses",
//    "Submarine sandwich",
//    "Tea houses",
//    "Tex-Mex",
//    "Theme",
//    "Vegetarian",
//];
//
//echo "categories = ".$categories;
//print("<br><br>");
//echo "category_id = ".$category_id;
//print("<br><br>");
//echo "food_cat = ".$food_cat;
//print("<br><br>");
//
//for ($i=0; $i<count($food_catArray); $i++) {
//
//    $food_cat = $food_catArray[$i];
//    $category_id = $i;
//    $categories = random_int(1,20);
//
//    $query = "INSERT INTO `categories` (`categories`, `food_cat`, `category_id`)
//    VALUES ('$categories','$food_cat','$category_id')";
//
//    print($query);
//    $result = mysqli_query($conn, $query);
//    if(!$result){
//        print(mysqli_error($conn));
//    }
//
//    if(mysqli_affected_rows($conn)>0){
//        $new_id = mysqli_insert_id($conn);
//        print($new_id);
//        $output['success'] = true;
//        $output['new_id'] = $new_id;
//    }
//    else {
//        print('NO DATA');
//    }
//}
/*********************    INSERT FOR USERS TABLE  DATA ********************/
//<?php
//
//require_once('mysql_connect.php');
//print_r($_GET);print('<br>******<br>');
//if(!empty($_POST)){print_r($_POST);};
//
//$sign = random_int(0,1);
//if($sign == 1) {
//    $randSign = '-';
//}
//$int1 = random_int(0,4);
//$int2 = random_int(0,9);
//$int3 = random_int(0,9);
//$int4 = random_int(0,9);
//$int5 = random_int(0,9);
//$int6 = random_int(0,9);
//$int7 = random_int(0,9);
//$int8 = random_int(0,9);
//$int9 = random_int(0,9);
//$int0 = random_int(0,9);
//
//$random_lat = $randSign.$int9.$int2.$int7.".".$int4.$int8.$int6.$int3.$int5.$int1;
//$random_lon = $randSign.$int4.$int8.$int9.".".$int1.$int2.$int5.$int3.$int2.$int8;
//
//echo "random_lat = ".$random_lat;
//    print("<br><br>");
//$rand_loc_lat = $random_lat;
//echo "rand_loc_lat = ".$rand_loc_lat;
//    print("<br><br>");
//$rand_age = $int1.$int2;
//echo "rand_age = ".$rand_age;
//    print("<br><br>");
//$rand_num_logins = $int3.$int6.$int8;
//echo "rand_num_logins = ".$rand_num_logins;
//    print("<br><br>");
//$rand_loc_lon = $random_lon;
//echo "rand_loc_lon = ".$rand_loc_lon;
//    print("<br><br>");
//$rand_fb_login = random_int(0,1);
//
//$nameArray = ['Micah',
//    'David',
//    'John',
//    'Thomas',
//    'Pearl',
//    'Jack',
//    'Obama',
//    'Drama',
//    'Hildog',
//    'Bernie',
//    'Damian',
//    'Julius Cesar',
//    'The Rock',
//    'Arnold',
//    'Bugs Bunny',
//];
//$usernameArray = ['Micah Rules',
//    'David Rules',
//    'John Rules',
//    'Thomas Rules',
//    'Pearl Rules',
//    'Jack Rules',
//    'Obama Rules',
//    'Drama Rules',
//    'Hildog Rules',
//    'Bernie Rules',
//    'Damian Rules',
//    'Julius Cesar Rules',
//    'The Rock Rules',
//    'Arnold Rules',
//    'Bugs Bunny Rules',
//];
//$userAgentArray = ['Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
//    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
//    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36',
//    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36',
//    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36',
//    'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
//    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36',
//];
//
//$username = $usernameArray[array_rand($usernameArray)];
//    echo "hello random user: ". $usernameArray[array_rand($usernameArray)];
//        print("<br><br>");
//$name = $nameArray[array_rand($nameArray)];
//    echo "hello random name: ". $name;
//        print("<br><br>");
//$user_agent = $userAgentArray[array_rand($userAgentArray)];
//    echo "hello random userAgent: ".$user_agent;
//        print("<br><br>");
//
//$query = "INSERT INTO `users` (`name`, `username`, `id`, `age`, `date_added`, `loc_lat`, `loc_lon`, `num_logins`, `user_agent`, `fb_login`)
//VALUES ('$name','$username','','$rand_age',NOW(),'$rand_loc_lat','$rand_loc_lon','$rand_num_logins','$user_agent','$rand_fb_login')";
//
//print($query);
//$result = mysqli_query($conn, $query);
//if(!$result){
//    print(mysqli_error($conn));
//}
//
//if(mysqli_affected_rows($conn)>0){
//    $new_id = mysqli_insert_id($conn);
//    print($new_id);
//    $output['success'] = true;
//    $output['new_id'] = $new_id;
//}
//else {
//    print('NO DATA');
//}
//
//
//
