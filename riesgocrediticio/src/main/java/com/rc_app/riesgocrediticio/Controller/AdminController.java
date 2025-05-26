package com.rc_app.riesgocrediticio.controller;

import com.rc_app.riesgocrediticio.DTO.UserWithAssessmentDTO;
import com.rc_app.riesgocrediticio.model.Assessment;
import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.repository.AssessmentRepository;
import com.rc_app.riesgocrediticio.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final AssessmentRepository assessmentRepository;

    public AdminController(UserRepository userRepository, AssessmentRepository assessmentRepository) {
        this.userRepository = userRepository;
        this.assessmentRepository = assessmentRepository;
    }

    @GetMapping("/usuarios")
    public List<UserWithAssessmentDTO> getUsuariosFiltrados(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String riskLevel) {
        return userRepository.findAll().stream()
                .filter(user -> userId == null || user.getId().equals(userId))
                .filter(user -> username == null || user.getUsername().toLowerCase().contains(username.toLowerCase()))
                .map(user -> {
                    Assessment a = assessmentRepository.findByUserId(user.getId()).orElse(null);
                    String risk = (a != null) ? a.getTipoRiesgo() : null;
                    return new UserWithAssessmentDTO(user.getId(), user.getUsername(), risk);
                })
                .filter(dto -> riskLevel == null
                        || (dto.getRiskLevel() != null && dto.getRiskLevel().equalsIgnoreCase(riskLevel)))
                .collect(Collectors.toList());
    }
}
