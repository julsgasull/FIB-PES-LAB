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
	@ApiModelProperty(notes = "The user's name", position = 1)
	private String name;
	@ApiModelProperty(notes = "The user's username", position = 2)
	private String username;
	@ApiModelProperty(notes = "The user's email", position = 3)
	private String email;
	@ApiModelProperty(notes = "The user's password", position = 4)
	private String password;
	@ApiModelProperty(notes = "The user's gender", position = 5)
	private String gender;
	@ApiModelProperty(notes = "The user's token. (null before assignment)", position = 6)
	@Column (length = 400)
	private String token;
	@ApiModelProperty(notes = "The user's number of helped users", position = 7)
	private int helpedUsers;
	@ApiModelProperty(notes = "The user's number of marked spots", position = 8)
	private int markedSpots;

	User() {}

	public User(String name, String username, String email, String password, String gender) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.token = null;
		this.helpedUsers = 0;
		this.markedSpots = 0;
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

	public String getUsername() {
		return username;
	}
	public void setUserName(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getGender() {  return gender; }

	public int getHelpedUsers() {
		return helpedUsers;
	}
	public void setHelpedUsers(int helpedUsers) {
		this.helpedUsers = helpedUsers;
	}

	public int getMarkedSpots() {
		return markedSpots;
	}
	public void setMarkedSpots(int markedSpots) {
		this.markedSpots = markedSpots;
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
	public void setPassword(String password) {
		this.password = password;
	}
}