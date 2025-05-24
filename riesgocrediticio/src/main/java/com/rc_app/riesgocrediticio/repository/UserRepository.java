package com.rc_app.Riesgocrediticio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rc_app.Riesgocrediticio.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}