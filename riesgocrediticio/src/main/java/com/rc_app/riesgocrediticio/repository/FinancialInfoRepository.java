package com.rc_app.riesgocrediticio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rc_app.riesgocrediticio.model.FinancialInfo;

public interface FinancialInfoRepository extends JpaRepository<FinancialInfo, Long> {
}