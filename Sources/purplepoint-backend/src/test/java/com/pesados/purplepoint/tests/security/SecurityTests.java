package com.pesados.purplepoint.tests.security;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import com.pesados.purplepoint.api.controller.UserController;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
class SecurityTests {
	private MockMvc mvc;
	
	@MockBean
	private UserService
	@Test
	void testAuthRequired() {
		//given
		// Unidentified user
		service.all
		//when
		
		//then
	}

}
