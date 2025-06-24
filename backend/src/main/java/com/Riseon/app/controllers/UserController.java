package com.Riseon.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.Users;
import com.Riseon.app.services.UserServices;
import com.Riseon.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import com.Riseon.app.dto.user.getUserDetails.GetUserDetailsResponse;
import com.Riseon.app.dto.user.updateUserDetails.UpdateUserDetailsRequest;
import com.Riseon.app.dto.user.updateUserDetails.UpdateUserDetailsResponse;

@RestController
@RequestMapping(ApiEndPoints.USER_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
/** Retrieves all the user info based on the user id from the database */
public class UserController {
    @Autowired
    private UserServices userServices;
    @Autowired
    private JwtUtil jwtUtil;

    /** Retrieves the user details based on the username */
    @GetMapping(ApiEndPoints.USER_FETCH)
    @ResponseBody
    public ResponseEntity<GetUserDetailsResponse> getUserDetails(@RequestParam(value = "username") String username) {
        try{
            Users user = userServices.getUserByUsername(username);
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse(
                "User details retrieved successfully",
                user.getUsername(),
                user.getFullName(),
                user.getJoinedAt()
            );
            return ResponseEntity.status(HttpStatus.OK).body(getUserDetailsResponse);
        } catch(RuntimeException e) {
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse(e.getMessage(), null, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getUserDetailsResponse);
        } catch(Exception e) {
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse("Failed to retrieve user details", null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getUserDetailsResponse);
        }
    }

    /** Updates the user details based on the username */
    @PutMapping(ApiEndPoints.USER_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateUserDetailsResponse> updateUserDetails(HttpServletRequest request, @RequestBody UpdateUserDetailsRequest updateUserDetailsRequest) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            String message = userServices.updateUserDetails(username, updateUserDetailsRequest.getUsername(), updateUserDetailsRequest.getFullName());

            String newToken = token;
            if(!username.equals(updateUserDetailsRequest.getUsername())){
                // generate a new jwt based on the updated username
                String user_Id = jwtUtil.extractUser_Id(token); // Extract the user_Id from the old token
                newToken = jwtUtil.generateToken(user_Id, updateUserDetailsRequest.getUsername());
            }

            UpdateUserDetailsResponse updateUserDetailsResponse = new UpdateUserDetailsResponse(message, newToken);
            return ResponseEntity.status(HttpStatus.OK).body(updateUserDetailsResponse);
        } catch(RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UpdateUserDetailsResponse(e.getMessage(), null));
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UpdateUserDetailsResponse("Failed to update user details", null));
        }
    }
}