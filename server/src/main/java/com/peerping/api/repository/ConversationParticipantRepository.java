package com.peerping.api.repository;

import com.peerping.api.entity.ConversationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, ConversationParticipant.ConversationParticipantId> {
    List<ConversationParticipant> findByConversationId(UUID conversationId);
    
    @Query("SELECT cp FROM ConversationParticipant cp WHERE cp.conversation.id = :conversationId AND cp.user.id != :userId")
    List<ConversationParticipant> findOtherParticipants(@Param("conversationId") UUID conversationId, @Param("userId") UUID userId);
}