package com.pesados.purplepoint.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PurplePointApplication {
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/v1/users/login").allowedOrigins("*");
			}
		};
	}
	
	public static void main(String[] args) {
		SpringApplication.run(PurplePointApplication.class, args);
	}

}
