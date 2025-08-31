package com.peerly.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "created_at")
    private Instant createdAt;
    
    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private Set<Participant> participants = new HashSet<>();
    
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
    
    public Instant getCreatedAt() {
        return createdAt;
    }
    
    public Set<Participant> getParticipants() {
        return participants;
    }
    
    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }
}