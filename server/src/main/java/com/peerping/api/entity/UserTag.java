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
@Table(name = "user_tags")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UserTag.UserTagId.class)
public class UserTag {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TagIntent intent;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public enum TagIntent {
        LEARN,
        TEACH
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserTagId implements Serializable {
        private UUID user;
        private UUID tag;
        private TagIntent intent;
    }
}