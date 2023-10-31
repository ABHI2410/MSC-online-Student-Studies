<?php
define("PROJECT_ROOT_PATH", dirname(__DIR__));
// include main configuration file 
require_once PROJECT_ROOT_PATH . "\inc\config.php";
require_once PROJECT_ROOT_PATH . "\\vendor\autoload.php";
// include the controller files 
require_once PROJECT_ROOT_PATH . "\Controller\BaseController.php";
require_once PROJECT_ROOT_PATH . "\Controller\API\Controller.php";
require_once PROJECT_ROOT_PATH . "\Controller\ApI\UserController.php";
require_once PROJECT_ROOT_PATH . "\Controller\ApI\TableController.php";
require_once PROJECT_ROOT_PATH . "\Controller\ApI\ProgramController.php";
// include the model file 
require_once PROJECT_ROOT_PATH . "\Model\Model.php";
require_once PROJECT_ROOT_PATH . "\Model\TableModel.php";
require_once PROJECT_ROOT_PATH . "\Model\UserModel.php";

?>