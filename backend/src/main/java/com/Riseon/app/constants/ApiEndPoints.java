package com.Riseon.app.constants;

public class ApiEndPoints {
    // Base URL for the API
    public static final String BASE_URL = "/api";

    // Authentication endpoints
    public static final String AUTH_BASE = BASE_URL + "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_SIGNUP = "/signup";

    // User endpoints
    public static final String USER_BASE = BASE_URL + "/user";
    public static final String USER_FETCH = "/getuser";
    public static final String USER_UPDATE = "/updateuser";

    // Diary endpoints
    public static final String DIARY_BASE = BASE_URL + "/diaryentry";
    public static final String DIARY_ADD = "/add";
    public static final String DIARY_FETCH = "/get";
    public static final String DIARY_UPDATE = "/update";
    public static final String DIARY_DELETE = "/delete";
}