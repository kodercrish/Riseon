package com.Riseon.app.dto.user.getUserDetails;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetUserDetailsResponse {
    private String message;
    private String userId;
    private String username;
    private String email;
    private String fullName;
    private LocalDateTime joinedAt;
}