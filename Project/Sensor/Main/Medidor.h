// -*- mode: c++ -*-

#ifndef MEDIDOR_H_INCLUIDO
#define MEDIDOR_H_INCLUIDO

// ------------------------------------------------------
// ------------------------------------------------------
class Medidor {

public:

  // .....................................................
  // constructor
  // .....................................................
  Medidor() {
  } // ()

  // .....................................................
  // .....................................................
  void iniciarMedidor(const long baudios) {
    Serial1.begin(baudios); // Puerto serie hardware para comunicación con el sensor, 8 bit, no parity, 1 stop bit, 3.3V
  } // ()

  // .....................................................
  // Recibe una cadena del sensor digital en forma de secuencia ASCII.
  // .....................................................
  int16_t medirCO() {
    int sensorData[11];
    Serial1.print('\r'); // Inicia una lectura del sensor. Ahora hay que espera a que nos envíe algo de vuelta!
    Serial.println("Lectura del sensor iniciada...esperando...");
    leerDatosDeSensor(& sensorData[0]);
    for (int j = 0; j < 11; j++) {Serial.println(sensorData[j]);}
    int16_t valueToConvert = sensorData[1]; // concentration of CO in ppb
    // float valueConverted = valueToConvert/1000; // ppb to ppm (NOT HERE, AFTER SEND THE BEACON)
    return valueToConvert;
  } // ()

// .....................................................
// .....................................................
private:

// .....................................................
//           leerDatosDeSensor() <-
// [Z] <-
// .....................................................

  void leerDatosDeSensor(int * sensorData) {
    int pos = 0;
    for (int pos = 0; pos < 11; pos++) {
      while (!Serial1) delay(10);
      sensorData[pos] = Serial1.parseInt();
    }
  } // ()

}; // class

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
#endif

/*
SN [XXXXXXXXXXXX]
PPB [0:999999]
TEMP [-99:99]
RH [0:99]
RawSensor[ADCCount]
TempDigital
RHDigital
Day [0:99]
Hour [0:23]
Minute [0:59]
Second [0:59]
*/
