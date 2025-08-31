package com.peerly.web.mapper;

import com.peerly.domain.User;
import com.peerly.web.dto.ProfileResponse;
import com.peerly.web.dto.UpdateProfileRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    ProfileResponse toProfileResponse(User user);
    
    void updateUserFromRequest(UpdateProfileRequest request, @MappingTarget User user);
}