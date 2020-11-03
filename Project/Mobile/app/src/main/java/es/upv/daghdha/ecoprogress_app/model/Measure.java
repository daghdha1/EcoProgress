package es.upv.daghdha.ecoprogress_app.model;

import androidx.annotation.NonNull;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public class Measure {
    private double value;
    private int timestamp;
    private String location;
    private String sensorID;

    public Measure() {
    }

    public Measure(double value, int timestamp, String location, String sensorID) {
        this.value = value;
        this.timestamp = timestamp;
        this.location = location;
        this.sensorID = sensorID;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSensorID() {
        return sensorID;
    }

    public void setSensorID(String sensorID) {
        this.sensorID = sensorID;
    }

    @NonNull
    @Override
    public String toString() {
        return "Measure data --> Value: " + this.getValue() + ", Timestamp: " + this.getTimestamp() + ", Location: " + this.getLocation() + ", sensorID: " + this.getSensorID();
    }

}
