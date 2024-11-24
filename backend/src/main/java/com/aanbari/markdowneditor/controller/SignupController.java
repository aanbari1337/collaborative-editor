package com.aanbari.markdowneditor.controller;

import com.aanbari.markdowneditor.model.User;
import com.aanbari.markdowneditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class SignupController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        if (userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User already exist! Try to login");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user
        userRepository.save(user);

        return "User registered successfully";
    }
}
