package com.pesados.purplepoint.api.controller;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.rememberme.AbstractRememberMeServices;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.exception.WrongPasswordException;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@RestController
@RequestMapping("/api/v1")
public class UserController {
  private final UserService service;

  @ModelAttribute
  public void setResponseHeader(HttpServletResponse response) {
	  response.setHeader("Access-Control-Allow-Origin", "*");
  }
  
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
  
  @PutMapping("/users/refresh") 
  @ApiOperation(value = "Refreshes auth of a logged user",
                response = User.class)
  public User refresh(@RequestHeader("authorization") String unformatedJWT) {
		User user = this.service.getUserByToken(unformatedJWT).orElseThrow(() -> new UserNotFoundException(unformatedJWT));		
		String newToken = getJWTToken(user.getEmail());
		user.setToken(newToken);
		
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
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*5))/*5 minuts*/
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
  User newUser(@ApiParam(value = "To create a new user please provide:\n- A valid name \n- An username\n- An e-mail \n A password \n The user's gender")
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
	User replaceUserbyID(@ApiParam(value = "A new user object to replace the existing one please to create a new user provide:" +
			"\n- An ID\n- A name\n- An e-mail", required = true)
					 @RequestBody User newUser,
					 @ApiParam(value = "ID of the user to replace", required = true)
					 @PathVariable Long id) {

		return service.getUserById(id)
				.map(user -> {
					user.setName(newUser.getName());
					user.setUserName(newUser.getUsername());
					user.setEmail(newUser.getEmail());
					user.setPassword(newUser.getPassword());
					user.setGender(newUser.getGender());
					return service.saveUser(user);
				})
				.orElseGet(() -> {
					newUser.setId(id);
					return service.saveUser(newUser);
				});
	}


	@PutMapping("/users/email/{email}")
  @ApiOperation(value = "Update a user",
          notes = "Provide an email to replace an existing user",
          response = User.class)
  User replaceUserbyEmail(@ApiParam(value = "A new user object to replace the existing one please to create a new user provide:" +
                                     "\n- A name\n- An e-mail\n- A password\n-Gender")
                   @RequestBody User newUser,
                   @ApiParam(value = "email of the user to modify", required = true)
                   @PathVariable String email) {

    return service.getUserByEmail(email)
      .map(user -> {
        user.setName(newUser.getName());
        user.setUserName(newUser.getUsername());
		user.setEmail(newUser.getEmail());
        user.setPassword(newUser.getPassword());
        user.setGender(newUser.getGender());
		  return service.saveUser(user);
      })
      .orElseGet(() -> {
        newUser.setEmail(email);
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