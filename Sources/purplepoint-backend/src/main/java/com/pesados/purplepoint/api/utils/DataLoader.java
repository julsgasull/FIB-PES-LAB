package com.pesados.purplepoint.api.utils;

import com.pesados.purplepoint.api.PurplePointApplication;
import com.pesados.purplepoint.api.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
class LoadDatabase {
	private static final Logger logger = LoggerFactory.getLogger(PurplePointApplication.class);
  @Bean
  CommandLineRunner initDatabase(UserRepository repository) {
	  
    return args -> {
    };
    
  }
}