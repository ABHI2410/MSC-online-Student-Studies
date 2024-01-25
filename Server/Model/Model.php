<?php
require_once PROJECT_ROOT_PATH . "\Model\Core\database.php";

class Model extends DatabaseAPI{
    public function get($tableName,$params){
        return $this->selectAll($tableName,$params);
    }
    public function create($tableName,$postData){
        return $this->createOne($tableName,$postData);
    }
    public function update($tableName,$id,$patchData){
        return $this->updateAll($tableName,$id, $patchData);
    }
    public function reform($tableName,$putData){
        return $this->reformAll($tableName,$putData);
    }
    public function delete($tableName,$id){
        return $this->deleteOne($tableName,$id);
    }
}
?>