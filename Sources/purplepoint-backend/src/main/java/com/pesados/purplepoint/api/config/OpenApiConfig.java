
package com.pesados.purplepoint.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@OpenAPIDefinition(
        security = {@SecurityRequirement(name = "bearer")}
)
@SecurityScheme(name = "bearer", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
    	/*Server myServer = new Server();
    	myServer.setUrl("http://10.4.41.147/");
    	ArrayList<Server> serverList = new ArrayList<Server> ();
    	serverList.add(myServer);
    	*/
        return new OpenAPI()
                .components(new Components())
                /*.servers(serverList)*/
                .info(new Info().title("PurplePoint Application API").description(
                        "This is PurplePoint's Spring Boot API service using springdoc-openapi and OpenAPI 3."));
    }

}