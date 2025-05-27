package com.rc_app.riesgocrediticio.DTO;

public class UserAssessmentDTO {
    private Long userId;
    private String username;
    private String riskLevel;

    public UserAssessmentDTO(Long userId, String username, String riskLevel) {
        this.userId = userId;
        this.username = username;
        this.riskLevel = riskLevel;
    }

    // Getters y setters
    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}
