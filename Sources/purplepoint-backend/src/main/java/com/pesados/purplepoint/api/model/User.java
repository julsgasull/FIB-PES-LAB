package com.pesados.purplepoint.api.model;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@ApiModel(description = "Stored details about a user")
public class User {
  
  @ApiModelProperty(notes = "The unique ID of the user", position = 0)
	private @Id @GeneratedValue Long id;
  @ApiModelProperty(notes = "The user's username", position = 1)
	private String name;
  @ApiModelProperty(notes = "The user's email", position = 2)
	private String email;
  @ApiModelProperty(notes = "The user's password", position = 3)
	private String password;
  @ApiModelProperty(notes = "The user's token. (null before assignment)", position = 4)
	@Column (length = 400)
  	private String token;

  User() {}

  public User(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = null;
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

	public void setToken(String token) {
		this.token = token;
	}
	public String getToken() {
		return token;
	}

	public String getPassword() {
		return password;
	}
}