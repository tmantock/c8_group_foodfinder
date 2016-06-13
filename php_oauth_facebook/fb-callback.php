<?php
session_start();

/*
make your session, load your creds, facebook sdk, and make the facebook object
*/
require_once('facebook_info.php');
require_once('libraries/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php');
$fb = new Facebook\Facebook([
    'app_id' => FACEBOOK_APP_ID,
    'app_secret' => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION
]);

$helper = $fb->getRedirectLoginHelper();

/*check for errors!  maybe make use of a fancy try/catch block!*/
try {
    $accessToken = $helper->getAccessToken();
}   catch(Facebook\Exceptions\FacebookResponseException $e) {
    //when Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
}   catch(Facebook\Exceptions\FacebookSDKException $e) {
        //when validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

//did we get the access token?  better check!
    if (!isset($accessToken)) {
        // User authenticated your app!
        // Save the access token to a session and redirect
        $_SESSION['facebook_access_token'] = (string) $accessToken;
        // Log them into your web framework here . . .
        echo 'Successfully logged in!';
        exit;
    } elseif ($helper->getError()) {
        // The user denied the request
        // You could log this data . . .
        var_dump($helper->getError());
        var_dump($helper->getErrorCode());
        var_dump($helper->getErrorReason());
        var_dump($helper->getErrorDescription());
        // You could display a message to the user
        // being all like, "What? You don't like me?"
        exit;
    }
    // If they've gotten this far, they shouldn't be here
//    http_response_code(400);
//    exit;
// we are now officially Logged in


// The OAuth 2.0 client handler helps us manage access tokens
//let's make an oAuth client to help manage the tokens

// Get the access token metadata from /debug_token
    $tokenMetadata = $oAuth2Client->debugToken($accessToken);
    echo '<h3>Metadata</h3>';
    var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId(FACEBOOK_APP_ID);
// validate the token
// If you know the user ID this access token belongs to, you can validate it here
// validate the expiration, don't want to use an expired token.  These will all throw exceptions which you can use try/catch blocks
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
    // Exchanges a short-lived access token for a long-lived one
    try {
        $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
        exit;
    }

    echo '<h3>Long-lived</h3>';
    var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;

/* next we're going to exchange the short-lived token for a long-lived token (2 hours versus 60 days)*/

$oAuth2Client = $fb->getOAuth2Client();
$longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
/*store the token for later use*/
// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.