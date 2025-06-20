package com.Riseon.app.dto.diary.addDiaryEntry;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class AddDiaryEntryResponse {
    private String message;
    private String diaryId;
    private String userId;
    private String title;
    private String content;
    private LocalDate diaryDate;
}