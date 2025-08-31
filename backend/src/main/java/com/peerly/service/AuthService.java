package com.peerly.service;

import com.peerly.common.Exceptions;
import com.peerly.domain.User;
import com.peerly.repo.UserRepo;
import com.peerly.security.JwtService;
import com.peerly.security.PasswordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    
    private final UserRepo userRepo;
    private final PasswordService passwordService;
    private final JwtService jwtService;
    
    public AuthService(UserRepo userRepo, PasswordService passwordService, JwtService jwtService) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
    }
    
    public User register(String email, String password, String name) {
        if (userRepo.existsByEmail(email)) {
            throw new Exceptions.ConflictException("Email already registered");
        }
        
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordService.hashPassword(password));
        user.setName(name);
        
        return userRepo.save(user);
    }
    
    public String login(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exceptions.UnauthorizedException("Invalid credentials"));
        
        if (!passwordService.verifyPassword(password, user.getPasswordHash())) {
            throw new Exceptions.UnauthorizedException("Invalid credentials");
        }
        
        return jwtService.generateToken(user.getId());
    }
}