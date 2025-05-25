package com.rc_app.riesgocrediticio.controller;

import com.rc_app.riesgocrediticio.model.FinancialInfo;
import com.rc_app.riesgocrediticio.repository.FinancialInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/admin/financial-info")
@PreAuthorize("hasRole('ADMIN')") // Protege todo el controlador
public class FinancialInfoAdminController {

    @Autowired
    private FinancialInfoRepository financialInfoRepository;

    @GetMapping
    public List<FinancialInfo> getAllFinancialInfo() {
        return financialInfoRepository.findAll();
    }
}
