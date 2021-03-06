package org.kth.backend.controllers;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.Arrays;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.kth.backend.dto.UserDTO;
import org.kth.backend.models.User;
import org.kth.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    public static final String EMAIL_SESSION_ATTRIBUTE = "email";

    @Autowired
    private UserRepository userRepository;

    private final byte[] hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return digest.digest(password.getBytes(StandardCharsets.UTF_8));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDto, HttpSession session)
            throws NoSuchAlgorithmException {
        if (userRepository.existsById(userDto.email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
        }

        User newUser = new User();
        newUser.setEmail(userDto.email);
        newUser.setPassword(hashPassword(userDto.password));
        userRepository.save(newUser);

        session.setAttribute(EMAIL_SESSION_ATTRIBUTE, newUser.getEmail());

        return ResponseEntity.ok(newUser);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<User> login(@Valid @RequestBody UserDTO userDto, HttpSession session)
            throws NoSuchAlgorithmException {
        Optional<User> userEntry = userRepository.findById(userDto.email);
        if (userEntry.isPresent()) {
            User user = userEntry.get();
            if (Arrays.equals(user.getPassword(), hashPassword(userDto.password))) {
                session.setAttribute(EMAIL_SESSION_ATTRIBUTE, user.getEmail());
                return ResponseEntity.ok(user);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong password");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with specified email wasn't found");
    }

    @GetMapping(value = "/me")
    public ResponseEntity<User> getMe(HttpSession session) {
        String email = (String) session.getAttribute(EMAIL_SESSION_ATTRIBUTE);
        if (email != null && email != "") {
            Optional<User> userEntry = userRepository.findById(email);
            if (userEntry.isPresent()) {
                return ResponseEntity.ok(userEntry.get());
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your user wasn't found");
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Successfully logged out");
    }
}
