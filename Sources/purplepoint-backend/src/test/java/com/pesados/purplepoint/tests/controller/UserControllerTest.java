package com.pesados.purplepoint.tests.controller;

import java.net.URI;
import java.net.URISyntaxException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.client.RestClientException;

import com.pesados.purplepoint.api.controller.UserController;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;


@SpringBootTest(classes=UserController.class)
public class UserControllerTest {
	
	final String baseUrl = "http://localhost:8080/api/v1/users";
	
	@MockBean
    private UserService userService;
	
    private TestRestTemplate restTemplate = new TestRestTemplate();    
    
    @Test
    public void shouldReturnUnauthorized() {
    	
    	ResponseEntity<User> result = null;
		try {
			result = this.restTemplate.getForEntity(this.baseUrl+"/1",User.class);
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	//Verify request succeed
        Assertions.assertEquals(401, result.getStatusCodeValue());
    }
    
    @Test
    public void shouldReturnCredentials() throws JSONException {
    	ResponseEntity<User> result = null;
      
    	JSONObject user = new JSONObject();
    	user.put("email", "isma@gmail.com");
    	user.put("password", "1234");
    	
    	HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);        
        HttpEntity<String> request = 
        	      new HttpEntity<String>(user.toString(), headers);
		try {
			result = this.restTemplate.postForEntity(new URI(this.baseUrl+"/login"), request, User.class);
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    	Assertions.assertEquals(200, result.getStatusCodeValue());
    	Assertions.assertTrue(result.getBody().getToken() != null);
    }
    
    @Test
    public void shuldBeAbleToAccesResourcesWithCredentials() throws JSONException {
    	ResponseEntity<User> auxresult = null;
        
    	JSONObject user = new JSONObject();
    	user.put("email", "isma@gmail.com");
    	user.put("password", "1234");
    	
    	HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);        
        HttpEntity<String> request = 
        	      new HttpEntity<String>(user.toString(), headers);
		try {
			auxresult = this.restTemplate.postForEntity(new URI(this.baseUrl+"/login"), request, User.class);
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String token = auxresult.getBody().getToken().replaceAll("Bearer ", "");
		
		headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);   
        headers.setBearerAuth(token);
    	HttpEntity entity = new HttpEntity(headers);

    	ResponseEntity<String> result = null;
    	
        result = restTemplate.exchange(
        		this.baseUrl, HttpMethod.GET, entity, String.class
        		);
        
        Assertions.assertTrue(200 == result.getStatusCodeValue());
    }    

}
