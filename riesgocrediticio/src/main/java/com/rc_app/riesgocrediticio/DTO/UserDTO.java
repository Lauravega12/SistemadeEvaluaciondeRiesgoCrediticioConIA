package com.rc_app.riesgocrediticio.DTO;

public class UserDTO {
    private Long id;
    private String username;
    private String tipoRiesgo;

    public UserDTO(Long id, String username, String tipoRiesgo) {
        this.id = id;
        this.username = username;
        this.tipoRiesgo = tipoRiesgo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTipoRiesgo() {
        return tipoRiesgo;
    }

    public void setTipoRiesgo(String tipoRiesgo) {
        this.tipoRiesgo = tipoRiesgo;
    }
}
