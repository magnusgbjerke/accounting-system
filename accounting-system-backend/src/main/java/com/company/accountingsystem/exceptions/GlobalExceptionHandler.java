package com.company.accountingsystem.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.NoHandlerFoundException;
import jakarta.validation.ConstraintViolationException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.time.LocalDateTime;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public String getPath() {
        HttpServletRequest request = ((ServletRequestAttributes)
                Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        return request.getRequestURI();
    }

    @ExceptionHandler(CustomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse customException(CustomException ex) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                getPath(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse constraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        Pattern pattern = Pattern.compile("\\[(\\d+)]");
        List<ErrorResponse.CustomListValidation> list = new ArrayList<>();

        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            ErrorResponse.CustomListValidation custom = new ErrorResponse.CustomListValidation();

            String fieldName = violation.getPropertyPath().toString();
            Matcher matcher = pattern.matcher(fieldName);

            int index = Integer.parseInt(matcher.find() ? matcher.group(1) : "unknown");
            String field = fieldName.contains(".") ?
                    fieldName.substring(fieldName.lastIndexOf('.') + 1) : fieldName;
            String errorMessage = violation.getMessage();

            custom.setRow(index+1);
            custom.setField(field);
            custom.setMessage(errorMessage);
            list.add(custom);
        }
        StringBuilder stringBuilder = new StringBuilder();
        list.forEach(x->stringBuilder.append("Row ")
                .append(x.getRow())
                .append(", ")
                .append(x.getField())
                .append(", ")
                .append(x.getMessage())
                .append(" - "));
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                stringBuilder.toString(),
                getPath(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse methodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<ErrorResponse.ValidationMessages> validationMessagesList = getValidationMessages(ex);
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                validationMessagesList.toString(),
                getPath(),
                LocalDateTime.now()
        );
    }

    private static List<ErrorResponse.ValidationMessages> getValidationMessages(MethodArgumentNotValidException ex) {
        List<ErrorResponse.ValidationMessages> validationMessagesList = new ArrayList<>();
        for (int i = 0; i < ex.getErrorCount(); i++) {
            String message = ex.getBindingResult().getAllErrors().get(i).getDefaultMessage();
            String objectName = ex.getBindingResult().getAllErrors().get(i).getObjectName();
            validationMessagesList.add(new ErrorResponse.ValidationMessages(message, objectName));
        }
        return validationMessagesList;
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse noHandlerFoundException() {
        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "API endpoint....Where? The requested API endpoint does not exist.",
                getPath(),
                LocalDateTime.now()
        );
    }


    // Generic handler for all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exception(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Ooops... An internal server error occured.",
                getPath(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}