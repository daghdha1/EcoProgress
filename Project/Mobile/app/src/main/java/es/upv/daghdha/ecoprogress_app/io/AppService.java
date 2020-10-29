package es.upv.daghdha.ecoprogress_app.io;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

import es.upv.daghdha.ecoprogress_app.model.Measure;

public interface AppService {

    void getMeasures();

    void postMeasure(final Measure measure);

}