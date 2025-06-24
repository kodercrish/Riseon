package com.Riseon.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.entities.Users;

@Service
public class AuthServices {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /** Authenticates a user with provided email and password */
    public Users authenticateUser(String email, String password) {
        Optional<Users> user = usersRepository.findByEmail(email);
        // checks if the rawpassword entered matches the stored hashed password
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPasswordHash())) return user.get();
        
        throw new RuntimeException("Invalid Credentials");
    }

    /** Checks uniqueness and creates a new user with provided details */
    public Users createUser(String username, String email, String password, String fullName) {
        // null checks
        Optional<Users> existingUser = usersRepository.findByEmail(email);
        if (existingUser.isPresent()) throw new RuntimeException("User with this email already exists");
        existingUser = usersRepository.findByUsername(username);
        if(existingUser.isPresent()) throw new RuntimeException("User with this username already exists");

        // Creating a new user
        Users newUser = new Users();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(passwordEncoder.encode(password)); // Hash the password before saving
        newUser.setFullName(fullName);

        // saving into database
        return usersRepository.save(newUser);
    }
}