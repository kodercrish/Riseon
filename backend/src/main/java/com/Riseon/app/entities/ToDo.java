// userid, creationDate, content, status, dueDate, progressBar

package com.Riseon.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/** Journal class having all the journal data and all the getters and setters to that data */
@Entity
@Table(name = "todos")
public class ToDo {
    @Id
    private String todoId = java.util.UUID.randomUUID().toString();
    
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private User user;
    private String content;
    @Column(nullable = false)
    private String status; // e.g., "pending", "completed"
    private String dueDate;
    @Column(nullable = false)
    private int progressBar; // e.g., 0 to 100

    public ToDo() {}
    public ToDo(User user, String content, String status, String dueDate, int progressBar) {
        this.user = user;
        this.content = content;
        this.status = status;
        this.dueDate = dueDate;
        this.progressBar = progressBar;
    }

    public String getTodoId() {
        return todoId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public int getProgressBar() {
        return progressBar;
    }

    public void setProgressBar(int progressBar) {
        this.progressBar = progressBar;
    }
}