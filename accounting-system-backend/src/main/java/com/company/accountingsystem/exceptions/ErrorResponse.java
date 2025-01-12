package com.company.accountingsystem.exceptions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Hidden
@Getter
@AllArgsConstructor
@JsonPropertyOrder({"statusCode", "message", "path", "timestamp", "link"})
public class ErrorResponse {
    @JsonProperty("status")
    private Integer statusCode;
    private String message;
    private String path;
    private LocalDateTime timestamp;
    private final String link = "http://company.com/swagger-ui/index.html";

    @Getter
    @AllArgsConstructor
    public static class ValidationMessages {
        private String field;
        private String message;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class CustomListValidation {
        private Integer row;
        private String field;
        private String message;
    }
}
