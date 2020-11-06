package es.upv.gti.ecoprogress_app.io;

import android.util.Log;

import com.google.gson.JsonObject;

import java.util.ArrayList;

import es.upv.gti.ecoprogress_app.model.Measure;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public class AppAdapter {

    private static AppService APP_SERVICE;

    // --------------------------------------------------------------
    //                      getAppService() -->
    // <-- MyAppService
    // --------------------------------------------------------------
    public static AppService getAppService() {

        if (APP_SERVICE == null) {
            APP_SERVICE = new AppService() {

                // --------------------------------------------------------------
                //                      getMeasures() -->
                // <-- Lista<Measure>
                //
                // Obtiene todas las mediciones de la API REST.
                // --------------------------------------------------------------
                @Override
                public void getMeasures() {
                    Call<ArrayList<Measure>> call = ApiRestAdapter.getApiService().getMeasures();
                    call.enqueue(new Callback<ArrayList<Measure>>() {
                        @Override
                        public void onResponse(Call<ArrayList<Measure>> call, Response<ArrayList<Measure>> response) {
                            if (response.isSuccessful()) {
                                ArrayList<Measure> medicionesList = response.body();
                                Log.d(">>>>", "Size array of measures --> " + medicionesList.size());
                            }
                        }

                        @Override
                        public void onFailure(Call<ArrayList<Measure>> call, Throwable t) {

                        }
                    });
                }

                // --------------------------------------------------------------
                // <Measure> -->
                //                  postMeasure() -->
                // <-- <Measure>
                //
                // Envia una medida a la API REST y devuelve el mismo objeto como validación.
                // --------------------------------------------------------------
                @Override
                public void postMeasures(final Measure measure) {

                    Call<JsonObject> call = ApiRestAdapter.getApiService().postMeasures(
                            measure.getValue(),
                            measure.getTimestamp(),
                            measure.getLocation(),
                            measure.getSensorID()
                    );


                    Log.d(">>>>", measure.toString());
                    call.enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            if (response.isSuccessful()) {
                                JsonObject measure = response.body();
                                Log.d(">>>>","RESPONSE: "+ response.body());
                                Log.d(">>>>", "onResponse medicion has been inserted -- successfully");
                            }
                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Log.d(">>>>", "onResponse medicion hasn't been inserted -- failed!");
                            Log.d(">>>>", t.toString());
                        }
                    });
                }

            };
        }

        return APP_SERVICE;
    }
}

