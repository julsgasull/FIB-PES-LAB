package com.pesados.purplepoint.api.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pesados.purplepoint.api.PurplePointApplication;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserRepository;

import lombok.extern.slf4j.Slf4j;



@Configuration
@Slf4j
class LoadDatabase {
	private static final Logger logger = LoggerFactory.getLogger(PurplePointApplication.class);
  @Bean
  CommandLineRunner initDatabase(UserRepository repository) {
	  
    return args -> {
    	logger.info("Preloading " + repository.save(new User("Bilbo Baggins", "testmail1@gmail.com")));
    	logger.info("Preloading " + repository.save(new User("Frodo Baggins", "testmail@gmail.com")));
    };
  }
}