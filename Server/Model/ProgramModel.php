<?php
require_once PROJECT_ROOT_PATH . "\Model\Core\database.php";

class ProgramModel extends DatabaseAPI{
    public function create($tableName,$postData){
        return $this->createOne($tableName,$postData);
    }
}
?>