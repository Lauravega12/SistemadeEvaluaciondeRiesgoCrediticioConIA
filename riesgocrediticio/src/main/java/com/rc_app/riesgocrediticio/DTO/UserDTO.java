package com.rc_app.riesgocrediticio.DTO;

public class UserDTO {
    private Long userId;
    private String userName;
    private String riskLevel;

    public UserDTO(Long userId, String userName, String riskLevel) {
        this.userId = userId;
        this.userName = userName;
        this.riskLevel = riskLevel;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}
