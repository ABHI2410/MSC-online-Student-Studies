<?php
require_once PROJECT_ROOT_PATH . "\Model\database.php";

class UserModel extends DatabaseAPI{
    public function getUsers($limit){
        return $this->select("SELECT * FROM USERS ORDER BY id ASC LIMIT ?",["i",$limit]);
    }
}
?>