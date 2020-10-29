package es.upv.daghdha.ecoprogress_app.model;

import androidx.annotation.NonNull;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------

public class Measure {
    private double value;
    private int instant;
    private String location;
    private String user;

    public Measure() {
    }

    public Measure(double value, int instant, String location, String user) {
        this.value = value;
        this.instant = instant;
        this.location = location;
        this.user = user;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public int getInstant() {
        return instant;
    }

    public void setInstant(int instant) {
        this.instant = instant;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @NonNull
    @Override
    public String toString() {
        return "Measure data --> Value: " + this.getValue() + ", Time: " + this.getInstant() + ", Location: " + this.getLocation() + ", User: " + this.getUser();
    }

}
