package com.rc_app.riesgocrediticio.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.rc_app.riesgocrediticio.repository.AssessmentRepository;
import com.rc_app.riesgocrediticio.DTO.UserDTO;
import com.rc_app.riesgocrediticio.model.Assessment;

@Service
public class UserService {

    private final AssessmentRepository assessmentRepository;

    public UserService(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    public List<UserDTO> getFilteredUsers(String userIdStr, String username, String riskLevel) {
        return assessmentRepository.findAll().stream()
                .filter(assessment -> {
                    // Filtrar por user_id (si se proporciona)
                    if (userIdStr != null && !userIdStr.isEmpty()) {
                        try {
                            Long userId = Long.parseLong(userIdStr);
                            if (!assessment.getUser().getId().equals(userId)) {
                                return false;
                            }
                        } catch (NumberFormatException e) {
                            return false;
                        }
                    }

                    // Filtrar por username
                    if (username != null && !username.isEmpty()) {
                        if (!assessment.getUser().getUsername().toLowerCase().contains(username.toLowerCase())) {
                            return false;
                        }
                    }

                    // Filtrar por risk_level (tipoRiesgo)
                    if (riskLevel != null && !riskLevel.isEmpty()) {
                        if (!assessment.getTipoRiesgo().toLowerCase().contains(riskLevel.toLowerCase())) {
                            return false;
                        }
                    }

                    return true;
                })
                .map(a -> new UserDTO(
                        a.getUser().getId(),
                        a.getUser().getUsername(),
                        a.getTipoRiesgo()))
                .collect(Collectors.toList());
    }
}
