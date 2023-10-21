<?php
class DatabaseAPI{
    private $conn;

    public function __construct(){
        try{
            $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD);
            if ( mysqli_connect_errno() ) {
                throw new Exception ( "Could not connect to the Database." );
            }
        } catch (Exception $e) {
            throw new Exception ("Unexpected encounter while connecting to Database". $e->getMessage() );
        }
    }
    public function connect(){
        try{
            $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD);
            if ( mysqli_connect_errno() ) {
                throw new Exception ( "Could not connect to the Database." );
            }
        } catch (Exception $e) {
            throw new Exception ("Unexpected encounter while connecting to Database". $e->getMessage() );
        }
    }
    public function createDatabase() {
        try{
            $this->conn->select_db(DB_DATABASE_NAME);
        } catch (mysqli_sql_exception $e) {
            echo "Error selecting the database: " . $e->getMessage() . "\n";
        }

        $sql = "CREATE DATABASE IF NOT EXISTS DB_DATABASE_NAME";
        try{
            $result = $this->conn->query($sql);
            if ($this->conn->query($sql) === true){
                echo "Databse created successfully.\n";
            } else {
                echo "Error creating database: ".$this->conn->error."\n";
            }
        } catch (Exception $e) {
            echo "Unexpected encounter while creating Database: ".$e->getMessage()."\n";
        }
    }
    public function createTable($tableName,$tableSchema){
        try{
            $this->conn->select_db(DB_DATABASE_NAME);
        } catch (mysqli_sql_exception $e) {
            echo "Error selecting the database: " . $e->getMessage() . "\n";
        }
        
        $sql="CREATE TABLE IF NOT EXISTS $tableName ($tableSchema);";
        try{
            $result = $this->conn->query($sql);
            if ($this->conn->query($sql) === true){
                echo "Table created successfully.\n";
            } else {
                echo "Error creating Table: ".$this->conn->error."\n";
            }
        } catch (Exception $e) {
            echo "Unexpected encounter while creating Table: " . $e->getMessage() . "\n";
        }
         
    }
    
    public function close(){
        $this->conn->close();
    }

    public function select($query = " ", $params = []){
        try{
            $this->conn->select_db(DB_DATABASE_NAME);
        } catch (mysqli_sql_exception $e) {
            echo "Error selecting the database: " . $e->getMessage() . "\n";
        }
        try {
            $stmt = $this->executeStatement( $query,$params);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            return $result;
        } catch (Exception $e) {
            throw New Exception( $e->getMessage());
        }

    }
    private function executeStatement($query = "" , $params = [])
    {
        try {
            $stmt = $this->conn->prepare( $query );
            if($stmt === false) {
                throw New Exception("Unable to do prepared statement: " . $query);
            }
            if( $params ) {
                $stmt->bind_param($params[0], $params[1]);
            }
            $stmt->execute();
            return $stmt;
        } catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }	
    }
}
?>