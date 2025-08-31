package com.peerly.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name is too long")
    String name,
    
    @Size(max = 1000, message = "Bio is too long")
    String bio,
    
    String avatarUrl,
    
    @Size(max = 255, message = "City name is too long")
    String city,
    
    Boolean openToIrl
) {}