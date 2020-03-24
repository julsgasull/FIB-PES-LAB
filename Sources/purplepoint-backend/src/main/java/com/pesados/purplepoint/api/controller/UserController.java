package com.pesados.purplepoint.api.controller;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.POJONode;
import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.exception.WrongPasswordException;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserRepository;
import com.pesados.purplepoint.api.model.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/api/v1")

public
class UserController {
  private final UserService service;

  UserController(UserService service) {
    this.service = service;
  }

  @PostMapping("/users/login") 
  public User login(@RequestBody User aUser) throws WrongPasswordException {
	  	String email = aUser.getEmail();
	  	String pwd = aUser.getPassword();
	  	
		String token = getJWTToken(email);
		User user = this.service.getUserByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
		
		if ( pwd.equals(user.getPassword())) {
			user.setToken(token);
		} else {
			throw new WrongPasswordException(pwd);
		}
		
		return service.saveUser(user);		
}
  
  private String getJWTToken(String email) {
		String secretKey = "superSecretKey";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("ROLE_USER");
		
		String token = Jwts
				.builder()
				.setId("ppJWT")
				.setSubject(email)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
  
  @GetMapping("/users")
  List<User> all() {
    return service.getAll();
  }

  @PostMapping("/users")
  User newUser(@RequestBody User newUser) {
    return service.saveUser(newUser);
  }

  // Single item

  @GetMapping("/users/{id}")
  User one(@PathVariable Long id) {

    return service.getUserById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/users/{id}")
  User replaceUser(@RequestBody User newUser, @PathVariable Long id) {

    return service.getUserById(id)
      .map(user -> {
        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        return service.saveUser(user);
      })
      .orElseGet(() -> {
        newUser.setId(id);
        return service.saveUser(newUser);
      });
  }

  @DeleteMapping("/users/{id}")
  void deleteUser(@PathVariable Long id) {
    service.deleteUserById(id);
  }
}