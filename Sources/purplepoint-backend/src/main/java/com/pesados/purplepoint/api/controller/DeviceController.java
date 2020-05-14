package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.exception.DeviceNotFoundException;
import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.model.device.Device;
import com.pesados.purplepoint.api.model.device.DeviceService;
import com.pesados.purplepoint.api.model.firebase.PushNotificationService;
import com.pesados.purplepoint.api.model.location.Location;
import com.pesados.purplepoint.api.model.user.User;
import com.pesados.purplepoint.api.model.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DeviceController {

    private final DeviceService deviceService;
    private final UserService userService;
    private final PushNotificationService pushNotificationService;

    public DeviceController(DeviceService deviceService, UserService userService, PushNotificationService pushNotificationService) {
        this.deviceService = deviceService;
        this.userService = userService;
        this.pushNotificationService = pushNotificationService;
    }

    @Operation(summary = "Add a new device",
            description = "Adds a new device to the database with the information provided.", tags = { "devices" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "device created",
                    content = @Content(schema = @Schema(implementation = Device.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "409", description = "device already exists") })
    @PostMapping(value = "/devices", consumes = { "application/json", "application/xml" })
    Device newdevice(
            @Parameter(description="device to add. Cannot null or empty.",
                    required=true, schema=@Schema(implementation = Device.class))
            @Valid @RequestBody Device newRep, @RequestHeader("X-Authorization-Firebase") String firebaseToken
    ) {
        try {
        	Device dev = this.deviceService.getDeviceByFirebaseToken(firebaseToken)
        		.orElseThrow( () -> new DeviceNotFoundException(firebaseToken));
        	dev.setFirebaseToken(firebaseToken);
        	return this.deviceService.saveDevice(dev);
        } catch (DeviceNotFoundException e) {
        	return this.deviceService.saveDevice(newRep);
        }
    }

    @Operation(summary = "Get All devices", description = "Get all devices created.", tags = {"device"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @GetMapping(value = "/devices", produces = { "application/json", "application/xml"})
    List<Device> all() {
        return deviceService.getAll();
    }

    @Operation(summary = "Get a device", description = "Get ", tags = {"devices"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @GetMapping(value = "/devices/{id}", produces = { "application/json", "application/xml"})
    Device getOne(
            @Parameter(description="id of the device.", required = true) @PathVariable Long id) {
        return deviceService.getDeviceById(id).orElseThrow(() -> new DeviceNotFoundException(id));
    }

    @Operation(summary = "Delete a device", description = "Delete ", tags = {"devices"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @DeleteMapping(value = "/devices/{id}", produces = { "application/json", "application/xml"})
    void delOne(
            @Parameter(description="id of the device.", required = true) @PathVariable Long id) {
        deviceService.deleteDeviceById(id);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Update an existing Device by token", 
    		description = "Update the token, user and/or location given the token of an existing device.", tags = { "devices" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")})
    @PutMapping(value = "/devices/{token}", consumes = {"application/json", "application/xml"})
    Device updateDeviceToken(@Parameter(description = "New information for the device.", required = true)
                            @RequestBody Device newDevice,
                            @Parameter(description = "Token of the device to replace.", required = true)
    						@PathVariable String token,
    						@RequestHeader("X-Authorization-Firebase") String firebaseToken
    ) {
        User deviceUser = null;
        try  {
            deviceUser = userService.getUserByEmail(newDevice.getUser().getEmail())
            		.orElseThrow(() -> new UserNotFoundException(newDevice.getUser().getEmail()));
        } catch (UserNotFoundException e) {
            return deviceService.getDeviceByFirebaseToken(token)
                    .map(device -> {
                        device.setFirebaseToken(newDevice.getFirebaseToken());
                        device.setLocation(newDevice.getLocation());
                        device.setUser(newDevice.getUser());
                        return deviceService.saveDevice(device);
                    })
                    .orElseGet(() -> {
                        newDevice.setFirebaseToken(firebaseToken);
                        return deviceService.saveDevice(newDevice);
                    });
        }
        User finalDeviceUser = deviceUser;
        return deviceService.getDeviceByFirebaseToken(token)
                .map(device -> {
                    device.setFirebaseToken(newDevice.getFirebaseToken());
                    device.setLocation(newDevice.getLocation());
                    device.setUser(userService.saveUser(finalDeviceUser));
                    return deviceService.saveDevice(device);
                })
                .orElseGet(() -> {
                    newDevice.setFirebaseToken(firebaseToken);
                    return deviceService.saveDevice(newDevice);
                });
    }
    @PreAuthorize("hasRole('ROLE_DEVICE')")
    @Operation(summary = "Update an existing Device Location by token", 
    		description = "Update the location given the token of an existing device.", tags = { "devices" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")})
    @PutMapping(value = "/devices/{token}/location", consumes = {"application/json", "application/xml"})
    Device updateDeviceLocationByToken(@Parameter(description = "New information for the device.", required = true)
                            @RequestBody Location newLocation,
                            @Parameter(description = "Token of the device to replace.", required = true)
    						@PathVariable String token
    ) {
        return deviceService.getDeviceByFirebaseToken(token)
	        .map(device -> {
	            device.setLocation(newLocation);
	            return deviceService.saveDevice(device);
	        }).orElseThrow(() -> new DeviceNotFoundException(token));
        
    }


    // Notify user of incoming help
    @Operation(summary = "Sends a notification to the user", description = "Notify the user who requested help that someone is coming.", tags = {"users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping(path = "/devices/notifyuser/{firebasetoken}")
    void notifyUser(
            @Parameter(description = "Username of the user who is going to receive the notification.", required = true)
            @RequestParam String username,
            @Parameter(description = "Token of the device that must recieve notification.", required = true)
            @PathVariable String firebasetoken
    ) {
        if (username == "")
            pushNotificationService.sendNotification(firebasetoken, "Someone");
        else
            pushNotificationService.sendNotification(firebasetoken, username);
    }

    /* 
     * REDUNTANT
     */
    /*
    @Operation(summary = "Update an existing Device's token providing the old token", description = "Update the token of an existing device. If it doesn't exists, it is created.", tags = { "devices" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")})
    @PutMapping(value = "/devices/updatetoken/{token}", consumes = {"application/json", "application/xml"})
    Device updateDeviceToken(@Parameter(description = "New information for the device.", required = true)
                                @PathVariable String token,
                             @Parameter(description = "Token of the device to replace.", required = true)
                                @RequestBody String oldDeviceToken
    ) {
        return deviceService.getDeviceByFirebaseToken(oldDeviceToken)
                .map(device -> {
                    device.setFirebaseToken(token);
                    return deviceService.saveDevice(device);
                })
                .orElseGet(() -> {
                    Device newDevice = new Device(token, new Location(), new User());
                    return this.deviceService.saveDevice(newDevice);
                });
    }
    */
}
