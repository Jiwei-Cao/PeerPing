package com.peerping.api.repository;

import com.peerping.api.entity.Availability;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Availability.AvailabilityId>{
    List<Availability> findByUserId(UUID userId);

    @Modifying
    @Query("DELETE FROM Availability a WHERE a.user.id = :userId")
    void deleteUserById(@Param("userId") UUID userId);
}