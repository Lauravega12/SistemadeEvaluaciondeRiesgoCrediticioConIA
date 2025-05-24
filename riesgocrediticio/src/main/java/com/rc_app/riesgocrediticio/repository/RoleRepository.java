package com.rc_app.Riesgocrediticio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rc_app.Riesgocrediticio.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(String role);

    boolean existsByRole(String role);
}
