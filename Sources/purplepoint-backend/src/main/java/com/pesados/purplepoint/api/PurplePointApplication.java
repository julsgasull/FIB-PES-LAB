package com.pesados.purplepoint.api;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;


@SpringBootApplication
@EnableScheduling
public class PurplePointApplication {

	public static final Logger logger = LoggerFactory.getLogger("com.example");
	static String FB_BASE_URL="https://example.firebaseio.com";

	public static void main(String[] args) throws FileNotFoundException {
		SpringApplication.run(PurplePointApplication.class, args);
		try {
			FileInputStream serviceAccount =
					new FileInputStream("google/purplepoint-f2abf-firebase-adminsdk-unh8s-38169d9605.json");

			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.setDatabaseUrl("https://purplepoint-f2abf.firebaseio.com/")
					.build();
			if(FirebaseApp.getApps().isEmpty()) { //<--- check with this line
				FirebaseApp.initializeApp(options);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Bean
	public StandardServletMultipartResolver multipartResolver() {
	    return new StandardServletMultipartResolver();
	}
}
