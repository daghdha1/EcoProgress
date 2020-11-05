<?php

/*
* Texto -->
* 			formatStrEntity()
* <-- Texto
*/
function formatStrEntity($str) {
	// Salvo que el string sea location, se quita la última letra (ej-> measures -> measure)
	/*if ($str !== 'location') {
	
	}
	return $str;*/

	return substr_replace($str, '', -1);
}