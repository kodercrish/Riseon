package com.JustToday.app.dto.login;

public class LoginResponse {
    String message;
    String userId;
    String username;
    String email;

    public LoginResponse() {}
    public LoginResponse(String message, String userId, String username, String email) {
        this.message = message;
        this.userId = userId;
        this.username = username;
        this.email = email;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
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
}
