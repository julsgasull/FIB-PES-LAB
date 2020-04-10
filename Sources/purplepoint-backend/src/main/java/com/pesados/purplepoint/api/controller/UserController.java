package com.pesados.purplepoint.api.controller;


import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.exception.WrongPasswordException;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


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

  @Operation(summary = "Login User with E-mail and Password", description = "Login an %user% with an exising correct combination of password and email", tags = {"login"})
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "successful login",
                  content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class))))})
  @PostMapping(value = "/users/login", produces = { "application/json", "application/xml" })
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
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*5)) // 5 minutos
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}

  // Refresh token
  @Operation(summary = "Refreshes token", description = "Gives an user a new api-key token which replaces the old one.", tags = {"log out"})
  @ApiResponses(value = {
          @ApiResponse(responseCode = "201", description = "Token refreshed",
                  content = @Content(schema = @Schema(implementation = User.class))),
          @ApiResponse(responseCode = "400", description = "Invalid input")})
  @PutMapping(value = "/users/refresh", consumes = { "application/json", "application/xml" })
  public User refresh(
          @Parameter(description = "unformatedJWT", required=true) @PathVariable String unformatedJWT
  ) {
      User user = this.service.getUserByToken(unformatedJWT).orElseThrow(() -> new UserNotFoundException(unformatedJWT));
      String newToken = getJWTToken(user.getEmail());
      user.setToken(newToken);

      return service.saveUser(user);
  }

  // Register new user

  @Operation(summary = "Add a new user", description = "Adds a new user to the database with the information provided. To create a new user please provide:\n- A valid e-mail \n- An username\n- An e-mail \n- A password \n- The user's gender", tags = { "register" })
  @ApiResponses(value = {
         @ApiResponse(responseCode = "201", description = "User created",
                  content = @Content(schema = @Schema(implementation = User.class))),
         @ApiResponse(responseCode = "400", description = "Invalid input"),
         @ApiResponse(responseCode = "409", description = "User already exists") })
  @PostMapping(value = "/users/register", consumes = { "application/json", "application/xml" })
  User newUser(
          @Parameter(description="User to add. Cannot null or empty.",
                  required=true, schema=@Schema(implementation = Contact.class))
          @Valid @RequestBody User userNew
  ) {
    return service.saveUser(userNew);
  }

  // Get all users

  @Operation(summary = "Get All Users", description = "Get ", tags = {"users"})
  @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))) })
  @GetMapping(value = "/users/", produces = { "application/json", "application/xml"})
  List<User> all() {
    return service.getAll();
  }

// Get a single user

  @Operation(summary = "Get User By ID", description = "Get User from an existing ID value you want to look up", tags = {"users"})
  @ApiResponses(value = {
           @ApiResponse(responseCode = "200", description = "successful operation",
                  content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))) })
  @GetMapping(value = "/users/{id}", produces = { "application/json", "application/xml"})
  User idUser(
          @Parameter(description="ID of the contact to search.", required = true)
          @PathVariable long id) {
    return service.getUserById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @Operation(summary = "Get User By email", description = "Get User from an existing email you want to look up", tags = {"users"})
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "successful operation",
                  content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))) })
  @GetMapping(value = "/users/email/{email}", produces = { "application/json", "application/xml"})
  User emailUser(
          @Parameter(description="email of the contact to search.", required = true)
          @PathVariable String email) {
       return service.getUserByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
   }

// Update users
  @Operation(summary = "Update an existing User by Id", description = "Update the Name, username, email, password, gender given the ID of an existing user", tags = { "users" })
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "successful operation"),
          @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
          @ApiResponse(responseCode = "401", description = "Unauthorized"),
          @ApiResponse(responseCode = "404", description = "User not found"),
          @ApiResponse(responseCode = "405", description = "Validation exception") })
  @PutMapping("/users/{id}")
  User replaceUserbyID(@Parameter(description="New information for the user.", required = true)
                        @RequestBody User newUser,
                      @Parameter(description="id of the user to replace.", required = true)
                        @PathVariable long id
  ) {
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

  @Operation(summary = "Update an existing User by email", description = "Update the Name, username, email, password, gender given the email of an existing user", tags = { "users" })
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "successful operation"),
          @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
          @ApiResponse(responseCode = "401", description = "Unauthorized"),
          @ApiResponse(responseCode = "404", description = "User not found"),
          @ApiResponse(responseCode = "405", description = "Validation exception") })
  @PutMapping(value = "/users/email/{email}", consumes = { "application/json", "application/xml" })
  User replaceUserbyEmail( @Parameter(description="New information for the user.", required = true)
                           @RequestBody User newUser,
                           @Parameter(description="Email of the user to replace.", required = true)
                           @PathVariable String email
  ) {
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

  // Delete user
  @Operation(summary = "Delete an user", description = "", tags = { "users" })
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "successful operation"),
          @ApiResponse(responseCode = "404", description = "User not found") })
  @DeleteMapping(path="/users/{id}")
  void deleteUser(
          @Parameter(description="Id of the contact to be delete. Cannot be empty.",
                  required=true)
          @PathVariable long id
  ) {
    service.deleteUserById(id);
  }
}