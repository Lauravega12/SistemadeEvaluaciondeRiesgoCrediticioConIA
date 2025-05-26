package com.rc_app.riesgocrediticio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoRiesgo;
    private String comentario;
    private int edad;
    private double ingresos;
    private double deudas;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public String getTipoRiesgo() {
        return tipoRiesgo;
    }

    public String getComentario() {
        return comentario;
    }

    public int getEdad() {
        return edad;
    }

    public double getIngresos() {
        return ingresos;
    }

    public double getDeudas() {
        return deudas;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTipoRiesgo(String tipoRiesgo) {
        this.tipoRiesgo = tipoRiesgo;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public void setIngresos(double ingresos) {
        this.ingresos = ingresos;
    }

    public void setDeudas(double deudas) {
        this.deudas = deudas;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
