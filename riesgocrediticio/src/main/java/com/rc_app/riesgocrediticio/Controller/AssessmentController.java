/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.rc_app.riesgocrediticio.controller;

import com.rc_app.riesgocrediticio.model.Assessment;
import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.repository.AssessmentRepository;
import com.rc_app.riesgocrediticio.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author santiago
 */
@RestController
@RequestMapping("/api/user")
public class AssessmentController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/assessment")
    public ResponseEntity<?> getAssessmentForCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        String username = authentication.getName();
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        User user = optionalUser.get();
        Optional<Assessment> optionalAssessment = assessmentRepository.findByUserId(user.getId());

        if (optionalAssessment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró evaluación de riesgo para el usuario");
        }

        return ResponseEntity.ok(optionalAssessment.get());
    }
}

