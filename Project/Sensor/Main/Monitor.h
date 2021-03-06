
// -*- mode: c++ -*-

// ----------------------------------------------------------
// Jordi Bataller i Mascarell
// 2019-07-07
// ----------------------------------------------------------

#ifndef MONITOR_H_INCLUIDO
#define MONITOR_H_INCLUIDO

// ----------------------------------------------------------
// ----------------------------------------------------------
class Monitor {

public:
	// .........................................................
	// .........................................................
	Monitor (const long baudios) {
		Serial.begin(baudios); // Puerto serie hardware para comunicación con el monitor serie
	} // ()
// ()

// .........................................................
// .........................................................
	void esperarDisponible() {
		while (!Serial) {
			delay(10);
		}
	} // ()

// .........................................................
// .........................................................
	template<typename T>
	void escribir (T mensaje) {
		Serial.print(mensaje);
	} // ()

}; // class Monitor

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
#endif
