package com.peerly.web.dto;

import java.util.UUID;

public record ProfileResponse(
    UUID id,
    String email,
    String name,
    String bio,
    String avatarUrl,
    String city,
    Boolean openToIrl
) {}