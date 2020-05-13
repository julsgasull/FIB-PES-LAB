package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.exception.DeviceNotFoundException;
import com.pesados.purplepoint.api.model.device.Device;
import com.pesados.purplepoint.api.model.device.DeviceService;
import com.pesados.purplepoint.api.model.firebase.PushNotificationService;
import com.pesados.purplepoint.api.model.location.Location;
import com.pesados.purplepoint.api.model.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DeviceController {

    private final DeviceService deviceService;
    private final PushNotificationService pushNotificationService;


    public DeviceController(DeviceService deviceService, PushNotificationService pushNotificationService) {
        this.deviceService = deviceService;
        this.pushNotificationService = pushNotificationService;

    }

    @Operation(summary = "Add a new device",
            description = "Adds a new device to the database with the information provided.", tags = { "device" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "device created",
                    content = @Content(schema = @Schema(implementation = Device.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "409", description = "device already exists") })
    @PostMapping(value = "/device", consumes = { "application/json", "application/xml" })
    Device newdevice(
            @Parameter(description="device to add. Cannot null or empty.",
                    required=true, schema=@Schema(implementation = Device.class))
            @Valid @RequestBody Device newRep
    ) {
        return this.deviceService.saveDevice(newRep);
    }

    @Operation(summary = "Get All devices", description = "Get all devices created.", tags = {"device"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @GetMapping(value = "/device", produces = { "application/json", "application/xml"})
    List<Device> all() {
        return deviceService.getAll();
    }

    @Operation(summary = "Get a device", description = "Get ", tags = {"devices"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @GetMapping(value = "/device/{id}", produces = { "application/json", "application/xml"})
    Device getOne(
            @Parameter(description="id of the device.", required = true) @PathVariable Long id) {
        return deviceService.getDeviceById(id).orElseThrow(() -> new DeviceNotFoundException(id));
    }

    @Operation(summary = "Delete a device", description = "Delete ", tags = {"devices"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @DeleteMapping(value = "/device/{id}", produces = { "application/json", "application/xml"})
    void delOne(
            @Parameter(description="id of the device.", required = true) @PathVariable Long id) {
        deviceService.deleteDeviceById(id);
    }

    @Operation(summary = "Update an existing Device by token", description = "Update the token, user and/or location given the token of an existing device.", tags = { "device" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")})
    @PutMapping(value = "/device/{token}", consumes = {"application/json", "application/xml"})
    Device replaceDeviceByToken(@Parameter(description = "New information for the device.", required = true)
                            @RequestBody Device newDevice,
                            @Parameter(description = "Token of the device to replace.", required = true)
                            @PathVariable String token
    ) {
        return deviceService.getDeviceByFirebaseToken(token)
                .map(device -> {
                    device.setFirebaseToken(newDevice.getFirebaseToken());
                    device.setLocation(newDevice.getLocation());
                    device.setUser(newDevice.getUser());
                    return deviceService.saveDevice(device);
                })
                .orElseGet(() -> {
                    newDevice.setFirebaseToken(token);
                    return deviceService.saveDevice(newDevice);
                });
    }


    // Notify user of incoming help
    @Operation(summary = "Sends a notification to the user", description = "Notify the user who requested help that someone is coming.", tags = {"users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping(path = "/device/notifyuser/{firebasetoken}")
    void notifyUser(
            @Parameter(description = "Username of the user who is going to receive the notification.", required = true)
            @RequestParam String username,
            @Parameter(description = "Token of the device that must recieve notification.", required = true)
            @PathVariable String firebasetoken
    ) {
        pushNotificationService.sendNotification(firebasetoken, username);
    }

    @Operation(summary = "Update an existing Device's token providing the old token", description = "Update the token of an existing device. If it doesn't exists, it is created.", tags = { "device" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid username supplied"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")})
    @PutMapping(value = "/device/updatetoken/{token}", consumes = {"application/json", "application/xml"})
    Device replaceDeviceByToken(@Parameter(description = "New information for the device.", required = true)
                                @RequestBody String oldDeviceToken,
                                @Parameter(description = "Token of the device to replace.", required = true)
                                @PathVariable String token
    ) {
        return deviceService.getDeviceByFirebaseToken(oldDeviceToken)
                .map(device -> {
                    device.setFirebaseToken(token);
                    return deviceService.saveDevice(device);
                })
                .orElseGet(() -> {
                    Device newDevice = new Device(token, new Location(), new User());
                    return newDevice;
                });
    }
}
