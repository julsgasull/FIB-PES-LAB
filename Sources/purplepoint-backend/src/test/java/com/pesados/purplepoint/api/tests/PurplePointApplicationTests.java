package com.pesados.purplepoint.api.tests;

import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pesados.purplepoint.api.controller.UserController;

@SpringBootTest
class PurplePointApplicationTests {

	@Autowired
	private UserController ctl;
	
	@Test
	void contextLoads() throws Exception {
		assertTrue(ctl != null);
	}
	

}
