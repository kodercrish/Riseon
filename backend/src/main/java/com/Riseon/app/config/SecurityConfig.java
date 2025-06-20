package com.Riseon.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // .csrf(Customizer.withDefaults())     //This is for browser security
            .csrf(csrf -> csrf.disable())           //While using postman locally, we have to disable it
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/signup",
                                    "api/auth/login").permitAll() // 👈 allowing signup requests
                .anyRequest().permitAll() // 👈 secure everything else by using authenticated()
            );
        return http.build();
    }
}