package com.peerping.api.repository;

import com.peerping.api.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    @Query("SELECT m FROM Message m WHERE m.conversation.id = :conversationId AND m.deletedAt IS NULL " +
           "ORDER BY m.messageIndex DESC")
    Page<Message> findByConversationId(@Param("conversationId") UUID conversationId, Pageable pageable);
    
    @Query("SELECT MAX(m.messageIndex) FROM Message m WHERE m.conversation.id = :conversationId")
    Optional<Long> findMaxMessageIndex(@Param("conversationId") UUID conversationId);
    
    @Query("SELECT m FROM Message m WHERE m.conversation.id = :conversationId AND m.deletedAt IS NULL " +
           "ORDER BY m.createdAt DESC")
    Optional<Message> findLatestByConversationId(@Param("conversationId") UUID conversationId);
}