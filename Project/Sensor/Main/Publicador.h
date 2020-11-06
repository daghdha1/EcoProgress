// -*- mode: c++ -*-

// --------------------------------------------------------------
// Jordi Bataller i Mascarell
// --------------------------------------------------------------

#ifndef PUBLICADOR_H_INCLUIDO
#define PUBLICADOR_H_INCLUIDO

// --------------------------------------------------------------
// --------------------------------------------------------------
class Publicador {

private:

	uint8_t beaconUUID[16] = {
		'E', 'C', 'O', '-', 'P', 'R', 'O', 'G',
		'R', 'E', 'S', 'S', '-', 'D', 'E', 'V'
	};

	EmisoraBLE laEmisora {
		"EcoProgressDeviceBTLE", //  nombre emisora
		0x004c, // fabricanteID (Apple)
		4 // txPower
	};

	const int RSSI = -53; // por poner algo, de momento no lo uso

public:

	enum MedicionesID  {
		CO = 11,
		TEMPERATURA = 12,
		RUIDO = 13
	};

	// ............................................................
	// ............................................................
	Publicador( ) {} // ()

	// ............................................................
	// ............................................................
	void encenderEmisora() {
		(*this).laEmisora.encenderEmisora();
	} // ()

	// ............................................................
	// ............................................................
	void publicarCO( int16_t valorCO, uint8_t contador, long tiempoEspera ) {

		//
		// 1. empezamos anuncio
		//
		uint16_t major = (MedicionesID::CO << 8) + contador;
		(*this).laEmisora.emitirAnuncioIBeacon( (*this).beaconUUID, // uuid
		                                        major, // major (8 bits CO + 8 bits contador [256 valores])
		                                        valorCO, // minor (valor CO)
		                                        (*this).RSSI // rssi
		                                      );

		/*
		Globales::elPuerto.escribir( "   publicarCO(): valor=" );
		Globales::elPuerto.escribir( valorCO );
		Globales::elPuerto.escribir( "   contador=" );
		Globales::elPuerto.escribir( contador );
		Globales::elPuerto.escribir( "   todo="  );
		Globales::elPuerto.escribir( major );
		Globales::elPuerto.escribir( "\n" );
		*/

		//
		// 2. esperamos el tiempo que nos digan
		//
		delay(tiempoEspera);

		//
		// 3. paramos anuncio
		//
		(*this).laEmisora.detenerAnuncio();
	} // ()

}; // class

// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
#endif
