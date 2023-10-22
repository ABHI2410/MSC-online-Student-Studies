<?php
class UserController extends BaseController
{
    /** 
    * "/user/list" Endpoint - Get list of users 
    */
    public function listAction(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $arrUsers = $userModel->getUser($arrQueryStringParams);
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
     * "user/create" Endpoint - Create User
     */
    public function createAction(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $postData = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                // $postData = json_decode($postData, true); // Decode JSON data into an associative array
                if ($postData !== null) {
                    $userModel = new UserModel();
                    $status = $userModel->createUser($postData);
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

    /**
    * "user/update" Endpoint - Update User with PATCH
    */
    public function updateAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $uri = $this->getUriSegments();
        $id = end($uri);
        $putData = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'PATCH') {
            try {
                if ($putData !== false) {
                    $userModel = new UserModel();
                    $status = $userModel->updateUser($id,$putData); // Implement the updateUser method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'User updated successfully']);
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
    * "user/update" Endpoint - Update User with PUT
    */
    public function reformAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $putData = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                if ($putData !== false) {
                    $userModel = new UserModel();
                    $status = $userModel->reformUser($putData); // Implement the updateUser method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'User updated successfully']);
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
    * "user/delete" Endpoint - DELETE User
    */
    public function deleteAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $uri = $this->getUriSegments();
        $id = end($uri);

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                if ($id !== false) {
                    $userModel = new UserModel();
                    $status = $userModel->deleteUser($id); // Implement the updateUser method
                    if ($status === 200) {
                        $responseData = json_encode(['message' => 'User deleted successfully']);
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