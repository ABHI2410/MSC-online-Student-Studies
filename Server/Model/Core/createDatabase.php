<?php
class Schema{
    // Create a user table
    public $userTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT NOT NULL,
        EmailID VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL, 
        FirstName VARCHAR(50),
        LastName VARCHAR(50),
        Role SET('Student', 'Instrutor', 'Program Co-ordinator', 'Qualtiy Assurance', 'Admin'),
        DateOfBirth DATE,
        Age INT,
        Term ENUM('Spring','Summer','Fall'),
        EnrollYear YEAR DEFAULT YEAR(CURDATE()),
        PhoneNo VARCHAR(20),
        Address VARCHAR(255),
        AboutMe TEXT,
        LinkedIn VARCHAR(255),
        Github VARCHAR(255),
        Instagram VARCHAR(255),
        Twitter VARCHAR(255),
        Facebook VARCHAR(255),
        deleted Bool DEFAULT 0
    ";

    // Program Table
    public $ProgramTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Description TEXT,
        StartDate DATE DEFAULT CURRENT_DATE,
        AverageDuration INT,
        Department ENUM('CSE', 'ASE', 'ME', 'CE', 'BME', 'DM'),
        Type ENUM('Bachelor', 'Master', 'Ph.D.'),
        CreditsRequired INT NOT NULL,
        Overview TEXT,
        Vision TEXT,
        Mission TEXT,
        Strategy TEXT,
        CareetOpportunities TEXT,
        Location VARCHAR(255),
        ProgramCoordinatorID INT,
        FOREIGN KEY (ProgramCoordinatorID) REFERENCES user(ID),
        deleted Bool DEFAULT 0
    ";

    //Program Requirement 
    public $ProgramRequirements = "ID INT AUTO_INCREMENT PRIMARY KEY,
        ProgramID INT NOT NULL,
        RequirementName VARCHAR(100) NOT NULL,
        RequirementDescription TEXT,
        MinimumRequired INT,
        AdditionalRequirements TEXT,
        MaximumAllowed INT,
        FOREIGN KEY (ProgramID) REFERENCES program(ID),
        deleted Bool DEFAULT 0
    ";
    

    // User Program Association 
    public $UserProgramAssociation = "ID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        ProgramID INT,
        FOREIGN KEY (UserID) REFERENCES user(ID),
        FOREIGN KEY (ProgramID) REFERENCES program(ID),
        deleted Bool DEFAULT 0
    ";
    
