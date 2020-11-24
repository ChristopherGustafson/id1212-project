package org.kth.backend.controllers;

import javax.validation.Valid;

import org.kth.backend.dto.UserDTO;
import org.kth.backend.models.User;
import org.kth.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/")
    public @ResponseBody User createUser(@Valid @RequestBody UserDTO userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.email);
        newUser.setPassword(userDto.password);
        userRepository.save(newUser);
        return newUser;
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
