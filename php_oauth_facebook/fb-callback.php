<?php
session_start();
require_once('../credentials.php');
//then you'll need to include the facebook sdk
require_once('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
/*
make your session, load your creds, facebook sdk, and make the facebook object
*/
$fb = new Facebook\Facebook([
    'app_id'                => FACEBOOK_APP_ID,
    'app_secret'            => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
]);
$helper = $fb->getRedirectLoginHelper();
/*check for errors!  maybe make use of a fancy try/catch block!*/
try {
    $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}
//did we get the access token?  better check!
if (! isset($accessToken)) {
    if ($helper->getError()) {
        header('HTTP/1.0 401 Unauthorized');
        echo "Error: " . $helper->getError() . "\n";
        echo "Error Code: " . $helper->getErrorCode() . "\n";
        echo "Error Reason: " . $helper->getErrorReason() . "\n";
        echo "Error Description: " . $helper->getErrorDescription() . "\n";
    } else {
        echo 'Bad request';
    }
    exit;
}

// we are now officially Logged in
var_dump($accessToken->getValue());
// The OAuth 2.0 client handler helps us manage access tokens
//let's make an oAuth client to help manage the tokens
$oAuth2Client = $fb->getOAuth2Client();
// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
// validate the token
// If you know the user ID this access token belongs to, you can validate it here
$tokenMetadata->validateAppId(FACEBOOK_APP_ID);
$tokenMetadata->validateExpiration();
// validate the expiration, don't want to use an expired token.  These will all throw exceptions which you can use try/catch blocks

/* next we're going to exchange the short-lived token for a long-lived token (2 hours versus 60 days)*/
    // Exchanges a short-lived access token for a long-lived one
    try {
        $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
        exit;
    }

    echo '<h3>Long-lived</h3>';
    var_dump($accessToken->getValue());
$_SESSION['fb_access_token'] = (string) $accessToken;
echo '<h5 style="color: red;">access token in callback page: </h5>';
//print_r($_SESSION['fb_access_token']);
/*store the token for later use*/
// User is logged in with a long-lived access token.
// You can redirect them to a me
//mbers-only page.
header('location: show_data.php');
?>
