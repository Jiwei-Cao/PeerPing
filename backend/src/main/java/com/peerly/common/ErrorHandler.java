package com.peerly.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ErrorHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed");
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        pd.setProperty("errors", errors);
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exceptions.BadRequestException.class)
    public ProblemDetail handleBadRequest(Exceptions.BadRequestException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler({Exceptions.UnauthorizedException.class, BadCredentialsException.class})
    public ProblemDetail handleUnauthorized(Exception e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exceptions.ForbiddenException.class)
    public ProblemDetail handleForbidden(Exceptions.ForbiddenException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exceptions.NotFoundException.class)
    public ProblemDetail handleNotFound(Exceptions.NotFoundException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exceptions.ConflictException.class)
    public ProblemDetail handleConflict(Exceptions.ConflictException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exceptions.RateLimitException.class)
    public ProblemDetail handleRateLimit(Exceptions.RateLimitException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.TOO_MANY_REQUESTS, e.getMessage());
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
    
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneral(Exception e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
        pd.setProperty("timestamp", Instant.now());
        return pd;
    }
}