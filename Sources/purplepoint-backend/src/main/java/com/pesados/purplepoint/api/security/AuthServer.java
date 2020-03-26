package com.pesados.purplepoint.api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class AuthServer extends WebSecurityConfigurerAdapter {
    @Override
	protected void configure(HttpSecurity http) throws Exception {

	    http
		    .csrf().disable()
		    	.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
		    	.addFilterBefore(new CORSFilter(), UsernamePasswordAuthenticationFilter.class)
				.authorizeRequests()
			      	.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()//allow CORS option calls
			        .antMatchers(HttpMethod.POST, "/api/v1/users/login").permitAll()
			        .anyRequest().authenticated()
			    .and()
			    	.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());
    }

}

