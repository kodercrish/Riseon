package com.Riseon.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.Riseon.app.entities.Resolutions;
import com.Riseon.app.entities.Users;

@Repository
public interface ResolutionsRepository extends JpaRepository<Resolutions, String> {
    /** Method to find a resolution by user and title */
    Optional<Resolutions> findByUserAndTitle(Users user, String title);

    /** Method to find all resolutions of a user */
    Iterable<Resolutions> findByUser(Users user);

    /** Method to find all public resolutions of a user */
    Iterable<Resolutions> findByUserAndIsPublic(Users user, boolean isPublic);
}