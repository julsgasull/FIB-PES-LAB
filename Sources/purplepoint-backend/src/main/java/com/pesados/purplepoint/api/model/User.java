package com.pesados.purplepoint.api.model;

import lombok.Data;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@ApiModel(description = "Stored details about a user")
public class User {
	@ApiModelProperty(notes = "The unique ID of the user", position = 0)
	private @Id @GeneratedValue Long id;
	@ApiModelProperty(notes = "The user's name", position = 1)
	private String name;
	@ApiModelProperty(notes = "The user's email", position = 2)
	private String email;

	User() {}

  public User(String name, String email) {
    this.name = name;
    this.email = email;
  }

	public Long getID() { return id; }

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
}