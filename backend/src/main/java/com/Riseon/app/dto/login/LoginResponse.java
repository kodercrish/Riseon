package com.Riseon.app.dto.login;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoginResponse {
    private String message;
    private String user_Id;
    private String username;
    private String email;
}