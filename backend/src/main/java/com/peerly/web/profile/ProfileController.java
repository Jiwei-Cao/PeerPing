package com.peerly.web.profile;

import com.peerly.domain.User;
import com.peerly.service.ProfileService;
import com.peerly.web.dto.ProfileResponse;
import com.peerly.web.dto.UpdateProfileRequest;
import com.peerly.web.mapper.UserMapper;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/profiles")
public class ProfileController {
    
    private final ProfileService profileService;
    private final UserMapper userMapper;
    
    public ProfileController(ProfileService profileService, UserMapper userMapper) {
        this.profileService = profileService;
        this.userMapper = userMapper;
    }
    
    @GetMapping("/me")
    public ProfileResponse getMyProfile(@AuthenticationPrincipal UUID userId) {
        User user = profileService.getProfile(userId);
        return userMapper.toProfileResponse(user);
    }
    
    @PutMapping("/me")
    public ProfileResponse updateMyProfile(@AuthenticationPrincipal UUID userId,
                                         @Valid @RequestBody UpdateProfileRequest request) {
        User user = profileService.updateProfile(userId, request);
        return userMapper.toProfileResponse(user);
    }
    
    @GetMapping("/{id}")
    public ProfileResponse getProfile(@PathVariable UUID id) {
        User user = profileService.getProfile(id);
        return userMapper.toProfileResponse(user);
    }
}