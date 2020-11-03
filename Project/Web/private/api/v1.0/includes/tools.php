<?php

/*
* Texto -->
* 			formatStrEntity()
* <-- Texto
*/
function formatStrEntity($str) {
	// Si en vez de quitar la última letra, se necesitan quitar más
	/*if (($str === '???') || ($str === '???')) {
		return substr_replace($str, '', -2);
	}*/
	
	return substr_replace($str, '', -1);
}