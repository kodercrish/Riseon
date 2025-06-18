package com.JustToday.app.dto.signup;

public class SignupResponse {
    private String message;
    private String userId;
    private String username;
    private String email;

    public SignupResponse() {}
    public SignupResponse(String message, String userId, String username, String email) {
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