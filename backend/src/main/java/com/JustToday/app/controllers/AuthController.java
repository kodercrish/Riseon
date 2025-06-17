package com.JustToday.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.JustToday.app.repositories.UserRepository;

import com.JustToday.app.dto.login.LoginRequest;
import com.JustToday.app.dto.login.LoginResponse;
import com.JustToday.app.dto.signup.SignupRequest;
import com.JustToday.app.dto.signup.SignupResponse;
import com.JustToday.app.entities.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        User user = new User();
        user.setEmail(loginRequest.getEmail());
        user.setPassword(loginRequest.getPassword());
        
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
           LoginResponse response = new LoginResponse("User not found", null, null, null);
           return response;
        }
        else if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            LoginResponse response = new LoginResponse("Login successful", existingUser.getUserId(), existingUser.getUsername(), existingUser.getEmail());
            return response;
        }
        else if (!existingUser.getPassword().equals(user.getPassword())) {
            LoginResponse response = new LoginResponse("Incorrect password", null, null, null);
            return response;
        }


        return new LoginResponse("An unexpected error occurred", null, null, null);
    }

    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest signupRequest) {
        // Check if the user already exists
        User existingUser = userRepository.findByEmail(signupRequest.getEmail());
        if(existingUser != null) {
            // User already exists, return an error response
            return new SignupResponse("User already exists with this email", null, null, null);
        }
        
        // Create a new user
        User newUser = new User();
        newUser.setUsername(signupRequest.getUsername());
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPassword(signupRequest.getPassword());
        // Save the new user to the database
        userRepository.save(newUser);

        // Return a success response
        return new SignupResponse("User registered successfully", newUser.getUserId(), newUser.getUsername(), newUser.getEmail());        
    }
}