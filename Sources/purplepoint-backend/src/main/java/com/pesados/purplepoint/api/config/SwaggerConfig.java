/* package com.pesados.purplepoint.api.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(PathSelectors.any())
                .apis(RequestHandlerSelectors.basePackage("com.pesados"))
                .build()
                .apiInfo(apiStuff());
    }

    private ApiInfo apiStuff() {
        return new ApiInfo(
            "PURPLE POINT",
            "Generic Description",
            "v1.0",
            "Free to use - Download on Play Store",
            new springfox.documentation.service.Contact("Purple Point Volunteers", "", "purplepoint@gmail.com"),
            " ",
            " ",
            Collections.emptyList());
    }
} */