package es.upv.gti.ecoprogress_app.io;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public class ApiRestAdapter {

    private static ApiRestService API_SERVICE;
    private static final String PROTOCOL_TARGET = "http";
    private static final String IP_SERVER_TARGET = "192.168.43.29";

    // --------------------------------------------------------------
    //                      getApiService() -->
    // <-- MyApiService
    // --------------------------------------------------------------
    public static ApiRestService getApiService() {

        // Creamos un interceptor y le indicamos el log level a usar
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        // Asociamos el interceptor a las peticiones
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);

        String baseUrl = PROTOCOL_TARGET + "://" + IP_SERVER_TARGET + "/ecoprogress/Project/Web/private/api/v1.0/";

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        if (API_SERVICE == null) {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .client(httpClient.build()) // <-- usamos el log level
                    .build();
            API_SERVICE = retrofit.create(ApiRestService.class);
        }

        return API_SERVICE;
    }

}
