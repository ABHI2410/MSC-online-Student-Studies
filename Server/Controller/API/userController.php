<?php
header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
class UserController extends Controller
{
    public function createAction(){
        
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) === 'POST' || strtoupper($requestMethod) === 'OPTIONS') {
            try {
                $postData = $this->getContentDataParams();
                $files = $postData['files'];
                $formadata = $postData['formdata'];
                $check = $this->validateData($postData['formdata']);
                if ($check === true){
                    if ($postData !== null) {
                        $userModel = new UserModel();
                        $result = $userModel->get($tableName,['EnrollYear' => date('Y')]);
                        $len = str_pad(count($result)+1, 5, '0', STR_PAD_LEFT);
                        $currentMonth = date('n'); // Get the current month (1 to 12)
                        if ($currentMonth >= 1 && $currentMonth <= 4) {
                            $term = 'Spring';
                            $val = 01;
                        } elseif ($currentMonth >= 5 && $currentMonth <= 7) {
                            $term = 'Summer';
                            $val = 02;
                        } elseif ($currentMonth >= 8 && $currentMonth <= 12) {
                            $term = 'Fall';
                            $val = 03;
                        } else {
                            $term = 'Other'; // Set a default term for other months
                        }
                        $UserID = substr(date('Y'), -2) . str_pad(strval($val), 2, '0', STR_PAD_LEFT) . $len;
                        $providedDate = $formadata['DateOfBirth'];
                        $format = "Y-m-d\TH:i:s.u\Z";
                        $dateTime = DateTime::createFromFormat($format, $providedDate);
                        $formadata['DateOfBirth'] = $dateTime->format('Y-m-d');;
                        $currentDate = new DateTime();
                        $age = $currentDate->diff($dateTime)->y;
                        $newarray = [
                            'UserID' => $UserID,
                            'Term' => $term,
                            'Age' => $age
                        ];
                        $postData = array_merge($formadata,$newarray);
                        
                        unset($postData['RegistrationCode']);
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
    
}
?>