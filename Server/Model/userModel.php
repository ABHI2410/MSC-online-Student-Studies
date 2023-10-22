<?php
require_once PROJECT_ROOT_PATH . "\Model\database.php";

class UserModel extends DatabaseAPI{
    public function getUsers(){  
        return $this->getAll("users");
    }
    public function getOneUser($id){
        return $this->getOne("users",$id);
    }
    public function createUser($postData){
        return $this->createOne("users",$postData);
    }
    public function updateUser($id,$patchData){
        return $this->updateAll("users",$id, $patchData);
    }
    public function reformUser($putData){
        return $this->reformAll("users",$putData);
    }
    public function deleteUser($id){
        return $this->deleteOne("users",$id);
    }
}
?>