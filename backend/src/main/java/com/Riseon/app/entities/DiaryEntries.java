package com.Riseon.app.entities;

import java.time.LocalDate;
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

/** DiaryEntries class having all the user's diary entry's data */
@Entity
@Table(name = "diary_entries", uniqueConstraints = @UniqueConstraint(columnNames = {"user_Id", "diaryDate"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DiaryEntries {
    @Id
    private String diaryEntry_Id = java.util.UUID.randomUUID().toString(); // Primary Key

    @ManyToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "user_Id", nullable = false)
    private Users user;     // part of Unique Key

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = true)
    private String content;

    @Column(nullable = false)
    private LocalDate diaryDate;   // part of Unique Key

    @Column(nullable = false)
    private boolean isDeleted = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}