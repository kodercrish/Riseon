package com.JustToday.app.constants;

public class ApiEndPoints {
    // Base URL for the API
    public static final String BASE_URL = "/api";

    // Authentication endpoints
    public static final String AUTH_BASE = BASE_URL + "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_SIGNUP = "/signup";

    // User endpoints
    public static final String USER_BASE = BASE_URL + "/user";
    public static final String USER_BY_ID = "/{userId}";

    // Journal endpoints
    public static final String JOURNAL_BASE = BASE_URL + "/journal";
    public static final String JOURNAL_ADD_EDIT = "/addeditentry";
    public static final String GET_JOURNAL = "/getentry";

}
