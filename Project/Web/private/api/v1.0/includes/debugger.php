<?php

/* Comprobación de array indexado o asociativo
*
* Lista<T> -->
*				isAssoc()
* <-- V | F 
*/
function isAssoc($array) {
     foreach(array_keys($array) as $key) {
         if (!is_int($key)) return true;
     }
     return false;
}

/* Muestra los valores de un array indexado
*
* Lista<T> -->
*				isAssoc()
* <-- Texto 
*/
function showIndexedArray($array) {
	if (!empty($array)) {
		for ($i=0; $i < count($array); $i++) { 
			echo $array[$i];
			echo "<br>";
		}
	} else echo "Array vacía";
}

/* Muestra los valores de un array asociativo
*
* Lista<T> -->
*				isAssoc()
* <-- Texto 
*/
function showAssociativeArray($array) {
	if (!empty($array)) {
		foreach ($array as $paramName => $paramValue) {
	        echo $paramName . ' = ';
	        echo $paramValue . ' , ';
    	}
    } else echo 'Array vacía';
}
