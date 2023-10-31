<?php
header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class Controller extends BaseController{


    public function apiAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if($requestMethod == "OPTIONS"){
            $this->sendOutput(
                null,
                array(
                    'Content-Type: application/json', 
                    'HTTP/1.1 200 OK',
                    "Access-Control-Allow-Methods: POST,OPTIONS",
                    "Access-Control-Allow-Origin: *",
                    "Access-Control-Allow-Headers: Content-Type"
                    )
            );
            exit;
        }
        if (strtoupper($requestMethod) === 'POST') {
            try {
                $postData = $this->getContentDataParams();
                $formdata = $postData["formdata"];
                $userModel = new UserModel();
                try{
                    $result = $userModel->get('userLogin',['EmailID' => $formdata['EmailID'], 'deleted' => 0]);
                    $result = $result[0];
                    $storedHash = $result['Password'];
                    if (password_verify($formdata['Password'], $storedHash)) {
                        // Password is correct
                        // echo "Password is correct. Log the user in.";
                        // Your secret key for token signing
                        $secretKey = 'iwcqrugcheurhuicckefhaskef';

                        // Set the payload for the access token
                        $accessTokenData = [
                            "sub" => $result["ID"],
                            'iat' => time(),
                            "exp"=> time() + 3600,
                            "firstName" => $result["FirstName"],
                            "lastName" => $result["LastName"],
                        ];

                        // Set the payload for the refresh token
                        $refreshTokenData = [
                            "sub" => $result["ID"],
                            'iat' => time(),
                            "exp"=> time() + 7200,
                            "firstName" => $result["FirstName"],
                            "lastName" => $result["LastName"],
                        ];

                        // Generate the access token
                        $accessToken = JWT::encode($accessTokenData, $secretKey, 'HS256');

                        // Generate the refresh token
                        $refreshToken = JWT::encode($refreshTokenData, $secretKey, 'HS256');

                        // Return both tokens as a response
                        $responseData = [
                            "access_token" => $accessToken,
                            "refresh_token" => $refreshToken,
                            "role" => $result["Role"],
                        ];

                    } else {
                        // Password is incorrect
                        // echo "Password is incorrect. Access denied.";
                        $strErrorDesc = 'Password is incorrect. Access denied.';
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    }
                }catch (Error $e) {
                    $strErrorDesc = 'User not found';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
                
            }catch (Error $e) {
                $strErrorDesc = $e->getMessage().' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }

        } elseif($requestMethod == "OPTIONS") {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            exit;
        }
        // send output 
        if (!$strErrorDesc) {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            $this->sendOutput(
                json_encode($responseData),
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



    public function refreshAction(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) === 'POST') {
            try {
                $postData = $this->getContentDataParams();
                $formdata = $postData["formdata"];
                if (empty($formdata)) {
                    $strErrorDesc = ' Cant Validate';
                    $strErrorHeader = 'HTTP/1.1 401 Bad Request';
                } else {
                    $refreshToken = $formdata['refresh'];
                    $secretKey = 'iwcqrugcheurhuicckefhaskef';
                    $decodedRefreshToken = JWT::decode($refreshToken, new Key($secretKey, 'HS256'));
                    $currentTimestamp = time();
                    if ($decodedRefreshToken->exp < $currentTimestamp) {
                        // The refresh token has expired, handle it as needed (e.g., require the user to re-authenticate)
                        $strErrorDesc = 'Token Expired';
                        $strErrorHeader = 'HTTP/1.1 401 Bad Request';
                    } else {
                        // User information
                        $userId = $decodedRefreshToken->sub;
                        // Create a new access token
                        $accessTokenPayload = [
                            'sub' => $userId, // User ID
                            'iat' => $currentTimestamp, // Issued at timestamp
                            'exp' => $currentTimestamp + 3600, // Access token expiration time (e.g., 1 hour)
                        ];

                        $accessToken = JWT::encode($accessTokenPayload, $secretKey, 'HS256');
                        $userModel = new UserModel();
                        $result = $userModel->get('user',['ID' => $decodedRefreshToken->sub, 'deleted' => 0]);
                        // Now, $accessToken contains the new access token, which can be sent to the client.

                        $responseData = [
                            "access_token" => $accessToken,
                            "refresh_token" => $refreshToken,
                            "role" => $result[0]["Role"],
                        ];
                    }
                }
                
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }

        }
        // send output 
        if (!$strErrorDesc) {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            $this->sendOutput(
                json_encode($responseData),
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

    /** 
    * "/___/list" Endpoint - Get list of ___s 
    */
    
    public function listAction(){
        
        $uri = $this->getUriSegments();
        $tableName = $uri[2];
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET' || strtoupper($requestMethod) === 'OPTIONS') {
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
        if (strtoupper($requestMethod) == 'POST' || strtoupper($requestMethod) === 'OPTIONS') {
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

        if (strtoupper($requestMethod) == 'PATCH' || strtoupper($requestMethod) === 'OPTIONS') {
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

        if (strtoupper($requestMethod) == 'PUT' || strtoupper($requestMethod) === 'OPTIONS') {
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

        if (strtoupper($requestMethod) == 'DELETE' || strtoupper($requestMethod) === 'OPTIONS') {
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
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
            header("Access-Control-Allow-Methods: POST,OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            $this->sendOutput(json_encode(['error' => $strErrorDesc]), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    
}
?>