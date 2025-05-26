package com.rc_app.riesgocrediticio.repository;

import com.rc_app.riesgocrediticio.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    Optional<Assessment> findByUserId(Long userId);
}
