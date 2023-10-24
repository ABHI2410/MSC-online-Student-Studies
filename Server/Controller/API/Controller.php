<?php
class Controller extends BaseController
{
    /** 
    * "/___/list" Endpoint - Get list of ___s 
    */
    public function listAction(){
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new Model();
                $arrUsers = $userModel->get($tableName,$arrQueryStringParams);
                $responseData = json_encode($arrUsers);
                
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
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

    /**
     * "__/create" Endpoint - Create ___
     */
    public function createAction(){
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = $this->getContentDataParams();
                // $postData = json_decode($postData, true); // Decode JSON data into an associative array
                if ($postData !== null) {
                    $userModel = new Model();
                    $status = $userModel->create($tableName,$postData);
                    if ($status === 200){
                        $responseData = json_encode(['message' => 'Created successfully']);
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

    /**
    * "___/update" Endpoint - Update ___ with PATCH
    */
    public function updateAction() {
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $uri = $this->getUriSegments();
        $id = end($uri);

        if (strtoupper($requestMethod) == 'PATCH') {
            try {
                $patchData = $this->getContentDataParams();
                $check = $this->validateData($patchData);
                if ($patchData !== false && $check === true) {
                    $userModel = new Model();
                    $status = $userModel->update($tableName,$id,$patchData); // Implement the updateUser method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'Updated successfully']);
                    } else {
                        $responseData = json_encode(['message' => 'Unexpected encounter']);
                    }
                } elseif ($patchData === false) {
                    $responseData = json_encode(['message' => 'empty data']);
                } else {
                    $strErrorDesc = 'Invalid data in the request';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
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
            $this->sendOutput(json_encode(['error' => $strErrorDesc]), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    /**
    * "___/update" Endpoint - Update ___ with PUT
    */
    public function reformAction() {
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'PUT') {
            $putData = $this->getContentDataParams();
            $check = $this->validateData($putData);
            try {
                if ($putData !== false && $check === true) {
                    $userModel = new Model();
                    $status = $userModel->reform($tableName,$putData); // Implement the updateUser method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'Updated successfully']);
                    } else {
                        $responseData = json_encode(['message' => 'Unexpected encounter']);
                    }
                } elseif ($putData === false) {
                    $responseData = json_encode(['message' => 'empty data']);
                } else {
                    $strErrorDesc = 'Invalid data in the request';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
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
            $this->sendOutput(json_encode(['error' => $strErrorDesc]), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    /**
    * "___/delete" Endpoint - DELETE ___
    */
    public function deleteAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $uri = $this->getUriSegments();
        $id = end($uri);
        $tableName = $uri[2];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                if ($id !== false) {
                    $userModel = new Model();
                    $status = $userModel->delete($tableName,$id); // Implement the update___ method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'Deleted successfully']);
                    } else {
                        $responseData = json_encode(['message' => 'Unexpected encounter']);
                    }
                } elseif ($id === false) {
                    $responseData = json_encode(['message' => 'no data provided']);
                } else {
                    $strErrorDesc = 'Invalid data in the request';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
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
            $this->sendOutput(json_encode(['error' => $strErrorDesc]), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    
}
?>