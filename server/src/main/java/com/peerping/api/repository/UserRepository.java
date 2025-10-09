package com.peerping.api.repository;

import com.peerping.api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL AND u.id = :id")
    Optional<User> findActiveById(@Param("id") UUID id);
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL AND (u.username = :username OR u.email = :username)")
    Optional<User> findActiveByUsernameOrEmail(@Param("username") String username);
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL AND u.city = :city AND u.id != :excludeUserId")
    Page<User> findActiveUsersByCityExcludingUser(@Param("city") String city, @Param("excludeUserId") UUID excludeUserId, Pageable pageable);
}