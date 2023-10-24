<?php
// URL to send the POST request to
$url = "http://localhost/index.php/table/create";

// Data to send in the POST request
$data = [
    'user' => 'userTableSchema',
    'program' => 'ProgramTable',
    'programrequirements' => 'ProgramRequirements',
    'userprogramassociation' => 'UserProgramAssociation',
    'course' => 'courseTableSchema',
    'courseprogramassociation' => 'CourseProgramAssociation',
    'modules' => 'modulesTableSchema',
    'assignment' => 'assignmentTableSchema',
    'submission' => 'SubmissionTableSchema',
    'usercourseassociation' => 'UserCourseAssociation',
    'registrationcode' => 'RegistrationCodeTable',
    'chat' => 'ChatListTable',
    'chatmessages' => 'ChatMessagesTable',
    'exam' => 'ExamTable',
    'question' => 'QuestionTable',
    'answer' => 'AnswerTable',
    'coursereview' => 'CourseReviewTable',
    'programreview' => 'ProgramReviewTable',
    'policy' => 'QAPolicyTable',
    'policyincident' => 'QAPolicyIncidentTable',
    'permission' => 'PermissionTable',
];

// Create a context for the POST request
$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded",
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);
// Send the POST request and capture the response
$response = file_get_contents($url, false, $context);

// Check for errors
if ($response === false) {
    echo "Error sending POST request.";
} else {
    // Print the response
    echo $response;
}
?>
