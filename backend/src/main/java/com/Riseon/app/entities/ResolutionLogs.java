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

/** ResolutionLogs class having all the data of user resolution logs */
@Entity
@Table(name = "resolution_logs", uniqueConstraints = @UniqueConstraint(columnNames = {"resolution_Id", "logDate"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ResolutionLogs {
    @Id
    private String resolutionLog_Id = java.util.UUID.randomUUID().toString(); // Primary Key

    @ManyToOne
    @JoinColumn(name = "resolution_Id", referencedColumnName = "resolution_Id", nullable = false)
    private Resolutions resolution;

    @Column(nullable = false)
    private LocalDate logDate;

    // @Column(columnDefinition = "INTEGER CHECK (rating >= 0 AND rating <= 10)", nullable = false)
    @Column(nullable = false)
    private int followScore;

    @Lob
    @Column(nullable = true)
    private String notes;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}