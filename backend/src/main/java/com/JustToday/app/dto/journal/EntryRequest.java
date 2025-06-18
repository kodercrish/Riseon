package com.JustToday.app.dto.journal;

public class EntryRequest {
    private String userId;
    private String JournalDate;
    private String Title;
    private String Content;

    public EntryRequest() {}
    public EntryRequest(String userId, String journalDate, String title, String content) {
        this.userId = userId;
        JournalDate = journalDate;
        Title = title;
        Content = content;
    }
    public String getUserId() {
        return userId;
    }
    public String getJournalDate() {
        return JournalDate;
    }
    public String getTitle() {
        return Title;
    }
    public String getContent() {
        return Content;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setJournalDate(String journalDate) {
        JournalDate = journalDate;
    }
    public void setTitle(String title) {
        Title = title;
    }
    public void setContent(String content) {
        Content = content;
    }

}
