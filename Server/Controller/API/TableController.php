<?php
class TableController extends BaseController
{
    /**
     * "user/create" Endpoint - Create User
     */
    public function createAction(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = $this->getContentDataParams();
                // $postData = json_decode($postData, true); // Decode JSON data into an associative array
                if ($postData !== null) {
                    $tableModel = new TableModel();
                    foreach ($postData as $tableName => $tableSchema) {
                        $status = $tableModel->newTable($tableName,$tableSchema);
                    }
                    if ($status === 200){
                        $responseData = json_encode(['message' => 'Table created successfully']);
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
