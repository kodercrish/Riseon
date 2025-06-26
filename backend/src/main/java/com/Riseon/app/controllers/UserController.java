package com.Riseon.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.Users;
import com.Riseon.app.services.UserServices;
import com.Riseon.app.util.JwtCookieUtil;
import com.Riseon.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
    @Autowired
    private JwtCookieUtil jwtCookieUtil;

    /** Retrieves the user details based on the username */
    @GetMapping(ApiEndPoints.USER_FETCH)
    @ResponseBody
    public ResponseEntity<GetUserDetailsResponse> getUserDetails(@RequestParam("username") String username) {
        try {
            Users user = userServices.getUserByUsername(username);
            GetUserDetailsResponse response = new GetUserDetailsResponse(
                    "User details retrieved successfully",
                    user.getUsername(),
                    user.getFullName(),
                    user.getJoinedAt()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new GetUserDetailsResponse(e.getMessage(), null, null, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GetUserDetailsResponse("Failed to retrieve user details", null, null, null));
        }
    }

    /** Updates the user details based on the username */
    @PutMapping(ApiEndPoints.USER_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateUserDetailsResponse> updateUserDetails(HttpServletRequest request, HttpServletResponse response, @RequestBody UpdateUserDetailsRequest updateUserDetailsRequest) {
        try {
            String jwt = jwtCookieUtil.extractJwtFromCookies(request);
            String oldUsername = jwtUtil.extractUsername(jwt);
            String user_Id = jwtUtil.extractUser_Id(jwt); // Assuming this method exists

            String message = userServices.updateUserDetails(oldUsername, updateUserDetailsRequest.getUsername(), updateUserDetailsRequest.getFullName());

            String updatedJwt = jwt;

            // If username has changed, generate new JWT
            if (!oldUsername.equals(updateUserDetailsRequest.getUsername())) {
                // Generate new JWT with updated username
                updatedJwt = jwtUtil.generateToken(user_Id, updateUserDetailsRequest.getUsername());

                // Set new JWT as HttpOnly cookie
                jwtCookieUtil.setJwtCookie(response, updatedJwt);
            }

            UpdateUserDetailsResponse updateUserDetailsResponse = new UpdateUserDetailsResponse(message); // token removed from response
            return ResponseEntity.ok(updateUserDetailsResponse);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UpdateUserDetailsResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UpdateUserDetailsResponse("Failed to update user details"));
        }
    }
}