package com.rc_app.Riesgocrediticio.Controller;

import com.rc_app.Riesgocrediticio.model.FinancialInfo;
import com.rc_app.Riesgocrediticio.model.User;
import com.rc_app.Riesgocrediticio.repository.FinancialInfoRepository;
import com.rc_app.Riesgocrediticio.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/financial")
public class FinancialInfoController {

    private final FinancialInfoRepository financialInfoRepository;
    private final UserRepository userRepository;

    public FinancialInfoController(FinancialInfoRepository financialInfoRepository,
            UserRepository userRepository) {
        this.financialInfoRepository = financialInfoRepository;
        this.userRepository = userRepository;
    }

    /**
     * Endpoint para guardar información financiera
     * 
     * @param info           Datos financieros a guardar
     * @param authentication Objeto de autenticación de Spring Security
     * @return Respuesta con estado de la operación
     */
    @PostMapping
    public ResponseEntity<String> guardarInfoFinanciera(@RequestBody FinancialInfo info,
            Authentication authentication) {
        User user = getUserFromAuthentication(authentication);

        // Versión mejorada de la asignación de usuario
        assignUserToFinancialInfo(info, user);

        financialInfoRepository.save(info);
        return ResponseEntity.ok("Información financiera guardada exitosamente");
    }

    /**
     * Endpoint para obtener información financiera por ID de usuario
     * 
     * @param userId         ID del usuario a consultar
     * @param authentication Objeto de autenticación de Spring Security
     * @return Datos financieros del usuario o error 404 si no existen
     */
    @GetMapping("/{userId}")
    public ResponseEntity<FinancialInfo> obtenerInfoFinanciera(
            @PathVariable Long userId,
            Authentication authentication) {

        validateUserAccess(userId, authentication);

        // Reemplaza el método del repository por:
        return financialInfoRepository.findAll().stream()
                .filter(fi -> fi.getUser().getId().equals(userId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Métodos auxiliares privados para mejor organización

    private User getUserFromAuthentication(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private void validateUserAccess(Long requestedUserId, Authentication authentication) {
        User currentUser = getUserFromAuthentication(authentication);
        if (!currentUser.getId().equals(requestedUserId)) {
            throw new SecurityException("Acceso no autorizado a datos financieros");
        }
    }

    private void assignUserToFinancialInfo(FinancialInfo info, User user) {
        try {
            // Intenta con setUser primero
            info.getClass().getMethod("setUser", User.class).invoke(info, user);
        } catch (Exception e) {
            try {
                // Si falla, intenta con setUsuario (alternativa en español)
                info.getClass().getMethod("setUsuario", User.class).invoke(info, user);
            } catch (Exception ex) {
                throw new IllegalStateException("No se pudo asignar el usuario a la información financiera", ex);
            }
        }
    }
}