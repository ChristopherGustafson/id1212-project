package org.kth.backend.controllers;

import javax.validation.Valid;

import org.kth.backend.dto.UserDTO;
import org.kth.backend.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @PostMapping(value = "/")
    ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.email);
        newUser.setPassword(userDto.password);
        return ResponseEntity.ok(newUser);
    }
}
