<?php
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (e.g., GET, POST, PUT, DELETE)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific HTTP headers in the request
header("Access-Control-Allow-Headers: Content-Type");

// Allow credentials to be sent in requests (e.g., cookies and HTTP authentication)
header("Access-Control-Allow-Credentials: true");

// Set the maximum age for preflight requests (in seconds)
header("Access-Control-Max-Age: 3600");
class BaseController{

    /** call method */
    public function __call($name,$arguments){
        $this->sendOutput('',array('HTTP/1.1 404 Not Found'));
    }

    /**Get URI elements*/
    protected function getUriSegments(){
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/',$uri);

        return $uri;
    }

    /**Get query string params */
    protected function getQueryStringParams(){
        parse_str($_SERVER['QUERY_STRING'], $query);
        return $query;
    }
    protected function getContentDataParams(){
        $content_type = $_SERVER['CONTENT_TYPE'];
        $post_data = [];           
        if (strpos($content_type, 'multipart/form-data') === 0) {
            if (isset($_FILES['files']) && is_array($_FILES['files'])) {
                $uploadedFiles = $_FILES['files'];
                $fileData = [];
    
                foreach ($uploadedFiles['name'] as $key => $filename) {
                    $tmp_name = $uploadedFiles['tmp_name'][$key];
                    $error = $uploadedFiles['error'][$key];
    
                    if ($error === UPLOAD_ERR_OK) {
                        $fileData[] = [
                            'name' => $filename,
                            'tmp_name' => $tmp_name,
                        ];
                    }
                }
                return $fileData;
            } else {
                echo "No files were uploaded.";
            }
        } elseif ($content_type === 'application/json') {
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);
            return $data;
        } elseif ($content_type === 'application/x-www-form-urlencoded') {
            $form_data = file_get_contents('php://input');
            parse_str($form_data, $dataArray);
            return $dataArray;
        } else {
            echo "Unsupported Content-Type: $content_type";
        }
    }
    /**send API output */
    protected function sendOutput($data,$httpHeaders=array()){
        header_remove('Set-Cookie');
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        echo $data;
        exit;
    }

    /**Data Validation */
    private function validateData($data){
        foreach($data as $key=> $value){
            if (str_contains($key,"Name")){
                $nameregex = "^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$";
                if (preg_match($value,$nameregex)){
                    continue;
                } else{
                    throw new Exception("Invalid Name");
                }
            } elseif (str_contains($key,"Email")){
                $emailregex = "/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD";
                if (preg_match($value,$emailregex)){
                    continue;
                } else{
                    throw new Exception("Invalid Email");
                }
            } elseif (str_contains($key,"Date")){
                $dateTime = DateTime::createFromFormat('Y-m-d H:i:s', $value);
                if ($dateTime === false) {
                    throw new Exception("Invalid date or datetime format: $value");
                } else {
                    $value = $dateTime;
                    continue;
                }
            } elseif (str_contains($key,"Phone")){
                $phoneregex = "^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$";
                if(preg_match($value,$phoneregex)){
                    continue;
                }else{
                    throw new Exception("Invalid Phone Number");
                }
            } else {
                //do nothing for other fields
                continue;
            }
        }
        return true;
    }
}
?>