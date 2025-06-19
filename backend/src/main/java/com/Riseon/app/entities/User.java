package com.Riseon.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** User class having all the user data and all the getters and setters to that data */
@Entity
@Table(name = "user")
public class User {
    @Id
    private String userId = java.util.UUID.randomUUID().toString();
    @Column(unique = true, nullable = false)    //this is to add a unique key constraint followed by a not null constraint in JPA
    private String email;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    public User() {}
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}