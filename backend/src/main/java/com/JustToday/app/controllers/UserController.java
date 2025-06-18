package com.JustToday.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.JustToday.app.repositories.UserRepository;
import com.JustToday.app.constants.ApiEndPoints;

import com.JustToday.app.entities.User;
import com.JustToday.app.dto.userDetails.UserDetailsRequest;
import com.JustToday.app.dto.userDetails.UserDetailsResponse;

@RestController
@RequestMapping(ApiEndPoints.USER_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
/** Retrieves all the user info based on the user id from the database */
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(ApiEndPoints.USER_BY_ID)
    @ResponseBody
    public UserDetailsResponse getUserDetails(@RequestBody UserDetailsRequest userDetailsRequest) {
        User user = userRepository.findById(userDetailsRequest.getUserId()).orElse(null);
        if (user == null) {
            return new UserDetailsResponse("User not found", null, null);
        }
        return new UserDetailsResponse("User details retrieved successfully", user.getUsername(), user.getEmail());
    }
}