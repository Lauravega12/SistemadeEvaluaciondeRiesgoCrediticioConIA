package com.rc_app.Riesgocrediticio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.rc_app.Riesgocrediticio.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class PasswordUpdater implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordUpdater(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Actualiza todas las contraseñas en la base de datos
        userRepository.findAll().forEach(user -> {
            // Solo actualiza si la contraseña parece estar en texto plano
            if (!user.getPassword().startsWith("$2a$")) {
                String rawPassword = user.getPassword();
                user.setPassword(passwordEncoder.encode(rawPassword));
                userRepository.save(user);
                System.out.println("Contraseña actualizada para: " + user.getUsername());
            }
        });
    }
}