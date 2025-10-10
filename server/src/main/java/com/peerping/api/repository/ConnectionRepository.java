package com.peerping.api.repository;

import com.peerping.api.entity.Connection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, UUID> {
    Optional<Connection> findByPairKey(String pairKey);
    
    @Query("SELECT c FROM Connection c WHERE c.deletedAt IS NULL AND " +
           "((c.requester.id = :userId OR c.recipient.id = :userId) AND c.status = :status)")
    Page<Connection> findByUserIdAndStatus(@Param("userId") UUID userId, 
                                         @Param("status") Connection.ConnectionStatus status, 
                                         Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Connection c WHERE c.requester.id = :userId " +
           "AND c.status = 'PENDING' AND c.createdAt >= :since")
    long countPendingRequestsSince(@Param("userId") UUID userId, @Param("since") Instant since);
    
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Connection c " +
           "WHERE c.status = 'ACCEPTED' AND c.deletedAt IS NULL AND " +
           "((c.requester.id = :userId1 AND c.recipient.id = :userId2) OR " +
           "(c.requester.id = :userId2 AND c.recipient.id = :userId1))")
    boolean areUsersConnected(@Param("userId1") UUID userId1, @Param("userId2") UUID userId2);
}