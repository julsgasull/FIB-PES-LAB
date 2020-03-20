package com.pesados.purplepoint.api.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ServerSecurity extends WebSecurityConfigurerAdapter {
	  /**
	   * This section defines the user accounts which can be used for
	   * authentication as well as the roles each user has.
	   */
	
	// Pel tema del password encoder
	// https://mkyong.com/spring-boot/spring-security-there-is-no-passwordencoder-mapped-for-the-id-null/
	  @Override
	  public void configure(AuthenticationManagerBuilder auth) throws Exception {

	    auth.inMemoryAuthentication()
	      .withUser("isma1").password("{noop}1234").roles("USER").and()
	      .withUser("isma2").password("{noop}1234").roles("ADMIN");
	  }

	  /**
	   * This section defines the security policy for the app.
	   * - BASIC authentication is supported (enough for this REST-based demo)
	   * - /employees is secured using URL security shown below
	   * - CSRF headers are disabled since we are only testing the REST interface,
	   *   not a web one.
	   *
	   * NOTE: GET is not shown which defaults to permitted.
	   */
	  @Override
	  protected void configure(HttpSecurity http) throws Exception {

	    http
	      .httpBasic().and()
	      .authorizeRequests()
	        .antMatchers(HttpMethod.POST, "/api/v1/users").hasRole("ADMIN")
	        .antMatchers(HttpMethod.PUT, "/api/v1/users/**").hasRole("ADMIN")
	        .antMatchers(HttpMethod.PATCH, "/api/v1/users/**").hasRole("ADMIN")
	        .antMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasRole("ADMIN").and()
	      .csrf().disable();
	  }
}

