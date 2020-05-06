package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.exception.DeviceNotFoundException;
import com.pesados.purplepoint.api.model.device.Device;
import com.pesados.purplepoint.api.model.device.DeviceService;
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

public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }


    @Operation(summary = "Add a new device",
            description = "Adds a new device to the database with the information provided. ", tags = { "devices" })
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

    @Operation(summary = "Get All devices", description = "Get ", tags = {"devices"})
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
            @Parameter(description="id of the device.", required = true) @PathVariable long id) {
        return deviceService.getDeviceById(id).orElseThrow(() -> new DeviceNotFoundException(id));
    }

    @Operation(summary = "Delete a device", description = "Delete ", tags = {"devices"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Device.class)))) })
    @DeleteMapping(value = "/device/{id}", produces = { "application/json", "application/xml"})
    void delOne(
            @Parameter(description="id of the device.", required = true) @PathVariable long id) {
        deviceService.deleteDeviceById(id);
    }
}