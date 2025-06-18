package com.JustToday.app.dto.userDetails;

public class UserDetailsResponse {
    private String message;
    private String userName;
    private String email;
    
    public UserDetailsResponse() {}
    public UserDetailsResponse(String message, String userName, String email) {
        this.message = message;
        this.userName = userName;
        this.email = email;
    }
}
