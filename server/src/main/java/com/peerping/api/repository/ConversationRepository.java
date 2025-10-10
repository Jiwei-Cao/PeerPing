package com.peerping.api.repository;

import com.peerping.api.entity.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    @Query("SELECT c FROM Conversation c JOIN c.participants p " +
           "WHERE p.user.id = :userId AND c.deletedAt IS NULL " +
           "ORDER BY c.lastMessageAt DESC NULLS LAST")
    Page<Conversation> findByUserId(@Param("userId") UUID userId, Pageable pageable);
    
    @Query("SELECT c FROM Conversation c " +
           "JOIN c.participants p1 JOIN c.participants p2 " +
           "WHERE p1.user.id = :userId1 AND p2.user.id = :userId2 " +
           "AND c.deletedAt IS NULL")
    Optional<Conversation> findByParticipants(@Param("userId1") UUID userId1, 
                                            @Param("userId2") UUID userId2);
}