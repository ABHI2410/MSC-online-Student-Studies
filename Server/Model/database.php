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

    public function selectAll($tableName, $whereConditions = [], $selectColumns = '*') {
        $defaultOptions = array("deleted" => 0);
        $whereConditions = array_merge($defaultOptions, $whereConditions);
        try {
            $sqlQuery = "SELECT $selectColumns FROM $tableName";
            $params = [];
            $paramTypes = "";
            
            if (!empty($whereConditions)) {
                $sqlQuery .= " WHERE ";
                $conditions = [];
    
                foreach ($whereConditions as $column => $value) {
                    if ($column === 'age') {
                        // 'i' for integers
                        $paramTypes .= 'i';
                    } else {
                        // 's' for string (varchar columns)
                        $paramTypes .= 's';
                    }
    
                    $conditions[] = "$column = ?";
                    $params[] = $value;
                }
    
                $sqlQuery .= implode(' AND ', $conditions);
            }
    
            $output = $this->select($sqlQuery, array_merge([$paramTypes], $params));
    
            if (is_array($output)) {
                return $output; // Return the result
            } else {
                throw new Exception("Error fetching data");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    

    public function createOne($tableName,$data){
        try {    
            $columns = implode(", ", array_keys($data));
            $values = implode(", ", array_fill(0, count($data), "?"));
            $sqlQuery = "INSERT INTO $tableName ($columns) VALUES ($values)";
            $params = array();
            $paramTypes = "";
    
            foreach ($data as $key => $value) {
                if ($key === 'id' || $key === 'age') {
                    // 'i' for integers
                    $paramTypes .= 'i';
                } else {
                    // 's' for string (varchar columns)
                    $paramTypes .= 's';
                }
            
                if ($key === 'password') {
                    $params[] = password_hash($value, PASSWORD_ARGON2I);
                } else {
                    $params[] = $value;
                }
            }
            array_unshift($params,$paramTypes);
            $output = $this->select($sqlQuery,$params);
            if (is_bool($output)) {
                return $output === true ? 200 : 500;
            } elseif (is_array($output) && isset($output['affected_rows']) && $output['affected_rows'] > 0) {
                return 200;
            } else {
                throw new Exception("Error inserting data");
            }
            
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function reformAll($tableName, $data) {
        try {
            if (isset($data['id'])) {
                $id = $data['id'];
                unset($data['id']); // Remove 'id' from the data array
            } else {
                throw new Exception("ID not provided in the data for updating.");
            }
    
            $setValues = [];
            $params = [];
            $paramTypes = ""; 
    
            foreach ($data as $key => $value) {
                if ($key === 'age') {
                    // 'i' for integers
                    $paramTypes .= 'i';
                } else {
                    // 's' for string (varchar columns)
                    $paramTypes .= 's';
                }
                if ($key === 'password') {
                    $setValues[] = "$key = ?";
                    $params[] = password_hash($value, PASSWORD_ARGON2I);
                } else {
                    $setValues[] = "$key = ?";
                    $params[] = $value;
                }
            }
    
            $params[] = $id; // Add the ID as the last parameter
            $paramTypes .= 'i'; // 'i' for the ID parameter
    
            $setClause = implode(", ", $setValues);
            $sqlQuery = "UPDATE $tableName SET $setClause WHERE id = ?";
            $output = $this->select($sqlQuery, array_merge([$paramTypes], $params));
    
            if (is_bool($output)) {
                return $output === true ? 200 : 500;
            } elseif (is_array($output) && isset($output['affected_rows']) && $output['affected_rows'] > 0) {
                return 200;
            } else {
                throw new Exception("Error updating data");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function updateAll($tableName, $id, $data) {
        try {
              
            $setValues = [];
            $params = [];
            $paramTypes = ""; 
    
            foreach ($data as $key => $value) {
                if ($key === 'age') {
                    // 'i' for integers
                    $paramTypes .= 'i';
                } else {
                    // 's' for string (varchar columns)
                    $paramTypes .= 's';
                }
                if ($key === 'password') {
                    $setValues[] = "$key = ?";
                    $params[] = password_hash($value, PASSWORD_ARGON2I);
                } else {
                    $setValues[] = "$key = ?";
                    $params[] = $value;
                }
            }
    
            $params[] = $id; // Add the ID as the last parameter
            $paramTypes .= 'i'; // 'i' for the ID parameter
    
            $setClause = implode(", ", $setValues);
            $sqlQuery = "UPDATE $tableName SET $setClause WHERE id = ?";
            $output = $this->select($sqlQuery, array_merge([$paramTypes], $params));
    
            if (is_bool($output)) {
                return $output === true ? 200 : 500;
            } elseif (is_array($output) && isset($output['affected_rows']) && $output['affected_rows'] > 0) {
                return 200;
            } else {
                throw new Exception("Error updating data");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    
    public function deleteOne($tableName, $id) {
        try {
            $sqlQuery = "UPDATE $tableName SET deleted = 1 WHERE id = ?";
            $output = $this->select($sqlQuery,['i',$id]);
    
            if (is_bool($output)) {
                return $output === true ? 200 : 500;
            } elseif (is_array($output) && isset($output['affected_rows']) && $output['affected_rows'] > 0) {
                return 200;
            } else {
                throw new Exception("Error updating data");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function select($query = " ", $params = []){
        try{
            $this->conn->select_db(DB_DATABASE_NAME);
        } catch (mysqli_sql_exception $e) {
            echo "Error selecting the database: " . $e->getMessage() . "\n";
        }
        try {
            $stmt = $this->executeStatement( $query,$params);
            if (stripos($query, 'SELECT') === 0) {
                $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $stmt->close();
                return $result;
            } else {
                $stmt->close();
                return true;
            }
        } catch (Exception $e) {
            throw New Exception( $e->getMessage());
        }

    }
    private function executeStatement($query = "" , $params = []){
        $dataValues = array_slice($params,1);
        try {
            $stmt = $this->conn->prepare( $query );
            if($stmt === false) {
                throw New Exception("Unable to do prepared statement: " . $query);
            }
            if( $params ) {
                $stmt->bind_param($params[0], ...$dataValues);
            }
            $stmt->execute();
            return $stmt;
        } catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }	
    }
}
?>