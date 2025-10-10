package com.peerping.api.repository;

import com.peerping.api.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlockRepository extends JpaRepository<Block, Block.BlockId> {
    boolean existsByBlockerIdAndBlockedUserId(UUID blockerId, UUID blockedUserId);
    
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Block b " +
           "WHERE (b.blocker.id = :userId1 AND b.blockedUser.id = :userId2) " +
           "OR (b.blocker.id = :userId2 AND b.blockedUser.id = :userId1)")
    boolean existsBlockBetweenUsers(@Param("userId1") UUID userId1, @Param("userId2") UUID userId2);
}