    //Create Course table
    // Syllabus is a file 
    public $courseTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
        CourseID VARCHAR(75) NOT NULL,
        Name VARCHAR(75) NOT NULL,
        InstructorID INT NOT NULL,
        ProgramID INT NOT NULL,
        Day SET('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        TimeStart TIME NOT NULL,
        TimeEnd TIME NOT NULL,
        StartFrom DATE NOT NULL,
        EndDate DATE NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Mode ENUM('IN-PERSON','HYBRID','ONLINE'),
        Credit INT NOT NULL,
        Domain TEXT NOT NULL,
        RecommendedTextbook TEXT,
        Syllabus TEXT,
        FOREIGN KEY (InstructorID) REFERENCES user(ID),
        FOREIGN KEY (ProgramID) REFERENCES program(ID),
        deleted Bool DEFAULT 0
    ";

    //Course Program Association Table 
    public $CourseProgramAssociation = "ID INT AUTO_INCREMENT PRIMARY KEY,
        CourseID INT NOT NULL,
        ProgramID INT NOT NULL,
        Type SET('Basics', 'Specialty', 'Breadth','Additional'),
        FOREIGN KEY (CourseID) REFERENCES Course(ID),
        FOREIGN KEY (ProgramID) REFERENCES Program(ID),
        deleted Bool DEFAULT 0
    
    ";

    //Create Modules table
    //Location is a file
    public $modulesTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        CourseID INT NOT NULL,
        Section VARCHAR(255) NOT NULL,
        Location TEXT NOT NULL,
        Description TEXT,
        UploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        deleted Bool DEFAULT 0
    ";

    //Create Assignment Table
    //Files are files
    public $assignmentTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(50) NOT NULL,
        CourseID INT NOT NULL,
        DueDate DATETIME NOT NULL,
        Points FLOAT NOT NULL,
        Description TEXT,
        AvailableFrom DATETIME NOT NULL,
        AvailableUntill DATETIME NOT NULL,
        Files TEXT,
        AttemptsAllowed VARCHAR(255) NOT NULL DEFAULT 'Unlimited',
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        deleted Bool DEFAULT 0
    ";
    
    // Create Submission Table
    // Submission is a file 
    public $SubmissionTableSchema = "ID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT NOT NULL,
        AssignmentID INT NOT NULL,
        CourseID INT NOT NULL,
        Grade FLOAT NOT NULL,
        UploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Submission TEXT NOT NULL,
        Comments TEXT,
        FOREIGN KEY (UserID) REFERENCES user(ID),
        FOREIGN KEY (AssignmentID) REFERENCES assignment(ID),
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        deleted Bool DEFAULT 0
    ";

    //User Course Association Table
    public $UserCourseAssociation = "ID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT NOT NULL,
        CourseID INT NOT NULL,
        Role ENUM('Student', 'Teacher', 'Teaching Assistant'),
        FOREIGN KEY (UserID) REFERENCES user(ID),
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        deleted Bool DEFAULT 0
    ";
    
    // Registration Validation Code
    public $RegistrationCodeTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        StudentCode VARCHAR(10),
        InstructorCode VARCHAR(10),
        QACode VARCHAR(10),
        PCCode VARCHAR(10),
        AdminCode VARCHAR(10),
        ValidFrom DATETIME NOT NULL,
        ValidUntil DATETIME NOT NULL,
        deleted Bool DEFAULT 0
    ";
    
    // Chat list Table
    public $ChatListTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        TransponderA INT NOT NULL,
        TransponderB INT NOT NULL,
        LastText TEXT,
        LastTextTime DATETIME,
        FOREIGN KEY (TransponderA) REFERENCES user(ID), 
        FOREIGN KEY (TransponderB) REFERENCES user(ID),
        deleted Bool DEFAULT 0
    ";

    //Chat Messages Table
    // Attachment is a file
    public $ChatMessagesTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        TransponderSender INT NOT NULL,
        ChatHistory INT NOT NULL,
        Message TEXT,
        MessageTime DATETIME,
        Attachments TEXT,
        FOREIGN KEY (TransponderSender) REFERENCES user(ID), 
        FOREIGN KEY (ChatHistory) REFERENCES chat(ID),
        deleted Bool DEFAULT 0
    ";

    // Exam Table 
    public $ExamTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        CourseID INT NOT NULL,
        Title VARCHAR(100) NOT NULL,
        InstructorID INT NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Duration TIME NOT NULL,
        NumberOfQuestions INT NOT NULL,
        ValidFrom DATETIME NOT NULL,
        ValidUntil DATETIME NOT NULL,
        DueDate DATETIME NOT NULL,
        Instructions TEXT,
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        FOREIGN KEY (InstructorID) REFERENCES user(ID),
        deleted Bool DEFAULT 0
    ";

    // Question Table
    public $QuestionTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        ExamID INT NOT NULL,
        QuestionType ENUM('MCQ', 'Yes/No', 'True/False', 'Single Word', 'Digit') NOT NULL,
        Question TEXT NOT NULL,
        Options Text,
        CorrectAnswer TEXT,
        Points INT NOT NULL,
        FOREIGN KEY (ExamID) REFERENCES exam(ID),
        deleted Bool DEFAULT 0
    ";

    // Answers Table
    public $AnswerTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        QuestionID INT NOT NULL,
        StudentID INT NOT NULL,
        Text TEXT,
        PointsReceived INT,
        FOREIGN KEY (QuestionID) REFERENCES question(ID),
        FOREIGN KEY (StudentID) REFERENCES user(ID),
        deleted Bool DEFAULT 0
    ";
    
    //Course Review Table 
    public $CourseReviewTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        CourseReviewID INT NOT NULL,
        CourseID INT NOT NULL,
        Type ENUM ('Review','Rating'),
        Question TEXT NOT NULL,
        Answer TEXT,
        ReviewDate DATETIME,
        FOREIGN KEY (CourseID) REFERENCES course(ID),
        deleted Bool DEFAULT 0
    ";

    //Program Review Table 
    public $ProgramReviewTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        ProgramReviewID INT NOT NULL,
        ProgramID INT NOT NULL,
        Type ENUM ('Review','Rating'),
        Question TEXT NOT NULL,
        Answer TEXT,
        ReviewDate DATETIME,
        FOREIGN KEY (ProgramID) REFERENCES program(ID),
        deleted Bool DEFAULT 0
    ";

    //QA Policy Table
    public $QAPolicyTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
        PolicyID INT NOT NULL,
        PolicyName VARCHAR(100) NOT NULL,
        PolicyDescription TEXT,
        PolicyOwner INT NOT NULL,
        EffectiveDate DATE,
        ReviewDate DATE,
        RelatedDocuments TEXT,
        KeyPerformanceIndicators TEXT,
        ProceduresProcesses TEXT,
        RegulatoryCompliance TEXT,
        TrainingEducation TEXT,
        AuditInspectionSchedule TEXT,
        ContinuousImprovementInitiatives TEXT,
        DocumentationReporting TEXT,
        CustomerFeedback TEXT,
        ResponsibilitiesAccountabilities TEXT,
        EmergencyPreparedness TEXT,
        Status ENUM('Active', 'Under Review', 'Archived'),
        FOREIGN KEY (PolicyOwner) REFERENCES user(ID),
        deleted Bool DEFAULT 0
    ";

    //QA Policy Incedent Table 
    // CorrectiveActionRecived can be a file
    public $QAPolicyIncidentTable = "ID INT AUTO_INCREMENT PRIMARY KEY,
    IncedentID INT NOT NULL,
    PolicyID INT NOT NULL,
    IncidentIssueTracking ENUM ('Active', 'Under Review', 'Decision Pending', 'Corrective Measure Assigned', 'Completed'),
    CorrectiveAction TEXT,
    CorrectiveActionRecived TEXT,
    FOREIGN KEY (PolicyID) REFERENCES policy(ID),
    deleted Bool DEFAULT 0
    ";

    //Permission Table
    public $PermissionTable = "ID INT AUTO_INCREMENT PRIMARY KEY, 
        TableName VARCHAR(30) NOT NULL,
        Role ENUM('Student', 'Instrutor', 'Program Co-ordinator', 'Qualtiy Assurance', 'Admin'),
        PermissionName ENUM('VIEW ONLY', 'ADD ONLY', 'MODIFY ONLY', 'REMOVE ONLY', 'ADD AND VIEW' , 'ADD AND MODIFY',
            'ADD AND REMOVE', 'VIEW AND MODIFY', 'VIEW AND REMOVE', 'MODIFY AND REMOVE', 'ADD, VIEW AND MODIFY', 
            'ADD, VIEW AND REMOVE', 'VIEW, MODIFY AND REMOVE', 'ADD, MODIFY, VIEW AND DELETE'),
        deleted Bool DEFAULT 0
    ";

}

?>