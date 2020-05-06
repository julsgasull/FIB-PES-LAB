package com.pesados.purplepoint.api.model.alarm;

import com.pesados.purplepoint.api.model.location.Location;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;


@Entity
@Table(name = "Alarms")
public class Alarm {
	@Schema(description = "Id of the alarm.", required = true)
	private @Id @GeneratedValue Long alarmId;

	@Schema(description = "Username of the user who has made the alarm.", required = true)
	private String username;

	@Schema(description = "Location of the user.", required = true)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="locationId")
	private Location location;

	public Alarm() {}

	public Alarm(String username, Location location) {
		this.username = username;
		this.location = location;
	}

	public Long getAlarmId() {
		return alarmId;
	}

	public void setAlarmId(Long alarmId) {
		this.alarmId = alarmId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
}