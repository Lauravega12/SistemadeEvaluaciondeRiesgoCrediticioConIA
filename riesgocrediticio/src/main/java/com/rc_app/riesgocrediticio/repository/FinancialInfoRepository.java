package com.rc_app.Riesgocrediticio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rc_app.Riesgocrediticio.model.FinancialInfo;

public interface FinancialInfoRepository extends JpaRepository<FinancialInfo, Long> {
}