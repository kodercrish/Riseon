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
}
