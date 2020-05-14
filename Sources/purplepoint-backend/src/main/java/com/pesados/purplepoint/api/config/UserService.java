package com.pesados.purplepoint.api.config;

import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService extends UserDetailsService {

	User registerUser(RegisterUserInit init);

}