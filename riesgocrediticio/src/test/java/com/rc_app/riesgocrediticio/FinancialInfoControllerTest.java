package com.rc_app.Riesgocrediticio;

// Importaciones para pruebas y utilidades
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rc_app.Riesgocrediticio.model.FinancialInfo;
import com.rc_app.Riesgocrediticio.model.User;
import com.rc_app.Riesgocrediticio.repository.FinancialInfoRepository;
import com.rc_app.Riesgocrediticio.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test de integración para FinancialInfoController.
 * 
 * Carga el contexto completo de Spring Boot y utiliza MockMvc para simular
 * peticiones HTTP. Se mockean las dependencias de base de datos.
 */

@SpringBootTest // Levanta todo el contexto de Spring Boot
@AutoConfigureMockMvc // Configura automáticamente MockMvc
public class FinancialInfoControllerTest {

    @Autowired
    private MockMvc mockMvc; // Cliente simulado para hacer peticiones HTTP

    private FinancialInfoRepository financialInfoRepository; // Simula la capa de persistencia

    private UserRepository userRepository; // Simula la búsqueda de usuarios

    /**
     * Prueba el endpoint POST /api/financial.
     * 
     * Simula una petición autenticada que guarda información financiera,
     * valida que la respuesta sea exitosa y que se haya llamado al repositorio.
     */
    @Test
    public void testGuardarInfoFinanciera() throws Exception {
        // Arrange: Crear objetos simulados
        FinancialInfo info = new FinancialInfo();
        info.setFullName("Juan Perez");
        info.setMonthlyIncome(new BigDecimal("1000"));
        info.setMonthlyExpenses(new BigDecimal("500"));
        info.setTotalDebt(new BigDecimal("2000"));
        info.setNetWorth(new BigDecimal("15000"));

        User user = new User();
        user.setUsername("juanperez");

        // Simular que el repositorio de usuarios encuentra el usuario
        when(userRepository.findByUsername("juanperez")).thenReturn(Optional.of(user));

        // Act: Realizar la petición POST al endpoint
        mockMvc.perform(post("/api/financial")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(info))
                .with(user("juanperez"))) // Simular autenticación como 'juanperez'
                .andExpect(status().isOk()) // Esperar que la respuesta sea 200 OK
                .andExpect(content().string("Información financiera guardada exitosamente"));

        // Assert: Verificar que el método save() fue llamado una vez
        verify(financialInfoRepository, times(1)).save(any(FinancialInfo.class));
    }

    /**
     * Prueba el endpoint GET /api/financial/{userId}.
     * 
     * Simula una petición autenticada que obtiene la información financiera
     * de un usuario y valida la respuesta.
     */
    @Test
    @WithMockUser(username = "juanperez") // Simula un usuario autenticado
    public void testObtenerInfoFinanciera() throws Exception {
        Long userId = 1L;

        // Crear una instancia de FinancialInfo con los valores esperados
        FinancialInfo info = new FinancialInfo();
        info.setFullName("Juan Perez");
        info.setMonthlyIncome(new BigDecimal("1000"));
        info.setMonthlyExpenses(new BigDecimal("500"));
        info.setTotalDebt(new BigDecimal("2000"));
        info.setNetWorth(new BigDecimal("15000"));

        // Crear un usuario asociado
        User user = new User();
        user.setId(userId);
        user.setUsername("juanperez");

        // Asociar el usuario al objeto FinancialInfo
        info.setUser(user);

        // Configuración de los mocks
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(financialInfoRepository.findAll()).thenReturn(List.of(info));

        // Realizar la solicitud y verificar el JSON de la respuesta
        mockMvc.perform(get("/api/financial/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Juan Perez")) // Verificar fullName
                .andExpect(jsonPath("$.monthlyIncome").value(1000)) // Verificar monthlyIncome
                .andExpect(jsonPath("$.monthlyExpenses").value(500)) // Verificar monthlyExpenses
                .andExpect(jsonPath("$.totalDebt").value(2000)) // Verificar totalDebt
                .andExpect(jsonPath("$.netWorth").value(15000)); // Verificar netWorth
    }
}
