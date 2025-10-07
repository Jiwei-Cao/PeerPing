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
@Table(name = "availability")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(Availability.AvailabilityId.class)
public class Availability {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TimeSlot slot;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public enum TimeSlot {
        MORN,
        EVE,
        WKNDS,
        WKNT
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AvailabilityId implements Serializable {
        private UUID user;
        private TimeSlot slot;
    }
}