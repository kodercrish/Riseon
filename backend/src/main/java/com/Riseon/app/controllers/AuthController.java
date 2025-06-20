package com.Riseon.app.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Riseon.app.constants.ApiEndPoints;

import com.Riseon.app.entities.Users;
import com.Riseon.app.services.AuthServices;
import com.Riseon.app.dto.login.LoginRequest;
import com.Riseon.app.dto.login.LoginResponse;
import com.Riseon.app.dto.signup.SignupRequest;
import com.Riseon.app.dto.signup.SignupResponse;

@RestController
@RequestMapping(ApiEndPoints.AUTH_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AuthController {

    @Autowired
    private AuthServices authServicesServices;

    @PostMapping(ApiEndPoints.AUTH_LOGIN)
    @ResponseBody
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        try{
            Users authenticatedUser = authServicesServices.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            return new LoginResponse("Login successful", authenticatedUser.getUser_Id(), authenticatedUser.getUsername(), authenticatedUser.getEmail());
        } catch(RuntimeException e) {
            return new LoginResponse(e.getMessage(), null, null, null);
        } catch(Exception e) {
            return new LoginResponse("Login failed", null, null, null);
        }
    }

    @PostMapping(ApiEndPoints.AUTH_SIGNUP)
    @ResponseBody
    public SignupResponse signup(@RequestBody SignupRequest signupRequest) {
        try{
            Users newUser = authServicesServices.createUser(signupRequest.getUsername(), signupRequest.getEmail(), signupRequest.getPassword(), signupRequest.getFullName());
            return new SignupResponse("Signup successful", newUser.getUser_Id(), newUser.getUsername(), newUser.getEmail());
        } catch(RuntimeException e) {
            return new SignupResponse(e.getMessage(), null, null, null);
        } catch(Exception e) {
            return new SignupResponse("Signup failed", null, null, null);
        }
    }
}
