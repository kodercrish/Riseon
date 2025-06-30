package com.Riseon.app.constants;

public class ApiEndPoints {
    // Base URL for the API
    public static final String BASE_URL = "/api";

    // Authentication endpoints
    public static final String AUTH_BASE = BASE_URL + "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_SIGNUP = "/signup";
    public static final String AUTH_FETCH_USER = "/fetch";
    public static final String AUTH_LOGOUT = "/logout";

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

    // Plan endpoints
    public static final String PLAN_BASE = BASE_URL + "/plan";
    public static final String PLAN_ADD = "/add";
    public static final String PLAN_FETCH = "/get";
    public static final String PLAN_UPDATE = "/update";
    public static final String PLAN_DELETE = "/delete";

    // Resolution endpoints
    public static final String RESOLUTION_BASE = BASE_URL + "/resolution";
    public static final String RESOLUTION_ADD = "/add";
    public static final String RESOLUTION_FETCH_ALL = "/getall";
    public static final String RESOLUTION_FETCH_PUBLIC = "/getpublic";
    public static final String RESOLUTION_UPDATE = "/update";
    public static final String RESOLUTION_DELETE = "/delete";

    // Resolutionlogs endpoints
    public static final String RESOLUTIONLOG_BASE = BASE_URL + "/resolutionlog";
    public static final String RESOLUTIONLOG_ADD = "/add";
    public static final String RESOLUTIONLOG_FETCH = "/get";
    public static final String RESOLUTIONLOG_UPDATE = "/update";
    public static final String RESOLUTIONLOG_DELETE = "/delete";
}