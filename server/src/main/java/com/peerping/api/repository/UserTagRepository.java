package com.peerping.api.repository;

import com.peerping.api.entity.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserTagRepository extends JpaRepository<UserTag, UserTag.UserTagId> {
    List<UserTag> findByUserId(UUID userId);
    
    @Modifying
    @Query("DELETE FROM UserTag ut WHERE ut.user.id = :userId")
    void deleteAllByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT ut FROM UserTag ut WHERE ut.user.id = :userId AND ut.intent = :intent")
    List<UserTag> findByUserIdAndIntent(@Param("userId") UUID userId, @Param("intent") UserTag.TagIntent intent);
}