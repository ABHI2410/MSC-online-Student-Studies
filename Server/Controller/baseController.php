<?php
header("Access-Control-Allow-Origin: *"); // Replace * with the specific origins allowed
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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
        $fileData = [];        
        if (strpos($content_type, 'multipart/form-data') === 0) {
            if (isset($_FILES['files']) && is_array($_FILES['files'])) {
                $uploadedFiles = $_FILES['files'];
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
                $post_data = ["files" => $fileData, "formdata" => $_POST];
                return $post_data;
            } else{
                $post_data = ["files" => $fileData, "formdata" => $_POST];
                return $post_data;
    
            }
        } elseif ($content_type === 'application/json') {
            $json_data = file_get_contents('php://input');            
            $data = json_decode($json_data, true);
            $post_data = ["files" => $fileData, "formdata" => $data];
            return $post_data;
        } elseif ($content_type === 'application/x-www-form-urlencoded') {
            $form_data = file_get_contents('php://input');
            parse_str($form_data, $dataArray);
            $post_data = ["files" => $fileData, "formdata" => $dataArray];
            return $post_data;
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
    public function validateData($data){
        foreach($data as $key=> $value){
            if (str_contains($key,"Name")){
                $nameregex = "/^[A-Za-z\s\-\'\.]+$/";
                if (preg_match($nameregex,$value)){
                    continue;
                } else{
                    return false;
                }
            } elseif (str_contains($key,"Email"))   {
                $emailregex = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
                if (preg_match($emailregex,$value)){
                    continue;
                } else{
                    return false;
                }
            } elseif (str_contains($key,"Date")){
                // Define the format of the ISO 8601 date-time string
                $format = "Y-m-d\TH:i:s.u\Z"; // This format corresponds to ISO 8601

                // Create a DateTime object from the ISO 8601 date-time string
                $dateTime = DateTime::createFromFormat($format, $value);

                // Check if the conversion was successful
                if ($dateTime instanceof DateTime) {
                    // Successfully converted to a DateTime object
                    continue;
                } else {
                    // Conversion failed, handle the error
                    return false;
                }
            } elseif (str_contains($key,"Phone")){
                $phoneregex = "/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/";
                if(preg_match($phoneregex,$value)){
                    continue;
                }else{
                    return false;
                }
            } else {
                //do nothing for other fields
                continue;
            }
        }
        // echo "Validation successfull";
        return true;
    }
}
?>