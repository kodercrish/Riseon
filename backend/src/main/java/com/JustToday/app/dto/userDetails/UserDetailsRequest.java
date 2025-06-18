package com.JustToday.app.dto.userDetails;

public class UserDetailsRequest {
    private String userId;

    public UserDetailsRequest() {}
    public UserDetailsRequest(String userId) {
        this.userId = userId;
    }
    public String getUserId() {
        return userId;
    }
}
