<?php

// Create a user table
$userTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
    Email ID VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('Student', 'Instrutor', 'Program Co-ordinator', 'Qualtiy Assurance', 'Admin'),
    First Name VARCHAR(50),
    Last Name VARCHAR(50),
    Date of Birth DATETIME,
    Age INT,
    Phone No VARCHAR(20),
    Address VARCHAR(255),
    About me TEXT,
    LinkedIn VARCHAR(255),
    Github VARCHAR(255),
    Instagram VARCHAR(255),
    Twitter VARCHAR(255),
    Facebook VARCHAR(255)";

//Create Course tabale
?>
