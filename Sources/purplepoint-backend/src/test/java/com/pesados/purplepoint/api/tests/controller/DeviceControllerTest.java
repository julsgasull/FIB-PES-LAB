package com.pesados.purplepoint.api.tests.controller;

import com.pesados.purplepoint.api.model.device.Device;
import com.pesados.purplepoint.api.model.device.DeviceService;
import com.pesados.purplepoint.api.model.user.User;
import com.pesados.purplepoint.api.model.user.UserService;
import org.json.JSONObject;
import org.junit.Assert;
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

    @Autowired
    DeviceService deviceService;

    @Autowired
    UserService userService;

    @Test
    public void shouldReturnUnauthorized() throws Exception {
        this.mockMvc.perform(get("/api/v1/device/1")).andExpect(status().is(401));
    }


    @Test
    public void shouldModifyDevice() throws Exception {
        // Get mock user from prefidined database. It always should exist.
        User mockUser = userService.getUserByEmail("isma@gmail.com").get();

        // Login with mockup user in the database.
        JSONObject location = new JSONObject();
        location.put("latitude", 5.0);
        location.put("longitude", 7.0);
        location.put("accuracy", 9.0);
        location.put("timestamp", 20.0);

        JSONObject userU = new JSONObject();
        userU.put("name", mockUser.getName());
        userU.put("username", "amandi");
        userU.put("email", "amandi@correo.com");
        userU.put("password", mockUser.getPassword());
        userU.put("gender", mockUser.getGender());
        userU.put("token", mockUser.getToken());
        userU.put("helpedUsers", mockUser.getHelpedUsers());
        userU.put("markedSpots", mockUser.getMarkedSpots());
        userU.put("profilePic", null);


        JSONObject userLogin = new JSONObject();
        userLogin.put("name", mockUser.getName());
        userLogin.put("username", mockUser.getUsername());
        userLogin.put("email", mockUser.getEmail());
        userLogin.put("password", mockUser.getPassword());
        userLogin.put("gender", mockUser.getGender());
        userLogin.put("token", mockUser.getToken());
        userLogin.put("helpedUsers", mockUser.getHelpedUsers());
        userLogin.put("markedSpots", mockUser.getMarkedSpots());
        userLogin.put("id", mockUser.getID());
        userLogin.put("profilePic", null);

        JSONObject device = new JSONObject();
        device.put("firebaseToken", "f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5");
        device.put("location", location);
        device.put("user", userU);

        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/users/login")
                .contentType("application/json")
                .content(userLogin.toString()))
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
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.email").value("amandi@correo.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.password").value("1234"));
    }

    @Test
    public void shouldSendNotification() throws Exception{
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

        this.mockMvc.perform(post("/api/v1/device/notifyuser/f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5").header("Authorization", token)
                .param("username", "Isma"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().is(200));
    }


    @Test
    public void shouldUpdateToken() throws Exception {
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

        Device newDevice = deviceService.getDeviceByFirebaseToken("f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5").get();
        long idDevice = newDevice.getDeviceId();

        this.mockMvc.perform(put("/api/v1/device/updatetoken/f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5").header("Authorization",token)
                .content("1")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().is(200));

        newDevice = deviceService.getDeviceById(idDevice).get();
        Assert.assertEquals(newDevice.getFirebaseToken(), "f2EJYEQeYyYq-v2ubvL7x5:APA91bFam-no_lk9-kryCZol_dXDEtRjyd_iyAORuLDuLgLmyblUhYE9sYV1Prj4ohxnt6-EM_tDBVOkhnV08e2szqCGjNBRap5vnRwzBVf0iCMzlCphZiAWCkRWiDx0pB71dZEj2Ej5");
    }

}
