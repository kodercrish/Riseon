package com.Riseon.app.dto.signup;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
}