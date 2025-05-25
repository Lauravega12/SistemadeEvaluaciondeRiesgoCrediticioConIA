package com.rc_app.riesgocrediticio;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
class authControllerTest {

    @Autowired
    private MockMvc mockMvc; // Se utiliza para simular peticiones HTTP y obtener respuestas

    private UserService userService; // Mock de UserService para inyectar en el controlador

    private PasswordEncoder passwordEncoder; // Mock de PasswordEncoder para simular la comparación de contraseñas

    /**
     * Test para verificar el inicio de sesión exitoso.
     * Aquí el usuario existe y las credenciales son correctas.
     */
    @Test
    @WithMockUser(username = "testuser", roles = "USER")
    void loginSuccessTest() throws Exception {
        String username = "testuser";
        String rawPassword = "1234"; // Contraseña en texto plano

        // Usamos un encoder real en lugar del mock para simular un hash real de la
        // contraseña
        PasswordEncoder realEncoder = new BCryptPasswordEncoder();
        String encodedPassword = realEncoder.encode(rawPassword); // Codificamos la contraseña

        // Creamos un usuario simulado
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);

        // Simulamos que el servicio encuentra al usuario con las credenciales correctas
        when(userService.findByUsername(username)).thenReturn(user);
        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true); // Mock de la verificación de la
                                                                                      // contraseña

        // Realizamos la petición GET a "/auth/login"
        mockMvc.perform(get("/auth/login")
                .param("username", username)
                .param("password", rawPassword))
                .andExpect(status().isOk()) // Esperamos un código 200 OK
                .andExpect(content().string("Login correcto")); // Y un mensaje de éxito
    }

    /**
     * Test para verificar el fallo de inicio de sesión cuando las credenciales son
     * incorrectas.
     */
    @Test
    @WithMockUser(username = "testuser", roles = "USER")
    void loginFailureTest() throws Exception {
        String username = "testuser";
        String wrongPassword = "wrongpassword"; // Contraseña incorrecta

        // Realizamos la petición GET a "/auth/login"
        mockMvc.perform(get("/auth/login")
                .param("username", username)
                .param("password", wrongPassword))
                .andExpect(status().isUnauthorized()) // Esperamos un código 401 Unauthorized
                .andExpect(content().string("Credenciales inválidas")); // Y un mensaje de error
    }

    /**
     * Test para verificar que el inicio de sesión falle si el usuario no se
     * encuentra en la base de datos.
     */
    @Test
    @WithMockUser(username = "unknownuser", roles = "USER")
    void loginUserNotFoundTest() throws Exception {
        String username = "unknownuser"; // Usuario inexistente
        String password = "1234"; // Contraseña cualquiera

        // Simulamos que el usuario no fue encontrado
        when(userService.findByUsername(username)).thenReturn(null);

        // Realizamos la petición GET a "/auth/login"
        mockMvc.perform(get("/auth/login")
                .param("username", username)
                .param("password", password))
                .andExpect(status().isUnauthorized()) // Esperamos un código 401 Unauthorized
                .andExpect(content().string("Credenciales inválidas")); // Y un mensaje de error
    }

    /**
     * Test para verificar que el inicio de sesión falle si los campos de usuario o
     * contraseña están vacíos.
     */
    @Test
    @WithMockUser(username = "anyuser", roles = "USER")
    void loginEmptyFieldsTest() throws Exception {
        String username = ""; // Campo vacío para el nombre de usuario
        String password = ""; // Campo vacío para la contraseña

        // Realizamos la petición GET a "/auth/login"
        mockMvc.perform(get("/auth/login")
                .param("username", username)
                .param("password", password))
                .andExpect(status().isUnauthorized()) // Esperamos un código 401 Unauthorized
                .andExpect(content().string("Credenciales inválidas")); // Y un mensaje de error
    }
}
