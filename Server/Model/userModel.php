<?php
require_once PROJECT_ROOT_PATH . "\Model\Core\database.php";

class UserModel extends DatabaseAPI{
    public function get($tableName,$params){
        return $this->selectAll($tableName,$params);
    }
    public function create($tableName,$postData){
        return $this->createOne($tableName,$postData);
    }
}
?>