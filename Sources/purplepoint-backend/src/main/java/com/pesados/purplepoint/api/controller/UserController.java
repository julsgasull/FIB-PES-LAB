package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.exception.WrongPasswordException;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")

public class UserController {
  private final UserService service;

  UserController(UserService service) {
    this.service = service;
  }

  @PostMapping("/users/login") 
  @ApiOperation(value = "Logs In a user",
                response = User.class)
  public User login(@RequestBody User aUser) throws WrongPasswordException {
	  	String email = aUser.getEmail();
	  	String pwd = aUser.getPassword();
	  	
		String token = getJWTToken(email);
		User user = this.service.getUserByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
		
		if (pwd.equals(user.getPassword())) {
			user.setToken(token);
		} else {
			throw new WrongPasswordException(pwd);
		}
		
		return service.saveUser(user);		
}
  
  private String getJWTToken(String email) {
		String secretKey = "adivinaestacrack";
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
  @ApiOperation(value = "Gets a list of all users",
                response = User.class)
  List<User> all() {
    return service.getAll();
  }

  @PostMapping("/users/register")
  @ApiOperation(value = "Creates a new, non-existing, user",
          response = User.class)
  User newUser(@ApiParam(value = "To create a new user please provide:\n- A valid e-mail \n- An username\n- An e-mail \n A password \n The user's gender")
               @RequestBody User newUser) {
    return service.saveUser(newUser);
  }

// Single item

  @GetMapping("/users/{id}")
  @ApiOperation(value = "Gets an especfic user",
          notes = "Provide an ID to look up for a specific user",
          response = User.class)
  User one(@ApiParam(value = "ID value for the user you want to look up", required = true)
           @PathVariable Long id) {

    return service.getUserById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

   @GetMapping("/users/email/{email}")
   @ApiOperation(value = "Gets an especfic user by its email",
           notes = "Provide an email to look up for a specific user",
           response = User.class)
   User emailUser(@ApiParam(value = "email value for the user you want to look up", required = true)
            @PathVariable String email) {
      System.out.println("tu madre");
       return service.getUserByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
   }


  @PutMapping("/users/{id}")
  @ApiOperation(value = "Update a user",
          notes = "Provide an ID to replace an existing user",
          response = User.class)
  User replaceUser(@ApiParam(value = "A new user object to replace the existing one please to create a new user provide:" +
                                     "\n- An ID\n- A name\n- An e-mail", required = true)
                   @RequestBody User newUser,
                   @ApiParam(value = "ID of the user to replace", required = true)
                   @PathVariable Long id) {

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
  @ApiOperation(value = "Deletes a user",
          notes = "Provide an ID to delete a specific user",
          response = User.class)
  void deleteUser(@ApiParam(value = "ID value for the user you want to delete", required = true)
                  @PathVariable Long id) {
    service.deleteUserById(id);
  }
}