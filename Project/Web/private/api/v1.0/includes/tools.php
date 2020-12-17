<?php

/* 
* Devuelve el instante de tiempo del periodo seleccionado (ej. instante de tiempo hace 24 horas)
* Devuelve -1 si no encuentra un periodo válido 
*
* Texto -->
* 				getTimestampOfPeriod()
* <-- N | -1
*/
function getTimestampOfPeriod($period) {
	switch ($period) {
		case 'hour':
			$targetSeconds = time() - (60 * 60);
			break;
		case 'day':
			$targetSeconds = time() - (24 * 60 * 60);
			break;
		case 'week':
			$targetSeconds = time() - (7 * 24 * 60 * 60);
			break;
		case 'month':
			$targetSeconds = time() - (30 * 7 * 24 * 60 * 60);
			break;
		default:
			$targetSeconds = -1;
			break;
	}
	return $targetSeconds;
}

/*
* Texto -->
* 			formatStrEntity()
* <-- Texto
*/
function formatStrEntity($str) {
	// Se quita la última letra (ej-> measures -> measure)
	return substr_replace($str, '', -1);
}

/*
* Lista<Texto> -->
* 					removeElementsInStrArray()
* <-- Lista<Texto>
*/
function removeElementsInStrArray(&$array, $regex) {
	for ($i=0; $i < count($array); $i++) {
		if (preg_match($regex, $array[$i]) === 1) {
			unset($array[$i]);
		}
	}
}