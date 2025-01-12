package com.company.accountingsystem.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.*;
import org.springframework.context.annotation.Configuration;

import static com.company.accountingsystem.swagger.Description.DESCRIPTION_TEXT;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Accounting System API",
                version = "1.0.0",
                description = DESCRIPTION_TEXT,
                contact = @Contact(
                        name = "Accounting System",
                        email = "contact@company.com",
                        url = "http://www.company.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0"
                )
        )
)
public class ApiDocumentationConfig {
}
