package com.Riseon.app.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Riseon.app.constants.ApiEndPoints;

import com.Riseon.app.entities.Users;
import com.Riseon.app.services.AuthServices;
import com.Riseon.app.dto.auth.login.LoginRequest;
import com.Riseon.app.dto.auth.login.LoginResponse;
import com.Riseon.app.dto.auth.signup.SignupRequest;
import com.Riseon.app.dto.auth.signup.SignupResponse;

@RestController
@RequestMapping(ApiEndPoints.AUTH_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AuthController {

    @Autowired
    private AuthServices authServicesServices;

    /** login user */
    @PostMapping(ApiEndPoints.AUTH_LOGIN)
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try{
            Users authenticatedUser = authServicesServices.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            LoginResponse loginResponse = new LoginResponse("Login successful", authenticatedUser.getUser_Id(), authenticatedUser.getUsername(), authenticatedUser.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        } catch(RuntimeException e) {
            LoginResponse loginResponse = new LoginResponse(e.getMessage(), null, null, null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        } catch(Exception e) {
            LoginResponse loginResponse = new LoginResponse("Login failed", null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(loginResponse);
        }
    }

    /** Creates a new user */
    @PostMapping(ApiEndPoints.AUTH_SIGNUP)
    @ResponseBody
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest) {
        try{
            Users newUser = authServicesServices.createUser(signupRequest.getUsername(), signupRequest.getEmail(), signupRequest.getPassword(), signupRequest.getFullName());
            SignupResponse signupResponse = new SignupResponse("Signup successful", newUser.getUser_Id(), newUser.getUsername(), newUser.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
        } catch(RuntimeException e) {
            SignupResponse signupResponse = new SignupResponse(e.getMessage(), null, null, null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(signupResponse);
        } catch(Exception e) {
            SignupResponse signupResponse = new SignupResponse("Signup failed", null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(signupResponse);
        }
    }
}