package com.peerly.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_user_id", nullable = false)
    private User reportedUser;
    
    @Column(nullable = false)
    private String reason;
    
    @Column(name = "created_at")
    private Instant createdAt;
    
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
    
    public User getReporter() {
        return reporter;
    }
    
    public void setReporter(User reporter) {
        this.reporter = reporter;
    }
    
    public User getReportedUser() {
        return reportedUser;
    }
    
    public void setReportedUser(User reportedUser) {
        this.reportedUser = reportedUser;
    }
    
    public String getReason() {
        return reason;
    }
    
    public void setReason(String reason) {
        this.reason = reason;
    }
    
    public Instant getCreatedAt() {
        return createdAt;
    }
}