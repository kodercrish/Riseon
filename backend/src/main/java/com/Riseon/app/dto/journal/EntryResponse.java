package com.Riseon.app.dto.journal;

public class EntryResponse {
    private String message;

    public EntryResponse() {}
    public EntryResponse(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
