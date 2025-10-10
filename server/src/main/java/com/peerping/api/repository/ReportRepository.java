package com.peerping.api.repository;

import com.peerping.api.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReportRepository extends JpaRepository<Report, UUID> {
    @Query("SELECT r FROM Report r WHERE r.reportedUser.id = :userId AND r.status = :status")
    Page<Report> findByReportedUserIdAndStatus(@Param("userId") UUID userId, 
                                              @Param("status") Report.ReportStatus status, 
                                              Pageable pageable);
    
    @Query("SELECT COUNT(r) FROM Report r WHERE r.reportedUser.id = :userId AND r.status = 'ACTIONED'")
    long countActionedReportsForUser(@Param("userId") UUID userId);
    
    Page<Report> findByStatus(Report.ReportStatus status, Pageable pageable);
}