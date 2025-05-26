package com.rc_app.riesgocrediticio.configuration;

import com.rc_app.riesgocrediticio.model.Role;
import com.rc_app.riesgocrediticio.model.User;
import com.rc_app.riesgocrediticio.repository.RoleRepository;
import com.rc_app.riesgocrediticio.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Inicializar roles (ADMIN y USER)
        Role adminRole = roleRepository.findByRole("ADMIN") // <-- también debes actualizar este método en tu repo
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setRole("ADMIN");
                    return roleRepository.save(role);
                });

        Role userRole = roleRepository.findByRole("USER")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setRole("USER");
                    return roleRepository.save(role);
                });

        // 2. Crear usuario administrador
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Collections.singleton(adminRole));
            userRepository.save(admin);
            System.out.println("Usuario admin creado con éxito");
        }

        // 3. Crear usuario normal
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRoles(Collections.singleton(userRole));
            userRepository.save(user);
            System.out.println("Usuario user creado con éxito");
        }
    }
}