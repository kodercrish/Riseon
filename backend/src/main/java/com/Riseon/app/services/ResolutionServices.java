package com.Riseon.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Riseon.app.repositories.ResolutionsRepository;
import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.entities.Users;
import com.Riseon.app.entities.Resolutions;

@Service
public class ResolutionServices {
    @Autowired
    private ResolutionsRepository resolutionsRepository;
    @Autowired
    private UsersRepository usersRepository;

    /** Method to add a new resolution for a user */
    public void addResolution(String username, String title, String description, Boolean isPublic) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Resolutions> resolution = resolutionsRepository.findByUserAndTitle(user, title);
        if (resolution.isPresent()) throw new RuntimeException("Resolution with this title already exists for the user");

        // Create a new resolution
        Resolutions newResolution = new Resolutions();
        newResolution.setUser(user);
        newResolution.setTitle(title);
        newResolution.setDescription(description);
        newResolution.setIsPublic(isPublic);
        newResolution.setIsActive(true);
        newResolution.setCreatedAt(java.time.LocalDateTime.now());

        // saving into database
        resolutionsRepository.save(newResolution);
        return;
    }

    /** Method to get all resolutions of a user */
    public Iterable<Resolutions> getAllResolutions(String username) {
        // null check
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        return resolutionsRepository.findByUser(user);
    }

    /** Method to view all public resolutions of a user */
    public Iterable<Resolutions> getPublicResolutions(String username) {
        // null check
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        return resolutionsRepository.findByUserAndIsPublic(user, true);
    }

    /** Method to update a resolution */
    public void updateResolution(String username, String title, String description, Boolean isPublic) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));

        // update values
        if(title != null && !title.trim().isEmpty()) resolution.setTitle(title);
        if(description != null && !description.trim().isEmpty()) resolution.setDescription(description);
        if(isPublic != null) resolution.setIsPublic(isPublic);
        resolution.setIsActive(true);

        // saving into database
        resolutionsRepository.save(resolution);
        return;
    }

    /** Method to delete a resolution */
    public void deleteResolution(String username, String title) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));

        resolution.setIsActive(false); // Soft delete

        resolutionsRepository.save(resolution);
        return;
    }
}