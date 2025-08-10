package com.Riseon.app.entities;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

/** Resolutions class having all the user resolution data */
@Entity
@Table(name = "resolutions", uniqueConstraints = @UniqueConstraint(columnNames = {"user_Id", "title"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Resolutions {
    @Id
    private String resolution_Id = java.util.UUID.randomUUID().toString(); // Primary Key

    @ManyToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "user_Id", nullable = false)
    private Users user;
    
    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private Boolean isPublic;

    @Column(nullable = false)
    private Boolean isActive;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}