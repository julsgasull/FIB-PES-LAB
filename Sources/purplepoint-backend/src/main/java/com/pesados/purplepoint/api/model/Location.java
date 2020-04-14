package com.pesados.purplepoint.api.model;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.persistence.*;

@Entity
@Table(name = "Locations")
public class Location {

    @Schema(description = "Id of the location.", required = true)
    private @Id
    @GeneratedValue
    Long id;
    @Schema(description = "Latitude.", required = true)
    private float latitude;
    @Schema(description = "Longitude.", required = true)
    private float longitude;
    @Schema(description = "Altitude.", required = true)
    private float altitude;
    @Schema(description = "Accuracy.", required = true)
    private float accuracy;
    @Schema(description = "Altitude Accuracy.", required = true)
    private float altitudeAccuracy;
    @Schema(description = "Heading.", required = true)
    private float heading;
    @Schema(description = "Speed.", required = true)
    private float speed;
    @Schema(description = "Timestamp of the moment the location was created.", required = true)
    private float timestamp;


    Location(float latitude, float longitude, float altitude, float accuracy, float altitudeAccuracy, float heading, float speed, float timestamp) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.accuracy = accuracy;
        this.altitudeAccuracy = altitudeAccuracy;
        this.heading = heading;
        this.speed = speed;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public float getLatitude() { return latitude; }
    public void setLatitude(float latitude) { this.latitude = latitude; }

    public float getAltitude() { return altitude; }
    public void setAltitude(float altitude) { this.altitude = altitude; }

    public float getAccuracy() { return accuracy; }
    public void setAccuracy(float accuracy) { this.accuracy = accuracy; }

    public float getAltitudeAccuracy() { return altitudeAccuracy; }
    public void setAltitudeAccuracy(float altitudeAccuracy) { this.altitudeAccuracy = altitudeAccuracy; }

    public float getHeading() { return heading; }
    public void setHeading(float heading) { this.heading = heading; }

    public float getSpeed() { return speed; }
    public void setSpeed(float speed) { this.speed = speed; }

    public float getTimestamp() { return timestamp; }
    public void setTimestamp(float timestamp) { this.timestamp = timestamp; }

    public float getLongitude() { return longitude; }
    public void setLongitude(float longitude) { this.longitude = longitude; }
}
