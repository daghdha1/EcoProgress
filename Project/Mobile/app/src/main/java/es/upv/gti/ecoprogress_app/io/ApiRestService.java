package es.upv.gti.ecoprogress_app.io;

import com.google.gson.JsonObject;

import java.util.ArrayList;

import es.upv.gti.ecoprogress_app.model.Measure;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
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

    @FormUrlEncoded
    @POST("measures")
    Call<JsonObject> postMeasures(@Field("value") double value,
                               @Field("timestamp") int timestamp,
                               @Field("location") String location,
                               @Field("sensorID") String sensorID);

}
