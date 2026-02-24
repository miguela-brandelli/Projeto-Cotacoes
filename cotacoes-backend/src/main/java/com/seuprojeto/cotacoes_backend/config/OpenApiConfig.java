package com.seuprojeto.cotacoes_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Cotacoes API",
        version = "1.0",
        description = "API para gerenciamento de cotações"
    )
)
public class OpenApiConfig {
}