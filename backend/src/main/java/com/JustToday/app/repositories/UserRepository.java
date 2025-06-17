package com.JustToday.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.JustToday.app.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    // This interface will automatically provide CRUD operations for User entities
    // No additional methods are needed unless custom queries are required

    User findByEmail(String email);
}
