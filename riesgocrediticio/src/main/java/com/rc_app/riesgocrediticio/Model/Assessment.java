package com.rc_app.riesgocrediticio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    private double income;
    private double debt;

    @Column(name = "active_credits")
    private int activeCredits;

    private int age;

    @Column(name = "employment_duration")
    private int employmentDuration;

    @Column(name = "requested_amount")
    private double requestedAmount;

    @Column(name = "risk_level")
    private String riskLevel;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public double getIncome() {
        return income;
    }

    public double getDebt() {
        return debt;
    }

    public int getActiveCredits() {
        return activeCredits;
    }

    public int getAge() {
        return age;
    }

    public int getEmploymentDuration() {
        return employmentDuration;
    }

    public double getRequestedAmount() {
        return requestedAmount;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public void setDebt(double debt) {
        this.debt = debt;
    }

    public void setActiveCredits(int activeCredits) {
        this.activeCredits = activeCredits;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmploymentDuration(int employmentDuration) {
        this.employmentDuration = employmentDuration;
    }

    public void setRequestedAmount(double requestedAmount) {
        this.requestedAmount = requestedAmount;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
