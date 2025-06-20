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

    /** Updates the user details based on the user id */
    public String updateUserDetails(String user_Id, String username, String fullName) {
        // nulll check
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if any other user with the updated username provided already exists
        Users existingUser = usersRepository.findByUsername(username);
        if (existingUser != null && !existingUser.getUser_Id().equals(user_Id)) throw new RuntimeException("Username already exists");

        // Update user details
        if(!username.isEmpty() && !username.trim().isEmpty()) user.setUsername(username);
        if(!fullName.isEmpty() && !fullName.trim().isEmpty()) user.setFullName(fullName);
        // Save the updated user details in the database
        usersRepository.save(user);

        return "User details updated successfully";        
    }
}