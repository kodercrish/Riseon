package com.JustToday.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

/** Journal class having all the journal data and all the getters and setters to that data */
@Entity
@Table(name = "journals", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "journalDate"}))
public class Journal {
    @Id
    private String journalId = java.util.UUID.randomUUID().toString();
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private User user;
    private String title;
    private String content;
    private LocalDateTime dateTime;
    @Column(nullable = false)
    private LocalDate journalDate;

    public Journal() {
        this.dateTime = LocalDateTime.now();
    }
    public Journal(User user, String title, String content, LocalDate journalDate) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.dateTime = LocalDateTime.now();
        this.journalDate = journalDate;
    }
    public String getJournalId() {
        return journalId;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public void setDateTimeNow() {
        this.dateTime = LocalDateTime.now();
    }
    public LocalDate getJournalDate() {
        return journalDate;
    }
    public void setJournalDate(LocalDate journalDate) {
        this.journalDate = journalDate;
    }
}