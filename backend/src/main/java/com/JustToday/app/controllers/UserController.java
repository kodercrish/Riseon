package com.JustToday.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.JustToday.app.repositories.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // @GetMapping("/{userId}")
    // public UserDetalisResponse getUserDetails(@PathVariable UserDetailsRequest userDetailsRequest) {

    // }
}