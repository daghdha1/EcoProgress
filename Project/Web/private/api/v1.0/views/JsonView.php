<?php

class JsonView extends BaseView {

    public function render($content) {
    	header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
        header('Content-Type: application/json; charset=utf-8');
        // Devolvemos al cliente web la respuesta formateada
        echo json_encode($content);
    }

}