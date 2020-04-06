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
                    .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/api-docs/**").permitAll()
			      	.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()//allow CORS option calls
			        .antMatchers(HttpMethod.POST, "/api/v1/users/login").permitAll()
					.antMatchers(HttpMethod.POST, "/api/v1/users/register").permitAll()
					.antMatchers(HttpMethod.GET, "/api-docs/").permitAll()
					.antMatchers(HttpMethod.GET, "/swagger-ui/index.html").permitAll()
					.antMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()
					.antMatchers(HttpMethod.GET, "/swagger-ui-custom.html").permitAll()
					.antMatchers(HttpMethod.GET, "/api-docs.yaml").permitAll()
				.anyRequest().authenticated()
			    .and()
			    	.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());
    }
}

