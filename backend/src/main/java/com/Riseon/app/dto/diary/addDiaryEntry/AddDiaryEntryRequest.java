package com.Riseon.app.dto.diary.addDiaryEntry;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class AddDiaryEntryRequest {
    private String title;
    private String content;
    private String diaryDate;
}
