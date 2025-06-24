package com.Riseon.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Riseon.app.entities.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    /* This method will return the User object for given email*/
    Optional<Users> findByEmail(String email);

    /* This method will return the User object for given username */
    Optional<Users> findByUsername(String username);
}