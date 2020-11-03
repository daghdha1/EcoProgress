<?php

include_once __DIR__ . '/includes/tools.php';
include_once __DIR__ . '/includes/debugger.php';

// Registramos myAutoloader() como Callback que se ejecutará al intentar inicializar una clase que no existe
spl_autoload_register('myAutoloader');

// Implementamos myAutoloader(), la cual recibe el nombre de la clase que se intenta inicializar para incluirla (se utilizan expresiones regulares para comparar la cadena classname)
function myAutoloader($classname) {
    if (preg_match('/[a-zA-Z]+Controller$/', $classname)) {
        include_once __DIR__ . '/controllers/' . $classname . '.php';
        return true;
    } elseif (preg_match('/[a-zA-Z]+Model$/', $classname)) {
        include_once __DIR__ . '/models/' . $classname . '.php';
        return true;
    } elseif (preg_match('/[a-zA-Z]+Entity$/', $classname)) {
        include_once __DIR__ . '/entities/' . $classname . '.php';
        return true;
    } elseif (preg_match('/[a-zA-Z]+View$/', $classname)) {
        include_once __DIR__ . '/views/' . $classname . '.php';
        return true;
    } elseif ((strcmp('Request', $classname) === 0) || (strcmp('DbConnection', $classname) === 0)) {
        include_once __DIR__ . '/includes/' . $classname . '.php';
        return true;
    }
    return false;
}

// Tratamos la petición (Request)
$request = new Request();

// Obtenemos el nombre del controlador correspondiente (ej -> UsuariosController)
$controllerName = ucfirst($request->resource) . 'Controller';

// Si no existe el controlador solicitado, llama a myAutoloader() para incluirlo
if (class_exists($controllerName)) {
    // Creamos el controlador
    $controller = new $controllerName();
    // Definimos el método a utilizar en el controlador
    $actionName = $request->method . 'Action';
    // Llamamos al método seleccionado
    $controller->$actionName($request);
}