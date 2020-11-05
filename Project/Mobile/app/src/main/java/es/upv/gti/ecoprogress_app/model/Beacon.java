package es.upv.gti.ecoprogress_app.model;

import java.util.Arrays;

// -----------------------------------------------------------------------------------
// @author: EcoProgress Team 04
// -----------------------------------------------------------------------------------
public class Beacon {
    private byte[] prefix = null; // 9 bytes
    private byte[] uuid = null; // 16 bytes
    private byte[] major = null; // 2 bytes
    private byte[] minor = null; // 2 bytes
    private byte txPower = 0; // 1 byte

    private byte[] totalBytes;

    private byte[] advFlags = null; // 3 bytes
    private byte[] advHeader = null; // 2 bytes
    private byte[] companyID = new byte[2]; // 2 bytes
    private byte beaconType = 0; // 1 byte
    private byte beaconLength = 0; // 1 byte

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getPrefix() {
        return prefix;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getUUID() {
        return uuid;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getMajor() {
        return major;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getMinor() {
        return minor;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte getTxPower() {
        return txPower;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getTotalBytes() {
        return totalBytes;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getAdvFlags() {
        return advFlags;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getAdvHeader() {
        return advHeader;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte[] getCompanyID() {
        return companyID;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte getBeaconType() {
        return beaconType;
    }

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public byte getBeaconLength() {
        return beaconLength;
    }

    // -------------------------------------------------------------------------------
    // Lista<Byte> -->
    //                  IBeacon() -->
    // -------------------------------------------------------------------------------
    public Beacon(byte[] bytes) {
        this.totalBytes = bytes;

        prefix = Arrays.copyOfRange(totalBytes, 0, 8 + 1); // 9 bytes
        uuid = Arrays.copyOfRange(totalBytes, 9, 24 + 1); // 16 bytes
        major = Arrays.copyOfRange(totalBytes, 25, 26 + 1); // 2 bytes
        minor = Arrays.copyOfRange(totalBytes, 27, 28 + 1); // 2 bytes
        txPower = totalBytes[29]; // 1 byte

        advFlags = Arrays.copyOfRange(prefix, 0, 2 + 1); // 3 bytes
        advHeader = Arrays.copyOfRange(prefix, 3, 4 + 1); // 2 bytes
        companyID = Arrays.copyOfRange(prefix, 5, 6 + 1); // 2 bytes
        beaconType = prefix[7]; // 1 byte
        beaconLength = prefix[8]; // 1 byte

    } // ()
} // class
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------


