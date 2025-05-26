package com.rc_app.riesgocrediticio.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.rc_app.riesgocrediticio.service.UserService;
import com.rc_app.riesgocrediticio.DTO.UserDTO;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Nuevo endpoint con filtros opcionales actualizados
    @GetMapping("/assessments")
    public List<UserDTO> getUsers(
            @RequestParam(required = false) String user_id,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String risk_level) {
        return userService.getFilteredUsers(user_id, username, risk_level);
    }
}
