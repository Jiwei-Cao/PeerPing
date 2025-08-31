package com.peerly.service;

import com.peerly.common.Exceptions;
import com.peerly.domain.User;
import com.peerly.repo.UserRepo;
import com.peerly.web.dto.UpdateProfileRequest;
import com.peerly.web.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
public class ProfileService {
    
    private final UserRepo userRepo;
    private final UserMapper userMapper;
    
    public ProfileService(UserRepo userRepo, UserMapper userMapper) {
        this.userRepo = userRepo;
        this.userMapper = userMapper;
    }
    
    public User getProfile(UUID userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new Exceptions.NotFoundException("User not found"));
    }
    
    public User updateProfile(UUID userId, UpdateProfileRequest request) {
        User user = getProfile(userId);
        userMapper.updateUserFromRequest(request, user);
        user.setLastSeenAt(Instant.now());
        return userRepo.save(user);
    }
    
    public void updateLastSeen(UUID userId) {
        userRepo.findById(userId).ifPresent(user -> {
            user.setLastSeenAt(Instant.now());
            userRepo.save(user);
        });
    }
}