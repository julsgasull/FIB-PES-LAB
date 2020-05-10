package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.model.firebase.PushNotificationRequest;
import com.pesados.purplepoint.api.model.firebase.PushNotificationResponse;
import com.pesados.purplepoint.api.model.firebase.PushNotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class PushNotificationController {

    private PushNotificationService pushNotificationService;

    public PushNotificationController(PushNotificationService pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }

    @Operation(summary = "Send a notification asking for help to a topic",
            description = "Send a notification to the subscribers of a topic", tags = { "notification" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Notification sended",
                    content = @Content(schema = @Schema(implementation = ResponseEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")})

    @PostMapping("/notification/topic")
    public ResponseEntity sendNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotificationWithoutData(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }

    @Operation(summary = "Send a notification asking for help to a device",
            description = "Send a notification to a specific device identified by the token", tags = { "notification" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Notification sended",
                    content = @Content(schema = @Schema(implementation = ResponseEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @PostMapping("/notification/token")
    public ResponseEntity sendTokenNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotificationToToken(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }

    /*
    @PostMapping("/notification/data")
    public ResponseEntity sendDataNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotification(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }
     */

    @Operation(summary = "Send a notification asking for help",
            description = "Send a notification to devices in which are no further than X meters", tags = { "notification" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Notification sended",
                    content = @Content(schema = @Schema(implementation = ResponseEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    @PostMapping("/multicastnotification/data")
    public ResponseEntity sendMulticastDataNotification(@RequestBody PushNotificationRequest request) {
        List<String> registrationTokens = Arrays.asList("sup1", "sup2", "sup3");
        pushNotificationService.sendMulticastPushNotification(registrationTokens);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }
/*
    @GetMapping("/notification")
    public ResponseEntity sendSampleNotification() {
        pushNotificationService.sendSamplePushNotification();
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }
 */
}