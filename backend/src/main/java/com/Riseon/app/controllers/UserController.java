package com.Riseon.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.Users;
import com.Riseon.app.services.UserServices;

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

    /** Retrieves the user details based on the user id */
    @GetMapping(ApiEndPoints.USER_FETCH)
    @ResponseBody
    public ResponseEntity<GetUserDetailsResponse> getUserDetails(@RequestParam(value = "user_Id") String user_Id) {
        try{
            Users user = userServices.getUserById(user_Id);
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse(
                "User details retrieved successfully",
                user.getUser_Id(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getJoinedAt()
            );
            return ResponseEntity.status(HttpStatus.OK).body(getUserDetailsResponse);
        } catch(RuntimeException e) {
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse(e.getMessage(), null, null, null, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getUserDetailsResponse);
        } catch(Exception e) {
            GetUserDetailsResponse getUserDetailsResponse = new GetUserDetailsResponse("Failed to retrieve user details", null, null, null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getUserDetailsResponse);
        }
    }

    /** Updates the user details based on the user id */
    @PutMapping(ApiEndPoints.USER_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateUserDetailsResponse> updateUserDetails(@RequestBody UpdateUserDetailsRequest updateUserDetailsRequest) {
        try{
            String message = userServices.updateUserDetails(updateUserDetailsRequest.getUser_Id(), updateUserDetailsRequest.getUsername(), updateUserDetailsRequest.getFullName());
            UpdateUserDetailsResponse updateUserDetailsResponse = new UpdateUserDetailsResponse(message);
            return ResponseEntity.status(HttpStatus.OK).body(updateUserDetailsResponse);
        } catch(RuntimeException e) {
            UpdateUserDetailsResponse updateUserDetailsResponse = new UpdateUserDetailsResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(updateUserDetailsResponse);
        } catch(Exception e) {
            UpdateUserDetailsResponse updateUserDetailsResponse = new UpdateUserDetailsResponse("Failed to update user details");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(updateUserDetailsResponse);
        }
    }
}