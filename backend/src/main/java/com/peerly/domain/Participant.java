package com.peerly.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "participants")
@IdClass(Participant.ParticipantId.class)
public class Participant {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "joined_at")
    private Instant joinedAt;
    
    @PrePersist
    protected void onCreate() {
        joinedAt = Instant.now();
    }
    
    public static class ParticipantId implements Serializable {
        private Long conversation;
        private UUID user;
        
        public ParticipantId() {}
        
        public ParticipantId(Long conversation, UUID user) {
            this.conversation = conversation;
            this.user = user;
        }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ParticipantId that = (ParticipantId) o;
            return Objects.equals(conversation, that.conversation) && 
                   Objects.equals(user, that.user);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(conversation, user);
        }
    }
    
    public Conversation getConversation() {
        return conversation;
    }
    
    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Instant getJoinedAt() {
        return joinedAt;
    }
}