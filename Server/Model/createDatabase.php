<?php
// Include the database_api.php file
require_once('database.php');

// Instantiate the DatabaseAPI class with your database connection details
$databaseAPI = new DatabaseAPI();

// Connect to the database
$databaseAPI->connect();

// Create a new database


// Create a table in the new database
$query = "CREATE TABLE IF NOT EXISTS user id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT,
    contact VARCHAR(20),
    address VARCHAR(255),
    bio TEXT,
    social_media VARCHAR(255)";

$databaseAPI->select($query);

// Close the database connection
$databaseAPI->close();
?>
