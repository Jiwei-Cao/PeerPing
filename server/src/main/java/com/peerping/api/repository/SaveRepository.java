package com.peerping.api.repository;

import com.peerping.api.entity.Save;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SaveRepository extends JpaRepository<Save, Save.SaveId> {
    boolean existsBySaverIdAndSavedUserId(UUID saverId, UUID savedUserId);
    
    @Query("SELECT s FROM Save s WHERE s.saver.id = :userId")
    Page<Save> findBySaverId(@Param("userId") UUID userId, Pageable pageable);
    
    @Query("SELECT COUNT(s) FROM Save s WHERE s.savedUser.id = :userId")
    long countBySavedUserId(@Param("userId") UUID userId);
}