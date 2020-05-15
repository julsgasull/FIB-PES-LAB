package com.pesados.purplepoint.api.utils;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;

import com.pesados.purplepoint.api.PurplePointApplication;
import com.pesados.purplepoint.api.model.image.Image;
import com.pesados.purplepoint.api.model.image.ImageService;
import com.pesados.purplepoint.api.model.location.Location;
import com.pesados.purplepoint.api.model.report.Report;
import com.pesados.purplepoint.api.model.report.ReportService;
import com.pesados.purplepoint.api.model.user.User;
import com.pesados.purplepoint.api.model.user.UserService;

@Configuration
class LoadDatabase {
	private static final Logger logger = LoggerFactory.getLogger(PurplePointApplication.class);

    @Bean
  CommandLineRunner initImageDatabase(ImageService service) throws IOException {
      logger.info("Finding resource \"sample.jpg\"");
      Resource resource = new ClassPathResource("sample.jpg");
      logger.info("Converting resource \"sample.jpg\" to byte array");
      InputStream inputStream = resource.getInputStream();
      byte[] bdata = FileCopyUtils.copyToByteArray(inputStream);
      logger.info("Saving image in \"sample.jpg\" into DB");

      return args -> {
          logger.info("Preloading " + service.saveImage(new Image("sample.jpg","image/jpg",bdata)));
        };
  }


    @Bean
  CommandLineRunner initUserDatabase(UserService service) {
	  
    return args -> {
      logger.info("Preloading " + service.saveUser(new User("test", "test1","isma@gmail.com", "1234", "others")));
      logger.info("Preloading " + service.saveUser(new User("Bilbo Baggins", "Bilbo1","testmail1@gmail.com", "1234", "female")));
      logger.info("Preloading " + service.saveUser(new User("Frodo Baggins","Frodo1" , "testmail2@gmail.com", "5678", "male")));
    };
  }
    
    @Bean
    CommandLineRunner initMapDatabase(ReportService service) {
      return args -> {
        logger.info("Preloading " + service.saveReport(new Report((new Location((float)41.447615, (float)2.224420, (float)100, (float)0)), new User("tonto1", "tonto1@mail.com"))));
        logger.info("Preloading " + service.saveReport(new Report((new Location((float)41.415026309656994, (float)2.151603698730469, (float)-1, (float)-1)), new User("tonto2", "tonto2@mail.com"))));
        logger.info("Preloading " + service.saveReport(new Report((new Location((float)41.425597961179896, (float) 2.1958923339843754, (float)-1, (float)-1)), new User("tonto3", "tonto3@mail.com"))));
        logger.info("Preloading " + service.saveReport(new Report((new Location((float)41.39993938849367, (float)2.151260375976563, (float)-1, (float)-1)), new User("tonto4", "tont4o@mail.com"))));
      };
    }
    
    

}