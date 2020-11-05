<?php

class Request {

	public $method;
    public $uriElements;
    public $resource;
    public $format;
    public $parameters;

    /*
	*	__construct() -->
    */
    public function __construct() {
        // Recuperamos el método de la petición
        $this->method = strtolower($_SERVER['REQUEST_METHOD']);
        // Recuperamos el recurso solicitado
        $uri = explode('v1.0/',parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];
        $this->uriElements = explode('/', $uri);
        $this->resource = strtolower(array_shift($this->uriElements));

        /*echo '-----------------';
        echo '<br>';
        echo 'REQUEST URI --> ' . $_SERVER['REQUEST_URI'];
        echo '<br>';
        echo 'PATH_INFO --> ' . $_SERVER['PATH_INFO'];
        echo '<br>';
        echo 'method --> ' . $this->method;
        echo '<br>';
        echo 'URI --> ' . $uri;
        echo '<br>';
        echo 'uriElements --> ' . $this->uriElements;
        echo '<br>';
        echo 'resource --> ' . $this->resource;
        echo '<br>';*/

        // Recuperamos los parámetros
        $this->parseIncomingParams();
        // Seteamos el formato por defecto 'json'
        $this->format = 'json';
        // Si existe otro formato enbebido, lo sobreescribimos
        if(isset($this->parameters['format'])) {
            $this->format = $this->parameters['format'];
        }
        return true;
    }

    /* Extraemos los parámetros de la petición en función de cómo vengan (query, uri, body, body'formData', headers)
    *
	*						parseIncomingParams() -->
	*	<-- Lista<Texto>
    */
    private function parseIncomingParams() {
        $parameters = array();

        /*================================
        =              GET               =
        ================================*/
    
        // QUERY
        // En primer lugar, si existen, guardamos parámetros de la QUERY
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parameters);
        }

        // URI
        // Si existen parametros en la URI
        if (!empty($this->uriElements)) {
            // Recorro el array uriElements
            for ($i=0; $i < count($this->uriElements); $i++) {
                // Guardo pares de valores
                if (isset($this->uriElements[$i], $this->uriElements[$i+1])) {
                    $parameters[$this->uriElements[$i]] = $this->uriElements[++$i];
                }
            }
        }
        
        /*================================
        =        POST, PUT, DELETE       =
        ================================*/

        // BODY - FORM DATA
        // Ya que GET no contenía 'Content-Type', lo inicializamos a falso
        $contentType = false;
        // Si existe un encabezado 'Content-Type' en la petición, lo seteamos
        if(isset($_SERVER['CONTENT_TYPE'])) {
            $contentType = $_SERVER['CONTENT_TYPE'];
        }

        // Obtenemos los datos del body o body 'Form Data' disponibles en cada caso
        switch($contentType) {
            // Si vienen codificados en texto plano o JSON, guardamos la array asociativa devuelta
            case 'text/plain':
            case 'application/json':
                $parameters = json_decode(file_get_contents('php://input'), true);
                break;
            // Si vienen como application/x-www-form-urlencoded o multipart/form-data-encoded
            case !false:
                $parameters = $_POST;
        }

        // Guardamos los parámetros obtenidos
        $this->parameters = $parameters;
        
    }
}