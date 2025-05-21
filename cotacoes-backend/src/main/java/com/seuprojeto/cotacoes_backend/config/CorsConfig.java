package com.seuprojeto.cotacoes_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // libera todos os endpoints
                        .allowedOrigins("http://localhost:5173") // permite sua aplicação React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos HTTP permitidos
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}