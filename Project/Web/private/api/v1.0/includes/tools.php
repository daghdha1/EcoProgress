<?php

// -------------------------------------------------------------------------------------- //
// -------------------------------------- REQUEST --------------------------------------- //

/*
* Texto -->
* 			  formatStrEntity()
* <-- Texto
*/
function formatStrEntity($str) {
	// Se quita la última letra (ej-> measures -> measure)
	return substr_replace($str, '', -1);
}

/*
* Entity<T>, Texto -->
* 			  			 isAnEntityOf()
* <-- V | F
*/
function isAnEntityOf($data, $name) {
	$entity = $name . 'Entity';
	return is_a($data, $entity, false);
}

/* 
* Comprueba si existen parámetros en la petición URI
*
* Lista<Texto> -->
*                    areThereURIParameters() <--
* <-- T | F
*/
function areThereParameters(&$params) {
    if (count($params) > 0) {
        return true;
    }
    return false;
}

function authenticateUser() {
	if(!isset($_COOKIE[session_id()])) {
    	echo "Cookie named '" . session_name() . "' is not set!";
	} else {
	    echo "Cookie '" . session_name() . "' is set!<br>";
	    echo "Value is: " . $_COOKIE[session_id()];
	}
}

// -------------------------------------------------------------------------------------------- //
// -------------------------------------- FUNCTIONALITIES --------------------------------------- //

/* 
* Devuelve el instante de tiempo del periodo seleccionado (ej. instante de tiempo hace 24 horas)
* Devuelve -1 si no encuentra un periodo válido 
*
* Texto -->
* 				getTimestampOfPeriod() <--
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

/**
 * Calcula la distancia recorrida
 *
 * @param float $latitudeFrom latitud del punto inicial 
 * @param float $longitudeFrom longitud del punto inicial
 * @param float $latitudeTo latitud del punto final
 * @param float $longitudeTo longitud del punto final
 * @param float $earthRadius Mradio de la tierra en m
 * @return float Distancia en metros sobre el globo
 */
function haversineDistanceCalculator ($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000) {
	// Convert from degrees to radians
	$latFrom = deg2rad($latitudeFrom);
	$lonFrom = deg2rad($longitudeFrom);
	$latTo = deg2rad($latitudeTo);
	$lonTo = deg2rad($longitudeTo);
  
	$latDelta = $latTo - $latFrom;
	$lonDelta = $lonTo - $lonFrom;
  
	$angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
	
	return $angle * $earthRadius;
  }

// --------------------------------------------------------------------------------------- //
// -------------------------------------- SECURITY --------------------------------------- //

/*
* Devuelve un número random entre un rango de valores indicado
*
* 			generateSecretCode() <--
* <-- N
*/
function generateSecretCode() {
	$rand = rand(10000, 30000);
	return $rand;
}

/*
* Devuelve el hash md5 como un número hexadecimal de 32 carácteres
*
* 				generateMd5Hash() <--
* <-- Texto
*/
function generateMd5Hash($value) {
	$hash = md5($value);
	return $hash;
}

/*
* Genera una cadena de texto aleatoria de 60 carácteres usando el algoritmo bcrypt
*
* 						generatePasswordHash() <--
* <-- Texto | False
*/
function generatePasswordHash($pw) {
	$pw_hashed = password_hash($pw, PASSWORD_DEFAULT);
	return $pw_hashed;
}

/*
* Comprueba si la contraseña enviada desde el formulario se corresponde con el pw hashed alojado en la db
*
* 						verifyPasswordHash() <--
* <-- Texto | False
*/
function verifyPasswordHash(&$pwForm, &$pwHashed) {
	return password_verify($pwForm, $pwHashed);
}

// ------------------------------------------------------------------------------------- //
// -------------------------------------- OTHERS --------------------------------------- //

/*
*  line() -->
*/
function line() {
	echo PHP_EOL;
}

/*
* Texto, Texto -->
* 					  debug() <--
* <-- Texto
*/
function debug($msg, $value) {
	echo $msg . '--> ' . $value;
	line();
}

/*
* Lista<Texto> -->
* 					removeElementsInStrArray() <--
* <-- Lista<Texto>
*/
function removeElementsInStrArray(&$array, $regex) {
	for ($i=0; $i < count($array); $i++) {
		if (preg_match($regex, $array[$i]) === 1) {
			unset($array[$i]);
		}
	}
}

