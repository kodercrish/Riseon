package com.Riseon.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.entities.Users;

@Service
public class UserServices {
    @Autowired
    private UsersRepository usersRepository;

    /** Retrieves the user details based on the user id */
    public Users getUserById(String user_Id) {
        return usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // public String updateUserDetails(String user_Id, String email, String fullName) {
    // }
}