package com.Riseon.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.Users;
import com.Riseon.app.services.UserServices;

import com.Riseon.app.dto.getUserDetails.GetUserDetailsResponse;
import com.Riseon.app.dto.updateUserDetails.UpdateUserDetailsRequest;
import com.Riseon.app.dto.updateUserDetails.UpdateUserDetailsResponse;

@RestController
@RequestMapping(ApiEndPoints.USER_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
/** Retrieves all the user info based on the user id from the database */
public class UserController {

    @Autowired
    private UserServices userServices;

    // @GetMapping(ApiEndPoints.USER_FETCH_BY_ID)
    // @ResponseBody
    // public GetUserDetailsResponse getUserDetails(@RequestParam(value = "user_Id") String user_Id) {
    //     try{
    //         Users user = userServices.getUserById(user_Id);
    //         return new GetUserDetailsResponse(
    //             "User details retrieved successfully",
    //             user.getUser_Id(),
    //             user.getUsername(),
    //             user.getEmail(),
    //             user.getFullName(),
    //             user.getjoinedAt()
    //         );
    //     } catch(RuntimeException e) {
    //         return new GetUserDetailsResponse(e.getMessage(), null, null, null, null, null);
    //     } catch(Exception e) {
    //         return new GetUserDetailsResponse("Failed to retrieve user details", null, null, null, null, null);
    //     }
    // }
}