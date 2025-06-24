package com.Riseon.app.dto.diary.updateDiaryEntry;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UpdateDiaryEntryResponse {
    private String message;
    private String title;
    private String content;
    private LocalDate diaryDate;
}