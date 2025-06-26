package com.Riseon.app.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class JwtCookieUtil {

    private final JwtUtil jwtUtil;

    public JwtCookieUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /** Extract JWT token from cookies */
    public String extractJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("jwt".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    /** Extract username from JWT cookie */
    public String extractUsernameFromRequest(HttpServletRequest request) {
        String jwt = extractJwtFromCookies(request);
        if (jwt == null) {
            throw new RuntimeException("JWT cookie not found");
        }
    
        String username = jwtUtil.extractUsername(jwt);
        if (username == null) {
            throw new RuntimeException("Failed to extract username from JWT");
        }

        return username;
    }

    /** Returns true if token is present and valid */
    public boolean isTokenValid(HttpServletRequest request) {
        String jwt = extractJwtFromCookies(request);
        return jwt != null && jwtUtil.isTokenValid(jwt);
    }

    /** Set JWT as secure HttpOnly cookie */
    public void setJwtCookie(HttpServletResponse response, String jwt) {
        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .sameSite("Strict")
            .maxAge(60 * 60) // 1 hour
            .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /** Delete JWT cookie */
    public void clearJwtCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
            .httpOnly(true)
            .secure(true)
            .path("/")
            .sameSite("Strict")
            .maxAge(0) // expire immediately
            .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}