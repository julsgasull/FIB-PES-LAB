package com.pesados.purplepoint.api.tests.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Before
    public void setUp(){
        // given
        userService.saveUser(new User("test", "isma@gmail.com", "1234"));
    }
	
	
    @Test
    public void shouldReturnUnauthorized() throws Exception {
    	
    	this.mockMvc.perform(get("/api/v1/users")).andExpect(status().is(401));
    }
    
    @Test
    public void shouldReturnCredentials() throws Exception {	
    	
    	JSONObject user = new JSONObject();
    	user.put("email", "isma@gmail.com");
    	user.put("password", "1234");
    	
    	this.mockMvc.perform(MockMvcRequestBuilders
    						.post("/api/v1/users/login")
    						.contentType("application/json")
    						.content(user.toString()))
    						.andExpect(status().isOk());
    }
    
    @Test
    public void shouldBeAbleToAccesResourcesWithCredentials() throws Exception {
    	//login
    	JSONObject user = new JSONObject();
    	user.put("email", "isma@gmail.com");
    	user.put("password", "1234");
    	
    	MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders
							    						.post("/api/v1/users/login")
							    						.contentType("application/json")
							    						.content(user.toString()))
							    						.andExpect(status().isOk())
							    						.andReturn();
    	
    	JSONObject respUser = new JSONObject(response.getResponse().getContentAsString());
    	String token =((String) respUser.get("token"));
    	
    	this.mockMvc.perform(get("/api/v1/users").header("Authorization",token))
    				.andDo(MockMvcResultHandlers.print())
    				.andExpect(status().is(200));

    }

}
