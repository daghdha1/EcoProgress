<?php

class BaseView {

	/*
	* Reinicia el contador de la array a 0
	*
	* Lista<T> -->
	* 				addCount() 
	* <-- Lista<T>
	*/
    protected function addCount($data) {
        if(!empty($data)) {
            // nada
        } else {
            $data['meta']['count'] = 0;
        }
        return $data;
    }
}