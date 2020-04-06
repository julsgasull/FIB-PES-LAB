package com.pesados.purplepoint.api.tests.controller;

develop/back
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
develop/back
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;

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
    public void shouldBeAbleToAccessResourcesWithCredentials() throws Exception {
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

	@Test
	public void shouldReturnNewUser() throws Exception {
		JSONObject user = new JSONObject();
		user.put("name", "amandi");
		user.put("password", "1234");
		user.put("email", "amandi@gmail.com");
		user.put("gender", "female");

		this.mockMvc.perform(MockMvcRequestBuilders
				.post("/api/v1/users/register")
				.contentType("application/json")
				.content(user.toString()))
				.andExpect(status().isOk());
	}

	@Test
	public void shouldBeAbleToAccesUserByEmailWihCredentials() throws Exception {
		// Login with mockup user in the database.
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

		this.mockMvc.perform(get("/api/v1/users/email/isma@gmail.com").header("Authorization",token))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(200));
	}

	@Test
	public void shouldReturnUserinfo() throws Exception {
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

		String user_bd = "{\"id\":1,\"name\":\"test\",\"email\":\"isma@gmail.com\",\"password\":\"1234\",\"token\":\""+ token+"\",\"helpedUsers\":0,\"markedSpots\":0}";

		this.mockMvc.perform(get("/api/v1/users/1").header("Authorization",token))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(content().string(user_bd))
				.andExpect(status().is(200));


	}
  
	@Test
	public void shouldModifyUser() throws Exception {
		// Login with mockup user in the database.
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

		this.mockMvc.perform(put("/api/v1/users/email/testmail1@gmail.com").header("Authorization",token)
				.content(asJsonString(new User("Ismael", "isma", "amadolider@gmail.com", "1234", "nonbinary")))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(200))
				.andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Ismael"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.username").value("isma"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.email").value("amadolider@gmail.com"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.password").value("1234"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.gender").value("nonbinary"));
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
