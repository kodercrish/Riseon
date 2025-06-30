package com.Riseon.app.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Riseon.app.constants.ApiEndPoints;

import com.Riseon.app.entities.Users;
import com.Riseon.app.services.AuthServices;
import com.Riseon.app.services.UserServices;
import com.Riseon.app.util.JwtCookieUtil;
import com.Riseon.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.Riseon.app.dto.auth.login.LoginRequest;
import com.Riseon.app.dto.auth.login.LoginResponse;
import com.Riseon.app.dto.auth.signup.SignupRequest;
import com.Riseon.app.dto.auth.signup.SignupResponse;
import com.Riseon.app.dto.user.getUserDetails.GetUserDetailsResponse;

@RestController
@RequestMapping(ApiEndPoints.AUTH_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AuthController {

    @Autowired
    private AuthServices authServicesServices;
    @Autowired
    private UserServices userServices;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JwtCookieUtil jwtCookieUtil;

    /** login user */
    @PostMapping(ApiEndPoints.AUTH_LOGIN)
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try{
            Users authenticatedUser = authServicesServices.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

            // create jwt token
            String jwtToken = jwtUtil.generateToken(authenticatedUser.getUser_Id(), authenticatedUser.getUsername());

            // Create secure HttpOnly cookie
            jwtCookieUtil.setJwtCookie(response, jwtToken);            

            // Response body (no token, only message passed)
            LoginResponse loginResponse = new LoginResponse("Login successful");
            return ResponseEntity.ok(loginResponse);
        } catch(RuntimeException e) {
            LoginResponse loginResponse = new LoginResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        } catch(Exception e) {
            LoginResponse loginResponse = new LoginResponse("Login failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(loginResponse);
        }
    }

    /** Creates a new user */
    @PostMapping(ApiEndPoints.AUTH_SIGNUP)
    @ResponseBody
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest, HttpServletResponse response) {
        try{
            Users newUser = authServicesServices.createUser(signupRequest.getUsername(), signupRequest.getEmail(), signupRequest.getPassword(), signupRequest.getFullName());

            // create jwt token
            String jwtToken = jwtUtil.generateToken(newUser.getUser_Id(), newUser.getUsername());

            // Create secure HttpOnly cookie
            jwtCookieUtil.setJwtCookie(response, jwtToken);

            SignupResponse signupResponse = new SignupResponse("Signup successful");
            return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SignupResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new SignupResponse("Signup failed"));
        }
    }

    @GetMapping(ApiEndPoints.AUTH_FETCH_USER)
    @ResponseBody
    public ResponseEntity<GetUserDetailsResponse> getAuthenticatedUser(HttpServletRequest request) {
        try {
            String username = jwtCookieUtil.extractUsernameFromRequest(request);
            Users user = userServices.getUserByUsername(username);
            GetUserDetailsResponse response = new GetUserDetailsResponse(
                "Authenticated user fetched",
                user.getUsername(),
                user.getFullName(),
                user.getJoinedAt()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GetUserDetailsResponse("Unauthorized", null, null, null));
        }
    }

    @PostMapping(ApiEndPoints.AUTH_LOGOUT)
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // clear the cookie
        jwtCookieUtil.clearJwtCookie(response);

        return ResponseEntity.ok("Logged out successfully");
    }
}
