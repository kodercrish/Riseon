package com.Riseon.app.dto.diary.updateDiaryEntry;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UpdateDiaryEntryRequest {
    private String user_Id;
    private String diaryEntry_Id;
    private String title;
    private String content;
    private String diaryDate;
}
