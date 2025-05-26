package com.rc_app.riesgocrediticio.DTO;

public class UserWithAssessmentDTO {
    private Long userId;
    private String username;
    private String riskLevel;

    public UserWithAssessmentDTO(Long userId, String username, String riskLevel) {
        this.userId = userId;
        this.username = username;
        this.riskLevel = riskLevel;
    }

    // Getters y Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}
