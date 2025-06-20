package com.Riseon.app.dto.diary.getDiaryEntry;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetDiaryEntryResponse {
    private String message;
    private String user_Id;
    private String title;
    private String content;
    private LocalDate diaryDate;
}
