<?php
require __DIR__ . "\inc\bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if (!isset($uri[3])){
    header("HTTP/1.1 404 Not Found");
    exit();
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
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>