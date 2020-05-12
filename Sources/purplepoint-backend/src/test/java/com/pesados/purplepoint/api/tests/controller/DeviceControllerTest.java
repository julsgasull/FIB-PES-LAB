package com.pesados.purplepoint.api.tests.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldReturnUnauthorized() throws Exception {
        this.mockMvc.perform(get("/api/v1/device/1")).andExpect(status().is(401));
    }


    @Test
    public void shouldModifyDevice() throws Exception {
        // Login with mockup user in the database.
        JSONObject location = new JSONObject();
        location.put("latitude", 5.0);
        location.put("longitude", 7.0);
        location.put("accuracy", 9.0);
        location.put("timestamp", 20.0);

        JSONObject user = new JSONObject();
        user.put("email", "isma@gmail.com");
        user.put("password", "1234");

        JSONObject device = new JSONObject();
        device.put("firebaseToken", "f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5");
        device.put("location", location);
        device.put("user", user);

        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/users/login")
                .contentType("application/json")
                .content(user.toString()))
                .andExpect(status().isOk())
                .andReturn();

        JSONObject respUser = new JSONObject(response.getResponse().getContentAsString());
        String token =((String) respUser.get("token"));

        this.mockMvc.perform(put("/api/v1/device/1").header("Authorization",token)
                .content(String.valueOf(device))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().is(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firebaseToken").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location.latitude").value("5.0"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location.longitude").value("7.0"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location.accuracy").value("9.0"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location.timestamp").value("20.0"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.email").value("isma@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.password").value("1234"));
    }

    @Test
    public void shouldsendNotification() throws Exception{

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

        this.mockMvc.perform(post("/api/v1/device/notifyuser/f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5").header("Authorization", token)
                .param("username", "Isma"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().is(200));


    }

}
