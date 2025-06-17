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
}