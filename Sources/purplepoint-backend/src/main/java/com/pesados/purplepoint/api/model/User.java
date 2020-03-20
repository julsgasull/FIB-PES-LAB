package com.pesados.purplepoint.api.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
    public enum Role {USER, ADMIN}
    
	private @Id @GeneratedValue Long id;
	private String name;
	private String email;

	  User() {}

  public User(String name, String email) {
    this.name = name;
    this.email = email;
  }
  
  public Long getId() {
		return id;
	}
	
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