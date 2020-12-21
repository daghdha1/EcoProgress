<?php

/* 
* Comprueba si existen parámetros en la petición URI
*
* Lista<Texto> -->
*                   areThereURIParameters() <--
* <-- T | F
*/
function areThereURIParameters(&$params) {
    if (count($params) > 0) {
        return true;
    }
    return false;
}

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


/**
 * Esta todo en grados.
 * @param float $latitudeFrom latitud del punto inicial 
 * @param float $longitudeFrom longitud del punto inicial
 * @param float $latitudeTo latitud del punto final
 * @param float $longitudeTo longitud del punto final
 * @param float $earthRadius Mradio de la tierra en m
 * @return float Distancia en metros sobre el globo
 */

function haversineDistanceCalculator(
	$latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000) {
	// convert from degrees to radians
	$latFrom = deg2rad($latitudeFrom);
	$lonFrom = deg2rad($longitudeFrom);
	$latTo = deg2rad($latitudeTo);
	$lonTo = deg2rad($longitudeTo);
  
	$latDelta = $latTo - $latFrom;
	$lonDelta = $lonTo - $lonFrom;
  
	$angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
	
	return $angle * $earthRadius;
  }
