package com.pesados.purplepoint.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pesados.purplepoint.api.model.image.Image;
import com.pesados.purplepoint.api.model.image.ImageService;
import com.pesados.purplepoint.api.model.user.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1")
public class ImageController {
	
	private final ImageService imgService;

	  
	  ImageController(ImageService imgService) {
	    this.imgService = imgService;
	  }
	  @Operation(summary = "Get All Images", description = "Get ", tags = {"images"})
	  @ApiResponses(value = {
	            @ApiResponse(responseCode = "200", description = "successful operation",
	                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Image.class)))) })
	 @GetMapping(value = "/images", produces = { "application/json", "application/xml"})
	 List<Image> updatePic() {
		return imgService.getAll();
	
	 }
}
