package com.pesados.purplepoint.api.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class ConfigProperties {
	@Autowired
    private YAMLConfig myConfig;
	
	CommandLineRunner showConfigs() {
		return args -> {
	        System.out.println("using environment: " + myConfig.getEnvironment());
	        System.out.println("name: " + myConfig.getName());
	        System.out.println("servers: " + myConfig.getServers());
		};
	}
	
}
