package es.upv.daghdha.ecoprogress_app.io;

import java.util.ArrayList;

import es.upv.daghdha.ecoprogress_app.model.Measure;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public interface ApiRestService {

    @Headers({
            "Accept: application/json",
            "Content-Type: application/json"
    })

    @GET("measures")
    Call<ArrayList<Measure>> getMeasures();

    @POST("measure")
    Call<Measure> postMeasure(@Body final Measure measure);

}
