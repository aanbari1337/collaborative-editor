package com.aanbari.markdowneditor.controller;

import com.aanbari.markdowneditor.model.AuthRequest;
import com.aanbari.markdowneditor.model.User;
import com.aanbari.markdowneditor.repository.UserRepository;
import com.aanbari.markdowneditor.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        if (userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User already exist! Try to login"); // TODO: handle the exception
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user
        userRepository.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails.getUsername());
    }



}
