<?php
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
}
?>