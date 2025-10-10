package com.peerping.api.repository;

import com.peerping.api.entity.UserLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserLanguageRepository extends JpaRepository<UserLanguage, UserLanguage.UserLanguageId> {
    List<UserLanguage> findByUserId(UUID userId);
    
    @Modifying
    @Query("DELETE FROM UserLanguage ul WHERE ul.user.id = :userId")
    void deleteAllByUserId(@Param("userId") UUID userId);
}