package com.rc_app.riesgocrediticio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rc_app.riesgocrediticio.model.AuthResponse;
import com.rc_app.riesgocrediticio.model.FinancialInfo;
import com.rc_app.riesgocrediticio.model.LoginRequest;
import com.rc_app.riesgocrediticio.model.Role;
import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.repository.FinancialInfoRepository;
import com.rc_app.riesgocrediticio.repository.RoleRepository;
import com.rc_app.riesgocrediticio.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Set;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EndToEndTest {
    private static final Logger logger = LoggerFactory.getLogger(EndToEndTest.class);

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FinancialInfoRepository financialInfoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String USERNAME = "userdemo";
    private final String PASSWORD = "123456";

    @BeforeEach
    public void setup() {
        // Limpia datos previos
        financialInfoRepository.deleteAll();
        userRepository.deleteAll();
        roleRepository.deleteAll();

        // Crea el rol primero con prefijo ROLE_
        Role userRole = new Role();
        userRole.setRole("ROLE_USER");
        roleRepository.save(userRole);

        // Crea usuario con contraseña hasheada correctamente
        User user = new User();
        user.setUsername(USERNAME);
        user.setPassword(passwordEncoder.encode(PASSWORD));
        user.setEnabled(true);
        user.setRoles(Set.of(userRole));
        user = userRepository.save(user);

        // Crea información financiera para el usuario
        FinancialInfo info = new FinancialInfo();
        info.setFullName("Demo Usuario");
        info.setMonthlyIncome(new BigDecimal("2500"));
        info.setMonthlyExpenses(new BigDecimal("800"));
        info.setTotalDebt(new BigDecimal("1500"));
        info.setNetWorth(new BigDecimal("10000"));
        info.setUser(user);
        financialInfoRepository.save(info);

        // Log de la información financiera
        logger.info("\n=== INFORMACIÓN FINANCIERA CREADA ===");
        logger.info("Usuario: {}", user.getUsername());
        logger.info("Nombre completo: {}", info.getFullName());
        logger.info("Ingresos mensuales: {}", info.getMonthlyIncome());
        logger.info("Gastos mensuales: {}", info.getMonthlyExpenses());
        logger.info("Deuda total: {}", info.getTotalDebt());
        logger.info("Patrimonio neto: {}\n", info.getNetWorth());
    }

    @Test
    public void testLoginAndGetFinancialInfo() throws Exception {
        // Paso 1: Login del usuario
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(USERNAME);
        loginRequest.setPassword(PASSWORD);

        logger.info("Iniciando prueba - Login para usuario: {}", USERNAME);
        
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn().getResponse().getContentAsString();

        AuthResponse authResponse = objectMapper.readValue(response, AuthResponse.class);
        String jwtToken = authResponse.getToken();
        logger.info("Login exitoso. Token JWT recibido");

        // Paso 2: Obtener ID del usuario
        User user = userRepository.findByUsername(USERNAME).orElseThrow();
        Long userId = user.getId();
        logger.info("ID de usuario obtenido: {}", userId);

        // Paso 3: Hacer GET con JWT al endpoint de info financiera
        logger.info("Solicitando información financiera...");
        
        mockMvc.perform(get("/api/financial/" + userId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Demo Usuario"))
                .andExpect(jsonPath("$.monthlyIncome").value(2500))
                .andExpect(jsonPath("$.monthlyExpenses").value(800))
                .andExpect(jsonPath("$.totalDebt").value(1500))
                .andExpect(jsonPath("$.netWorth").value(10000));
        
        logger.info("Prueba completada exitosamente");
    }
}