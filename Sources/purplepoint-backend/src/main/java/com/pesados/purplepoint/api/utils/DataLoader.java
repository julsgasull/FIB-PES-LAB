package com.pesados.purplepoint.api.utils;

import com.pesados.purplepoint.api.PurplePointApplication;
import com.pesados.purplepoint.api.model.image.Image;
import com.pesados.purplepoint.api.model.image.ImageService;
import com.pesados.purplepoint.api.model.user.User;
import com.pesados.purplepoint.api.model.user.UserRepository;
import com.pesados.purplepoint.api.model.user.UserService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;

@Configuration
class LoadDatabase {
	private static final Logger logger = LoggerFactory.getLogger(PurplePointApplication.class);
  @Bean
  CommandLineRunner initUserDatabase(UserService service) {

    return args -> {
      logger.info("Preloading " + service.saveUser(new User("test", "test1","isma@gmail.com", "1234", "others")));
      logger.info("Preloading " + service.saveUser(new User("Bilbo Baggins", "Bilbo1","testmail1@gmail.com", "1234", "female")));
      logger.info("Preloading " + service.saveUser(new User("Frodo Baggins","Frodo1" , "testmail2@gmail.com", "5678", "male")));
    };
  }
  @Bean
  CommandLineRunner initImageDatabase(ImageService service) throws IOException {
	  
	File file = new ClassPathResource("sample.svg").getFile();
	byte[] bytesArray = new byte[(int) file.length()]; 
	FileInputStream fis = new FileInputStream(file);
	fis.read(bytesArray); //read file into bytes[]
	fis.close();
    return args -> {
      logger.info("Preloading " + service.saveImage(new Image(file.getName(),"image/svg",bytesArray)));
    };
  }
}