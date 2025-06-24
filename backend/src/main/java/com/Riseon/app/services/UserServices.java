package com.Riseon.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.entities.Users;

@Service
public class UserServices implements UserDetailsService {
    @Autowired
    private UsersRepository usersRepository;

    /** Implementation of UserDetailsService for Spring Security */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Since your JWT tokens use email, this method receives email as parameter
        Optional<Users> user = usersRepository.findByUsername(username);
        if(!user.isPresent()) throw new RuntimeException("User not found");
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.get().getUsername())
            .password(user.get().getPasswordHash())
            .build();
    }

    /** Retrieves the user details based on the username */
    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    /** Updates the user details based on the username */
    public String updateUserDetails(String username, String newUsername, String fullName) {
        // nulll check
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if any other user with the updated username provided already exists
        Optional<Users> existingUser = usersRepository.findByUsername(username);
        if (existingUser.isPresent() && !existingUser.get().getUsername().equals(newUsername)) throw new RuntimeException("Username already exists");

        // Update user details
        if(!newUsername.isEmpty() && !newUsername.trim().isEmpty() && !newUsername.equals(username)) user.setUsername(newUsername);
        if(!fullName.isEmpty() && !fullName.trim().isEmpty()) user.setFullName(fullName);
        // Save the updated user details in the database
        usersRepository.save(user);

        return "User details updated successfully";        
    }
}