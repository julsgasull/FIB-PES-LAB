package com.pesados.purplepoint.tests.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;

import com.pesados.purplepoint.api.controller.UserController;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserService;


@SpringBootTest(classes=UserController.class)
public class UserControllerTest {
	
	final String baseUrl = "http://localhost:8080/api/v1/users/1";
	
	@MockBean
    private UserService userService;
	
    private TestRestTemplate restTemplate;
    
    @Before
    public void setUp() {
    }
    
    
    @Test
    public void shouldReturnUnauthorized() {
    	this.restTemplate = new TestRestTemplate();

    	HttpHeaders hd = new HttpHeaders();
    	// add headers
    	List<MediaType> allHeaders = new ArrayList<MediaType>();
    	allHeaders.add(MediaType.APPLICATION_JSON);
    	
    	hd.setAccept(allHeaders);
    	
    	ResponseEntity<User> result = null;
		try {
			result = this.restTemplate.getForEntity(this.baseUrl,User.class);
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	System.out.println(result.getStatusCodeValue());
    	//Verify request succeed
        Assert.assertEquals(200, result.getStatusCodeValue());
    }
    
    

}
