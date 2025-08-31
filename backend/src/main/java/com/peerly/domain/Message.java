package com.peerly.domain;

import com.peerly.domain.enums.MsgType;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    
    @Column(nullable = false)
    private String body;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MsgType type = MsgType.text;
    
    @Column(name = "created_at")
    private Instant createdAt;
    
    @Column(name = "delivered_at")
    private Instant deliveredAt;
    
    @Column(name = "read_at")
    private Instant readAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Conversation getConversation() {
        return conversation;
    }
    
    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }
    
    public User getSender() {
        return sender;
    }
    
    public void setSender(User sender) {
        this.sender = sender;
    }
    
    public String getBody() {
        return body;
    }
    
    public void setBody(String body) {
        this.body = body;
    }
    
    public MsgType getType() {
        return type;
    }
    
    public void setType(MsgType type) {
        this.type = type;
    }
    
    public Instant getCreatedAt() {
        return createdAt;
    }
    
    public Instant getDeliveredAt() {
        return deliveredAt;
    }
    
    public void setDeliveredAt(Instant deliveredAt) {
        this.deliveredAt = deliveredAt;
    }
    
    public Instant getReadAt() {
        return readAt;
    }
    
    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }
}