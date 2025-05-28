package com.rc_app.riesgocrediticio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rc_app.riesgocrediticio.model.AuthResponse;
import com.rc_app.riesgocrediticio.model.LoginRequest;
import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.repository.UserRepository;
import com.rc_app.riesgocrediticio.security.JwtUtil;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, 
                         JwtUtil jwtUtil,
                         UserRepository userRepository,
                         PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtil.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Obtenemos todos los roles del usuario como lista de strings
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AuthResponse(token, roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        try {
            // Validar que el username no esté vacío
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse("El nombre de usuario es requerido", null));
            }

            // Validar que el password no esté vacío
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse("La contraseña es requerida", null));
            }

            // Verificar si el usuario ya existe
            Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse("El usuario ya existe", null));
            }

            // Crear nuevo usuario
            User newUser = new User();
            newUser.setUsername(request.getUsername().trim());
            newUser.setPassword(passwordEncoder.encode(request.getPassword()));
            newUser.setEnabled(true); // Por defecto habilitado

            // Guardar usuario en la base de datos
            userRepository.save(newUser);

            return ResponseEntity.ok(new AuthResponse("Usuario registrado exitosamente", null));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new AuthResponse("Error interno del servidor", null));
        }
    }
}