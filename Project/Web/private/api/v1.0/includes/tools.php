<?php

/*
* Texto -->
* 			formatStrEntity()
* <-- Texto
*/
function formatStrEntity($str) {
	// Se quita la última letra (ej-> measures -> measure)
	return substr_replace($str, '', -1);
}