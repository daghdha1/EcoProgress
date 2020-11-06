<?php

/**
 * SINGLETON database connection
 *
 * @author EcoProgress Team 04
 */

class DbConnection {

	private static $conn;

	/**
	 * Establecemos una única conexión a la base de datos
	 *
	 * 					getConnection() <-- 
	 * <-- DbConnection
	 */    
    public static function getConnection() {
		// Si aún no existe la conexión, la creamos
        if(!isset(self::$conn)) {
            // Incluimos las constantes de conexión
            require_once __DIR__ . '\dbConfig.php';
            // Generamos la conexión
			self::$conn = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
            // Indicamos la codificación de carácteres
            self::$conn->set_charset("utf8");
        }

 		// Comprobamos si ha habido algún error
        if(!isset(self::$conn)) {
            throw new Exception('Database connection cannot be established');
        }
 
        // Devolvemos la conexión
        return self::$conn;
    }
 
    public function wakeup() {
        throw new Exception('Class  '.__CLASS__ . 'cannot be unserialized');
    }
 
    public function sleep() {
        throw new Exception('Class  '.__CLASS__ . 'cannot be serialized');
    }
 
    public function clone() {
        throw new Exception('Class  '.__CLASS__ . 'cannot be cloned');
    }

}