<?php
require_once PROJECT_ROOT_PATH . "\Model\Core\database.php";

class TableModel extends DatabaseAPI{
    public function newTable($tableName,$tableSchema){
        return $this->createTable($tableName,$tableSchema);
    }
}
?>