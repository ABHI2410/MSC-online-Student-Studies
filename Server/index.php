<?php
header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . "\inc\bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if (!isset($uri[3])){
    if(isset($uri[2]) && $uri[2]=== 'api'){
        $objFeedController = new Controller();
        $strMethodName = $uri[2] . 'Action';
        $objFeedController->{$strMethodName}();
    } else {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
    
}elseif($uri[2] === 'api' && $uri[3] === 'refresh') {
    $objFeedController = new Controller();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}($uri[2]);
}elseif(isset($uri[2]) && $uri[2] === 'table') {
    $objFeedController = new TableController();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}($uri[2]);
} elseif (isset($uri[2]) && $uri[2] === 'user') {
    $objFeedController = new UserController();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}();
} elseif (isset($uri[2]) && $uri[2] === 'program') {
    $objFeedController = new ProgramController();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}();
}elseif (isset($uri[2])) {
    $objFeedController = new ProgramController();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}();
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>