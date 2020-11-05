// -*-c++-*-

// --------------------------------------------------------------
//
// Jordi Bataller i Mascarell
// Adrián Soler Navarro
// 22-10-2020
//
// --------------------------------------------------------------

// https://learn.sparkfun.com/tutorials/nrf52840-development-with-arduino-and-circuitpython

// https://stackoverflow.com/questions/29246805/can-an-ibeacon-have-a-data-payload

// --------------------------------------------------------------
// --------------------------------------------------------------
#include <bluefruit.h>

#undef min // vaya tela, están definidos en bluefruit.h y  !
#undef max // colisionan con los de la biblioteca estándar


// --------------------------------------------------------------
// --------------------------------------------------------------
#include "LED.h"
#include "Monitor.h"

// --------------------------------------------------------------
// --------------------------------------------------------------
namespace Globales {
Monitor elMonitor (9600); // Velocidad 115200 o 9600 baudios ...
}; // namespace

// --------------------------------------------------------------
// --------------------------------------------------------------

#include "EmisoraBLE.h"
#include "Medidor.h"
#include "Publicador.h"

// --------------------------------------------------------------
// --------------------------------------------------------------

namespace Globales {
Medidor elMedidor; // Medición de datos
Publicador elPublicador; // Envío de datos al servidor
int inPin = 13;
}; // namespace

// --------------------------------------------------------------
// --------------------------------------------------------------
namespace Loop {
uint8_t loopCount = 0;
}; // namespace

// Variables para modo testeo
bool modoTest = false;
int16_t testCount = 0;
int actualState = 1;
int lastState = 1;

// ---------------------------------------------------------------------------------------------------------------------
// 																setup()
// ---------------------------------------------------------------------------------------------------------------------
void setup() {
	using namespace Globales;

	elMonitor.esperarDisponible();
	// Suspend Loop() to save power // suspendLoop();
	elPublicador.encenderEmisora();
	// Globales::elPublicador.laEmisora.pruebaEmision();
	delay(1000); // delay
	elMedidor.iniciarMedidor(9600);
	elMonitor.escribir( "---- setup() finalizado ---- \n " );
} // setup ()

// ---------------------------------------------------------------------------------------------------------------------
// 																loop()
// ---------------------------------------------------------------------------------------------------------------------
void loop () {
	using namespace Loop;
	using namespace Globales;

	actualState = digitalRead(Globales::inPin); // lectura input pin

	loopCount++;

	elMonitor.escribir( "\n---- loop(): empieza " );
	elMonitor.escribir( loopCount );
	elMonitor.escribir( "\n" );

	if (actualState == 0) { // Esta situacion se da cuando dejas de apretar el boton
		cambioDeEstado();
		testCount = 0;
	}

	esperar(1000);

	// Obtiene valor CO
	obteneryPublicarValorCO();

	lastState = actualState;

	elMonitor.escribir( "---- loop(): acaba **** " );
	elMonitor.escribir( loopCount );
  elMonitor.escribir( "--------------------------" );
  elMonitor.escribir( "--------------------------" );
	elMonitor.escribir( "\n" );

	esperar(5000);

} // loop ()

// --------------------------------------------------------------
// obteneryPublicarValorCO() -->
// --------------------------------------------------------------
void obteneryPublicarValorCO() {
	using namespace Loop;
	using namespace Globales;

	// Si el modo test está activado
	if (modoTest == true) {
		elMonitor.escribir("Estamos en modo test \n");

		testCount++;
		int16_t valorCO = testCount;

		elMonitor.escribir("El valor de CO es: ");
		elMonitor.escribir( testCount);
		elMonitor.escribir("\n");

		elPublicador.publicarCO(valorCO, loopCount, 1000); // intervalo de emisión
	} else {
		elMonitor.escribir("Estamos en modo normal \n");

		// mido, calculo y publico
		int16_t valorCO = elMedidor.medirCO();

		elMonitor.escribir("El valor de CO es: ");
		elMonitor.escribir(valorCO);

		elPublicador.publicarCO(valorCO, loopCount, 1000); // intervalo de emisión
	}
}

// --------------------------------------------------------------
// cambioDeEstado() -->
// --------------------------------------------------------------
void cambioDeEstado() {
	if (modoTest == false) {
		modoTest = true;
	} else {
		modoTest = false;
	}
}

// --------------------------------------------------------------
// --------------------------------------------------------------
