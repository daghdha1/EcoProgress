package es.upv.daghdha.ecoprogress_app.io;

import android.util.Log;

import java.util.ArrayList;

import es.upv.daghdha.ecoprogress_app.MainActivity;
import es.upv.daghdha.ecoprogress_app.model.Measure;
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
                public void postMeasure(final Measure measure) {
                    Call<Measure> call = ApiRestAdapter.getApiService().postMeasure(measure);
                    Log.d(">>>>", measure.toString());
                    call.enqueue(new Callback<Measure>() {
                        @Override
                        public void onResponse(Call<Measure> call, Response<Measure> response) {
                            if (response.isSuccessful()) {
                                Measure measure = response.body();
                                Log.d(">>>>", "onResponse medicion has been inserted -- successfully");
                            }
                        }

                        @Override
                        public void onFailure(Call<Measure> call, Throwable t) {
                            Log.d(">>>>", "onResponse medicion hasn't been inserted -- failed!");
                            Log.d(">>>>", t.getMessage());
                        }
                    });
                }

            };
        }

        return APP_SERVICE;
    }
}

