package com.pesados.purplepoint.api.model.report;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.pesados.purplepoint.api.model.location.Location;
import com.pesados.purplepoint.api.model.user.User;

import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "Report")
public class Report {
	
	
	@Schema(description = "Id of the report.", required = true)
	@Id
	@Column(name = "reportid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reportid;	
	@Schema(description = "Location of the report", required = true)
	@Column(name = "location")
	private Location location;	
	@Schema(description = "Reporter", required = true)
	@Column(name = "user")
	private User user;	
	
	public Report() {
		super();
	}
	
	public Report(Location loc, User usr) {
		this.location = loc;
		this.user = usr;
	}	
	
	public Long getId() {
		return this.reportid;
	}
	
	public void setId(Long id) {
		this.reportid = id;
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setUser(User usr) {
		this.user = usr;
	}
	
	public Location getLocation() {
		return this.location;
	}
	
	public void setLocation(Location loc) {
		this.location = loc;
	}
	
}
