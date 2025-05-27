package com.rc_app.riesgocrediticio.controller;

import com.rc_app.riesgocrediticio.model.Assessment;
import com.rc_app.riesgocrediticio.repository.AssessmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/assessments")
@PreAuthorize("hasRole('ADMIN')") // Protege todo el controlador
public class AssessmentAdminController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }
}
