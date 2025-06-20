package com.Riseon.app.dto.auth.login;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}