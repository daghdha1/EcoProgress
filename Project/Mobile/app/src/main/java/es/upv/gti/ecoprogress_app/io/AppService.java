package es.upv.gti.ecoprogress_app.io;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

import com.google.gson.JsonObject;

import es.upv.gti.ecoprogress_app.model.Measure;

public interface AppService {

    void getMeasures();

    void postMeasures(final Measure measure);

}