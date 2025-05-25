package com.rc_app.riesgocrediticio.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "financial_info")
public class FinancialInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "monthly_income")
    private BigDecimal monthlyIncome;

    @Column(name = "monthly_expenses")
    private BigDecimal monthlyExpenses;

    @Column(name = "total_debt")
    private BigDecimal totalDebt;

    @Column(name = "net_worth")
    private BigDecimal netWorth;

    @Column(name = "last_updated")
    private LocalDate lastUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id") // <<--- Esto conecta FinancialInfo con User
    private User user;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public BigDecimal getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(BigDecimal monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public BigDecimal getMonthlyExpenses() {
        return monthlyExpenses;
    }

    public void setMonthlyExpenses(BigDecimal monthlyExpenses) {
        this.monthlyExpenses = monthlyExpenses;
    }

    public BigDecimal getTotalDebt() {
        return totalDebt;
    }

    public void setTotalDebt(BigDecimal totalDebt) {
        this.totalDebt = totalDebt;
    }

    public BigDecimal getNetWorth() {
        return netWorth;
    }

    public void setNetWorth(BigDecimal netWorth) {
        this.netWorth = netWorth;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
