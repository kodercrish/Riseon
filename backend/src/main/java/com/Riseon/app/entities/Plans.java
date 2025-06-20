package com.Riseon.app.entities;

import java.time.LocalDate;
import java.time.LocalTime;
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

/** Plans class having all the plans that user added to their calendar */
@Entity
@Table(name = "plans", uniqueConstraints = @UniqueConstraint(columnNames = {"user_Id", "title", "date"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Plans {
    @Id
    private String plan_Id = java.util.UUID.randomUUID().toString(); // Primary Key

    @ManyToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "user_Id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Boolean isAllDay = true;

    @Column(nullable = true)
    private LocalTime deadline;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}