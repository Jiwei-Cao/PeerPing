package com.peerly.web.mapper;

import com.peerly.domain.User;
import com.peerly.web.dto.ProfileResponse;
import com.peerly.web.dto.UpdateProfileRequest;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-08-31T21:10:55+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.50.v20250729-0351, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public ProfileResponse toProfileResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UUID id = null;
        String email = null;
        String name = null;
        String bio = null;
        String avatarUrl = null;
        String city = null;
        Boolean openToIrl = null;

        id = user.getId();
        email = user.getEmail();
        name = user.getName();
        bio = user.getBio();
        avatarUrl = user.getAvatarUrl();
        city = user.getCity();
        openToIrl = user.getOpenToIrl();

        ProfileResponse profileResponse = new ProfileResponse( id, email, name, bio, avatarUrl, city, openToIrl );

        return profileResponse;
    }

    @Override
    public void updateUserFromRequest(UpdateProfileRequest request, User user) {
        if ( request == null ) {
            return;
        }

        user.setAvatarUrl( request.avatarUrl() );
        user.setBio( request.bio() );
        user.setCity( request.city() );
        user.setName( request.name() );
        user.setOpenToIrl( request.openToIrl() );
    }
}
