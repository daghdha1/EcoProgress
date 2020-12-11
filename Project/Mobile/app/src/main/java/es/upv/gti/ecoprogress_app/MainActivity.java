package es.upv.gti.ecoprogress_app;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.gson.JsonObject;

import java.util.Locale;
import java.util.UUID;

import es.upv.gti.ecoprogress_app.io.AppAdapter;
import es.upv.gti.ecoprogress_app.model.Measure;
import es.upv.gti.ecoprogress_app.model.Beacon;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public class MainActivity extends AppCompatActivity {

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    private static String ETIQUETA_LOG = ">>>>";
    private String MY_STR_DEVICE_UUID = "ECO-PROGRESS-DEV";
    private int MY_API_VERSION = android.os.Build.VERSION.SDK_INT;
    private String USER_MAIL = "miguel@developer.com"; // set your mail for testing
    private String SENSOR_ID = "4"; // Maria(1), Adrian(2), Marta(3), Migui(4), Marcelo(5)

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    private ScanCallback scanCallback = null; // for api >= 21
    private BluetoothAdapter.LeScanCallback leScanCallback = null; // for api <= 19

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    private FusedLocationProviderClient mFusedLocationClient;
    private int locationRequestCode = 1000;

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    private int lastMeasureCount = 0; // Contador de última medida tomada
    private Measure currentMeasure; // Medicion actual

    // --------------------------------------------------------------
    // --------------------------------------------------------------

    Context ctx;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        createNotificationChannel();
        // Aquí empieza la busqueda de nuestro sensor BTLE
        this.searchThisBTLE(Utils.stringToUUID(MY_STR_DEVICE_UUID));

        ctx = getBaseContext();
        //AppAdapter.getAppService().getMeasures();
    } // onCreate()


    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "EcoProgress";
            String description = "Ecoprogress channel";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("EcoProgress", name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    // --------------------------------------------------------------
    // searchAllBTLE() -->
    // --------------------------------------------------------------
    private void searchAllBTLE() {
        boolean isBluetoothReadyToUse = BluetoothAdapter.getDefaultAdapter().isEnabled();
        if (isBluetoothReadyToUse) {
            callbackForBluetoothAdapterWithoutTarget();
            BluetoothAdapter.getDefaultAdapter().startLeScan(this.leScanCallback);
        } else {
            Log.d(MainActivity.ETIQUETA_LOG, "El servicio de bluetooth no está disponible! Actívalo!");
        }
    } // ()

    // --------------------------------------------------------------
    // UUID -->
    //          searchThisBTLE() -->
    // --------------------------------------------------------------
    private void searchThisBTLE(final UUID uuidTarget) {
        Log.d(ETIQUETA_LOG, "Buscando dispositivo con UUID!: " + uuidTarget.toString());

        boolean isBluetoothReadyToUse = BluetoothAdapter.getDefaultAdapter().isEnabled();
        if (isBluetoothReadyToUse) {
            // >= Lollipop (api 21 o mayor)
            if (MY_API_VERSION > android.os.Build.VERSION_CODES.KITKAT) {
                callbackForBluetoothLeScannerWithTarget(uuidTarget);
                BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().startScan(this.scanCallback);
            } else { // <= kitkat (api 19 o menor)
                callbackForBluetoothAdapterWithTarget(uuidTarget);
                BluetoothAdapter.getDefaultAdapter().startLeScan(this.leScanCallback);
            }
        } else {
            Log.d(MainActivity.ETIQUETA_LOG, "El servicio de bluetooth no está disponible! Actívalo!");
        }
    } // ()

    // --------------------------------------------------------------
    // stopSearchingForBTLE() -->
    // --------------------------------------------------------------
    private void stopSearchingForBTLE() {
        // >= Lollipop (api 21 o mayor)
        if (MY_API_VERSION > android.os.Build.VERSION_CODES.KITKAT) {
            if (this.scanCallback == null) return;
            BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().stopScan(this.scanCallback);
            this.scanCallback = null;
        } else { // <= kitkat (api 19 o menor)
            if (this.leScanCallback == null) return;
            BluetoothAdapter.getDefaultAdapter().stopLeScan(this.leScanCallback);
            this.leScanCallback = null;
        }
    } // ()

    private void publicarNotificacion(){

        Log.e(">>>>","Has clickado");
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MainActivity.this, "EcoProgress")
                .setSmallIcon(R.drawable.ic_notification_icon)
                .setContentTitle("¡¡Te estas alejando!!")
                .setContentText("Si sigues alejando vas a perder la señal")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(MainActivity.this);

        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(1, builder.build());
    }

    // --------------------------------------------------------------
    //  Beacon -->
    //                  aBeaconHasArrived() -->
    // --------------------------------------------------------------
    private void aBeaconHasArrived(final Beacon b) {
        // Comprobar si no es un beacon repetido
        String[] intValuesInStrOfMajor = Utils.bytesToIntInStr(b.getMajor()).split(":");
        int typeOfMeasure = Integer.parseInt(intValuesInStrOfMajor[0], 10);
        int currentMeasureCount = Integer.parseInt(intValuesInStrOfMajor[1], 10);
        if (this.lastMeasureCount != currentMeasureCount) {
            // Mostramos la información del beacon recibido
            showDeviceInfoBTLE(null, 0, b.getTotalBytes());
            // Guardamos el contador de la nueva medida
            this.lastMeasureCount = currentMeasureCount;
            // Generamos el nuevo objeto medida
            this.currentMeasure = new Measure();
            // Extraemos el nuevo valor y si es correcto, se guarda con valor != -1
            this.extractMeasure(b);
            if (this.currentMeasure.getValue() != -1) {
                // Obtiene posición de dispositivo móvil (ASÍNCRONO)
                this.extractLocation();
            } else {
                // medida incorrecta, algo está fallando en la lectura del sensor
                Log.d(ETIQUETA_LOG, "ERROR -------> algo está fallando en la lectura del sensor. VALOR NEGATIVO!");
            }
        }
    }

    // --------------------------------------------------------------
    //  Beacon -->
    //                  extractMeasure() -->
    //                                             <-- R | -1
    // --------------------------------------------------------------
    private void extractMeasure(final Beacon b) {
        double CO = Utils.bytesToInt(b.getMinor()); //valor tal cual viene del sensor
        double formattedCO;  //valor post procesado
        double maxValue = 40000;  //valor con margen desde el valor máximo posible y dañino a la vida que es (34500 = 94)
        double minValue = 0; //Valor mínimo posible
        double calibrationCoeficient = 0.0027345; // este coeficiente sale del estudio de nuestros datos y es la relación directa con los valores reales que se obtienen en las estaciones de medición
        Log.d(ETIQUETA_LOG, "CO_value from sensor without conversion-------> " + CO);
        if (CO >= minValue || CO < maxValue) {
            formattedCO = CO * calibrationCoeficient; // este valor está tratado según los estándares de valores reales
            //Log.d(ETIQUETA_LOG, "-------------------");
            //Log.d(ETIQUETA_LOG, "CO_value post conversion is-------> " + formattedCO);
        } else {
            formattedCO = -1;
        }
        this.currentMeasure.setValue(formattedCO);
        // TEST PARA ENVIAR UNA MEDICION CON UN VALOR EXACTO
        // this.currentMeasure.setValor(TEST_VALUE);
    }

    // --------------------------------------------------------------
    //                  extractLocation() -->
    //                                             <-- R, R | Nada
    // --------------------------------------------------------------
    private void extractLocation() {
        // Preparando solicitud de localización
        if (mFusedLocationClient == null) {
            mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        }
        // Solicita permiso para los dispositivos con sistema operativo Android 6 o anteriores (obligatorio)
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // Se solicitan los permisos
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, this.locationRequestCode);
        } else {
            // Se activa listener de obtención de localización
            mFusedLocationClient.getCurrentLocation(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY, null).addOnSuccessListener(this, location -> {
                if (location != null) {
                    //Log.d(MainActivity.ETIQUETA_LOG, "Localización obtenida!");
                    // Se guarda la posición tomada en el objeto medición
                    this.currentMeasure.setLocation(String.format(Locale.getDefault(), "%s,%s", location.getLatitude(), location.getLongitude()));
                    //Log.d(MainActivity.ETIQUETA_LOG, String.format(Locale.getDefault(), "%s,%s", location.getLatitude(), location.getLongitude()));
                    // Se envian las medidas a la API Rest
                    sendMeasure(this.currentMeasure);
                } else {
                    Log.d(MainActivity.ETIQUETA_LOG, "Localización no disponible!!!!");
                }
            });
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case 1000: {
                // Si la petición es cancelada, devuelve una array vacía
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    extractLocation();
                } else {
                    Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show();
                }
                break;
            }
        }
    }

    // --------------------------------------------------------------
    //  Measure -->
    //                  sendMeasure() -->
    // --------------------------------------------------------------
    private void sendMeasure(Measure measure) {
        long currentTimeSeconds = System.currentTimeMillis() / 1000;
        measure.setTimestamp(Math.toIntExact(currentTimeSeconds));
        measure.setSensorID(SENSOR_ID);

        Log.d(">>>>", "Se va a enviar una medicion con valor:" + measure.getValue());

        JsonObject json = new JsonObject();
        json.addProperty("value", measure.getValue());
        json.addProperty("timestamp", measure.getTimestamp());
        json.addProperty("location", measure.getLocation());
        json.addProperty("sensorID", measure.getSensorID());

        AppAdapter.getAppService().postMeasures(measure);
    }

    // FOR TESTING
    private void sendTestMeasure() {
        Measure measure = new Measure(1.554, 1637737373, "000001234 - -0.12345678", "2");
        //AppAdapter.getAppService().postMeasures(measure);
    }

    // --------------------------------------------------------------
    // BluetoothDevice, Z, Lista<Byte> -->
    //                                      showDeviceInfoBTLE() <--
    // --------------------------------------------------------------
    private void showDeviceInfoBTLE(BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {
        Log.d(ETIQUETA_LOG, " ****************************************************");
        Log.d(ETIQUETA_LOG, " ****** DISPOSITIVO DETECTADO BTLE ****************** ");
        Log.d(ETIQUETA_LOG, " ****************************************************");
        //Log.d(ETIQUETA_LOG, " nombre = " + bluetoothDevice.getName());
        //Log.d(ETIQUETA_LOG, " dirección = " + bluetoothDevice.getAddress());
        //Log.d(ETIQUETA_LOG, " rssi = " + rssi);
        //Log.d(ETIQUETA_LOG, " bytes = " + new String(bytes));
        //Log.d(ETIQUETA_LOG, " bytes (" + bytes.length + ") = " + Utils.bytesToHexString(bytes));

        Beacon tib = new Beacon(bytes);

        //Log.d(ETIQUETA_LOG, " ----------------------------------------------------");
        //Log.d(ETIQUETA_LOG, " prefijo  = " + Utils.bytesToHexString(tib.getPrefix()));
        //Log.d(ETIQUETA_LOG, " advFlags = " + Utils.bytesToHexString(tib.getAdvFlags()));
        //Log.d(ETIQUETA_LOG, " advHeader = " + Utils.bytesToHexString(tib.getAdvHeader()));
        //Log.d(ETIQUETA_LOG, " companyID = " + Utils.bytesToHexString(tib.getCompanyID()));
        //Log.d(ETIQUETA_LOG, " iBeacon type = " + Integer.toHexString(tib.getBeaconType()));
        //Log.d(ETIQUETA_LOG, " iBeacon length 0x = " + Integer.toHexString(tib.getBeaconLength()) + " ( " + tib.getBeaconLength() + " ) ");
        //Log.d(ETIQUETA_LOG, " uuid  = " + Utils.bytesToHexString(tib.getUUID()));
        //Log.d(ETIQUETA_LOG, " uuid  = " + Utils.bytesToString(tib.getUUID()));
        //Log.d(ETIQUETA_LOG, " major  = " + Utils.bytesToHexString(tib.getMajor()) + "( " + Utils.bytesToIntInStr(tib.getMajor()) + " ) ");
        //Log.d(ETIQUETA_LOG, " minor  = " + Utils.bytesToHexString(tib.getMinor()) + "( " + Utils.bytesToInt(tib.getMinor()) + " ) ");
        //Log.d(ETIQUETA_LOG, " txPower  = " + Integer.toHexString(tib.getTxPower()) + " ( " + tib.getTxPower() + " )");
        //Log.d(ETIQUETA_LOG, " ****************************************************");

    } // ()

    // ------------------------------------------------------------------------------------------------------------------------------------ //
    // ------------------------------------------------------------- CALLBACKS ------------------------------------------------------------ //
    // ------------------------------------------------------------------------------------------------------------------------------------ //


    // --------------------------------------------------------------
    // UUID -->
    //          callbackForBluetoothLeScannerWithTarget() -->
    //
    // Nota: callback para api >= 21
    // --------------------------------------------------------------
    private void callbackForBluetoothLeScannerWithTarget(final UUID uuidTarget) {
        this.scanCallback = new ScanCallback() {
            // Se dispara cada vez que encuentra un dispositivo
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                super.onScanResult(ScanSettings.SCAN_MODE_BALANCED, result); // Escaneo de ciclo más alto ya que la app se ejecuta en segundo plano (ahorro de energía)
                // Dispostivo encontrado
                byte[] data = result.getScanRecord().getBytes();
                Beacon tib = new Beacon(data);
                String strUUIDEncontrado = Utils.bytesToString(tib.getUUID());
                //Log.d(ETIQUETA_LOG, "API >= 21 - UUID dispositivo encontrado!!!!: " + tib.getUUID().toString());
                if (strUUIDEncontrado.compareTo(Utils.uuidToString(uuidTarget)) == 0) {
                    // Detenemos la búsqueda de dispositivos
                    // detenerBusquedaDispositivosBTLE();
                    // Mostramos la información de dispositivo

                    //Log.d(">>>>",result.getRssi()+"");
                    //Log.d(">>>>",getEstimatedDistanceFromDevice(result.getRssi())+"");
                    if(getEstimatedDistanceFromDevice(result.getRssi()) >= 5){
                        publicarNotificacion();
                    }
                    showDeviceInfoBTLE(result.getDevice(), result.getRssi(), data);
                    // Tratamos el beacon obtenido
                    aBeaconHasArrived(tib);
                } else {
                    //Log.d(MainActivity.ETIQUETA_LOG, " * UUID buscado >" + Utils.uuidToString(uuidTarget) + "< no concuerda con este uuid = >" + strUUIDEncontrado + "<");
                }
            } // onScanResult()

            // Se dispara si el escaneo falla por otros motivos
            @Override
            public void onScanFailed(int errorCode) {
                super.onScanFailed(errorCode);
                Log.d(ETIQUETA_LOG, "Error de callback con id: " + errorCode);
            } // onScanFailed()

        }; // new scanCallback
    }

    private int getEstimatedDistanceFromDevice(int rssi){

        if(rssi > -50){
            return 0;
        }
        if(rssi<-50 && rssi>-61){
            return 1;
        }
        if(rssi<=-61 && rssi>-70) {
            return 2;
        }
        if(rssi<=-70 && rssi>-75){
            return 3;
        }
        if(rssi<=-75 && rssi > -82){
            return 4;
        }
        if(rssi <=-82){
            return 5;
        }
    return 0;
    }

    // --------------------------------------------------------------
    // UUID -->
    //          callbackForBluetoothAdapterWithTarget() -->
    //
    // Nota: callback para api <= 19
    // --------------------------------------------------------------
    private void callbackForBluetoothAdapterWithTarget(final UUID uuidTarget) {
        this.leScanCallback = new BluetoothAdapter.LeScanCallback() {

            @Override
            public void onLeScan(BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {
                // Dispostivo encontrado
                Beacon b = new Beacon(bytes);
                String strUUIDFound = Utils.bytesToString(b.getUUID());
                //Log.d(ETIQUETA_LOG, "API <= 19 - UUID dispositivo encontrado!!!!: " + b.getUUID().toString());
                if (strUUIDFound.compareTo(Utils.uuidToString(uuidTarget)) == 0) {
                    // Detenemos la búsqueda de dispositivos
                    //detenerBusquedaDispositivosBTLE();
                    // Mostramos la información de dispositivo
                    showDeviceInfoBTLE(bluetoothDevice, rssi, bytes);
                    // Tratamos el beacon obtenido
                    aBeaconHasArrived(b);
                } else {
                    Log.d(MainActivity.ETIQUETA_LOG, " * UUID buscado >" + Utils.uuidToString(uuidTarget) + "< no concuerda con este uuid = >" + strUUIDFound + "<");
                }
            } // onLeScan()

        }; // new LeScanCallback
    }

    // --------------------------------------------------------------
    //
    // callbackForBluetoothAdapterWithoutTarget() -->
    //
    // --------------------------------------------------------------
    private void callbackForBluetoothAdapterWithoutTarget() {
        this.leScanCallback = new BluetoothAdapter.LeScanCallback() {
            @Override
            public void onLeScan(BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {
                // Dispostivo encontrado
                //Log.d(ETIQUETA_LOG, "Dentro del trigger onLeScan! - Dispositivo encontrado!");
                showDeviceInfoBTLE(bluetoothDevice, rssi, bytes);
            } // onLeScan()
        }; // new LeScanCallback
    }

} // class

// --------------------------------------------------------------
// --------------------------------------------------------------
