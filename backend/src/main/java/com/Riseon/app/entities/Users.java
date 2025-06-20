package com.Riseon.app.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Users class having all the user data */
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Users {
    @Id
    private String user_Id = java.util.UUID.randomUUID().toString(); // Primary Key

    @Column(length = 255, unique = true, nullable = false)    //this is to add a unique key constraint followed by a not null constraint in JPA
    private String email;   // Unique Key

    @Column(length = 255, unique = true, nullable = false)
    private String username;    // Unique Key
    
    @Column(length = 255, nullable = false)
    private String fullName;

    @JsonIgnore // This field will not be serialized to JSON
    @Column(length = 255, nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private LocalDateTime joinedAt = LocalDateTime.now(); // Default value is current time
}