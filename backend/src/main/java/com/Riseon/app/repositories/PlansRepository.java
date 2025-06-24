package com.Riseon.app.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.Riseon.app.entities.Plans;
import com.Riseon.app.entities.Users;

@Repository
public interface PlansRepository extends JpaRepository<Plans, String> {
    /** Method to check if a plan of a particular user, title and date exists */
    boolean existsByUserAndTitleAndDate(Users user, String title, LocalDate localDate);

    /** Method to find a plan by user */
    Iterable<Plans> findByUser(Users user);

    /** Method to find a plan by user, title and date */
    Optional<Plans> findByUserAndTitleAndDate(Users user, String title, LocalDate localDate);
}