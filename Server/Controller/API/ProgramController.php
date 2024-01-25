<?php
class ProgramController extends Controller
{
    public function createAction(){
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST' || strtoupper($requestMethod) === 'OPTIONS') {
            try {
                $postData = $this->getContentDataParams();
                $check = $this->validateData($postData);
                if ($postData !== null && $check === true) {
                    $userModel = new ProgramModel();

                    
                    $newarray = [
                        
                    ];
                    $postData = array_merge($postData,$newarray);
                    
                    $status = $userModel->create($tableName,$postData);
                    if ($status === 200){
                        $responseData = json_encode(['message' => 'User created successfully']);
                    } else{
                        $responseData = json_encode (['message' => 'Unexpected encounter']);
                    }                    
                } elseif ($postData === null){
                    $responseData = json_encode (['message' => 'empty data']);
                }else {
                    $strErrorDesc = 'Invalid JSON data in the request';
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