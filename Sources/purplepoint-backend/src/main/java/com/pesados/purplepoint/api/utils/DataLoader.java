package com.pesados.purplepoint.api.utils;

import com.pesados.purplepoint.api.PurplePointApplication;
import com.pesados.purplepoint.api.model.User;
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
      logger.info("Preloading " + repository.save(new User("test", "test1","isma@gmail.com", "1234", "others")));
      logger.info("Preloading " + repository.save(new User("Bilbo Baggins", "Bilbo1","testmail1@gmail.com", "1234", "female")));
      logger.info("Preloading " + repository.save(new User("Frodo Baggins","Frodo1" , "testmail@gmail.com", "5678", "male")));

    };
  }
}