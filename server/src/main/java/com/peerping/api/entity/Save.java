package com.peerping.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "saves")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(Save.SaveId.class)
public class Save {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saver_id", nullable = false)
    private User saver;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_user_id", nullable = false)
    private User savedUser;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SaveId implements Serializable {
        private UUID saver;
        private UUID savedUser;
    }
}