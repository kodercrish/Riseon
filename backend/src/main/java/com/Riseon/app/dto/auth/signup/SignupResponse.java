package com.Riseon.app.dto.auth.signup;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SignupResponse {
    private String message;
    private String token;
}