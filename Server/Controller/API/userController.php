<?php
class UserController extends Controller
{
    public function createAction(){
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = $this->getContentDataParams();
                $check = $this->validateData($postData);
                if ($check === true){
                    if ($postData !== null) {
                        $userModel = new UserModel();

                        $result = $userModel->get($tableName,array(['EnrollYear'] => date('Y')));
                        $len = str_pad(count($result), 3, '0', STR_PAD_LEFT);
                        $currentMonth = date('n'); // Get the current month (1 to 12)
                        if ($currentMonth == 1) {
                            $term = 'Spring';
                            $val = 01;
                        } elseif ($currentMonth == 5) {
                            $term = 'Summer';
                            $val = 02;
                        } elseif ($currentMonth == 8) {
                            $term = 'Fall';
                            $val = 03;
                        } else {
                            $term = 'Other'; // Set a default term for other months
                        }
                        $UserID = substr(date('Y'), -2) . strval($val) . $len;
                        $currentDate = date('Y');
                        $providedDate = $postData['DateOfBirth'];
                        $providedDateYear = $providedDate->format("Y");
                        $Age = intval($currentDate)-intval($providedDateYear);
                        $newarray = [
                            'UserID' => $UserID,
                            'Semester' => $term,
                            'EnrollYear' => date('Y'),
                            'Age' => $Age
                        ];
                        $postData = array_merge($postData,$newarray);
                        
                        $status = $userModel->create($tableName,$postData);
                        if ($status === 200){
                            $responseData = json_encode(['message' => 'User created successfully']);
                        } else{
                            $strErrorDesc = ' Something went wrong! Please contact support.';
                            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                        }                    
                    } elseif ($postData === null){
                        $responseData = json_encode (['message' => 'empty data']);
                        $strErrorHeader = 'HTTP/1.1 404 No Found';
                    }else {
                        $strErrorDesc = 'Invalid JSON data in the request';
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    }
                } else{
                    $strErrorDesc = 'Invalid data in the request';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
    
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
    
}
?>